import { useQuery } from '@tanstack/react-query';
import * as Linking from 'expo-linking';
import { router } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import MapView, {
  Marker,
  Polyline,
  PROVIDER_GOOGLE,
  Region,
} from 'react-native-maps';
import { useLiveLocation } from '../../hooks/useLiveLocation';
import { TouristSpot } from '../../src/data/spots';
import { fetchSpots } from '../../src/lib/api';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface LocationCoords {
  latitude: number;
  longitude: number;
}

interface ExtendedSpot extends TouristSpot {
  rating: number;
  reviews: number;
  area?: {latitude: number; longitude: number}[];
}

const mockSpotExtras = (spot: TouristSpot): ExtendedSpot => ({
  ...spot,
  rating: 4.6 + Math.random() * 0.3,
  reviews: 120 + Math.floor(Math.random() * 200),
  ...(spot.id === 'devils-pool' ? {
    area: [
      {latitude: -17.9238, longitude: 25.8560},
      {latitude: -17.9232, longitude: 25.8568},
      {latitude: -17.9237, longitude: 25.8570},
      {latitude: -17.9240, longitude: 25.8563},
    ]
  } : {}),
} as ExtendedSpot);

const LAT_LNG_VIC_FALLS = {
  latitude: -17.9243,
  longitude: 25.8572,
};

const openDirections = (spot: ExtendedSpot) => {
  const url = `https://www.google.com/maps/dir/?api=1&destination=${spot.lat},${spot.lng}&travelmode=walking`;
  Linking.openURL(url);
};

export default function MapScreen() {
  const { data: spots = [] } = useQuery<TouristSpot[]>({
    queryKey: ['spots'],
    queryFn: fetchSpots,
  });

  const extendedSpots: ExtendedSpot[] = spots.map(mockSpotExtras);

  const mapRef = useRef<MapView>(null);
  const location = useLiveLocation() as LocationCoords | null;
  const [selectedSpot, setSelectedSpot] = useState<ExtendedSpot | null>(null);
  const [followUser, setFollowUser] = useState(true);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const cardAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  // Pulse animation for selected marker
  useEffect(() => {
    if (selectedSpot) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.4,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [selectedSpot, pulseAnim]);

  // Card entrance animation
  useEffect(() => {
    if (selectedSpot) {
      Animated.spring(cardAnim, {
        toValue: 0,
        tension: 200,
        friction: 8,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(cardAnim, {
        toValue: SCREEN_HEIGHT,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [selectedSpot, cardAnim]);

  // Follow user location
  useEffect(() => {
    if (followUser && location && mapRef.current) {
        mapRef.current?.animateCamera({
        center: { latitude: location.latitude, longitude: location.longitude },
        pitch: 2,
        zoom: 16,
      }, 1000);
    }
  }, [location, followUser]);

  const selectSpot = useCallback((spot: ExtendedSpot) => {
    setSelectedSpot(spot);
    setFollowUser(false);
    mapRef.current?.animateCamera({
      center: { latitude: spot.lat, longitude: spot.lng },
      pitch: 8,
      zoom: 17,
    }, 1000);
  }, []);

  const recenterToUser = useCallback(() => {
    if (location && mapRef.current) {
      mapRef.current?.animateCamera({
        center: { latitude: location.latitude, longitude: location.longitude },
        pitch: 0,
        zoom: 16,
      }, 1000);
      setFollowUser(true);
    }
  }, [location]);

  const closeCard = useCallback(() => setSelectedSpot(null), []);

  const initialRegion: Region = {
    latitude: LAT_LNG_VIC_FALLS.latitude,
    longitude: LAT_LNG_VIC_FALLS.longitude,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  return (
    <View style={styles.container}>
      {/* Full Screen Map */}
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFillObject}
        initialRegion={initialRegion}
        showsUserLocation={false}
        showsMyLocationButton={false}
        toolbarEnabled={false}
      >
        {extendedSpots.map((spot) => (
          <View key={spot.id}>
            <Marker
              key={`marker-${spot.id}`}
              coordinate={{ latitude: spot.lat, longitude: spot.lng }}
              onPress={() => selectSpot(spot)}
            >
              <Animated.View
                style={[
                  styles.marker,
                  selectedSpot?.id === spot.id && [
                    {
                      transform: [{ scale: pulseAnim }],
                      backgroundColor: '#16a34a',
                      shadowColor: '#22c55e',
                      shadowOpacity: 0.6,
                      shadowRadius: 12,
                      elevation: 12,
                    },
                  ],
                ]}
              >
                <Text style={styles.markerIcon}>🏞️</Text>
              </Animated.View>
            </Marker>

            {spot.area && (
              <Polyline
                key={`poly-${spot.id}`}
                coordinates={spot.area}
                strokeColor="#22c55e"
                fillColor="rgba(34, 197, 94, 0.3)"
                strokeWidth={3}
                tappable
                onPress={() => selectSpot(spot)}
              />
            )}
          </View>
        ))}

        {location && (
          <Marker
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
          >
            <View style={styles.userMarker}>
              <View style={styles.userMarkerDot} />
            </View>
          </Marker>
        )}
      </MapView>

      {/* Recenter Button */}
      <Pressable style={styles.recenterButton} onPress={recenterToUser}>
        <View style={[
          styles.buttonInner,
          followUser && styles.buttonInnerActive
        ]}>
          <Text style={styles.buttonText}>📍</Text>
        </View>
      </Pressable>

      {/* Bottom Card */}
      <Animated.View
        style={[
          styles.bottomCard,
          {
            transform: [{ translateY: cardAnim }],
          },
        ]}
      >
        {selectedSpot && (
          <>
            <Pressable style={styles.cardClose} onPress={closeCard}>
              <Text style={styles.cardCloseIcon}>×</Text>
            </Pressable>

            <Image source={{ uri: selectedSpot.image }} style={styles.cardImage} resizeMode="cover" />

            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{selectedSpot.name}</Text>
              <Text style={styles.cardDesc} numberOfLines={2}>
                {selectedSpot.description}
              </Text>

              <View style={styles.ratingRow}>
                <Text style={styles.rating}>★ {selectedSpot.rating.toFixed(1)}</Text>
                <Text style={styles.reviews}>({selectedSpot.reviews})</Text>
              </View>

              <TouchableOpacity 
                style={styles.primaryButton}
                onPress={() => router.push(`/spots/${selectedSpot.id}`)}
              >
                <Text style={styles.primaryButtonText}>View Details</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.secondaryButton}
                onPress={() => openDirections(selectedSpot)}
              >
                <Text style={styles.secondaryButtonText}>Navigate</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  marker: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 12,
    elevation: 12,
  },

  markerIcon: {
    fontSize: 20,
    textAlign: 'center',
    includeFontPadding: false,
  },

  userMarker: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.92)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#3b82f6',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 8,
  },

  userMarkerDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#3b82f6',
  },

  recenterButton: {
    position: 'absolute',
    bottom: 110,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },

  buttonInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(55,65,81,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonInnerActive: {
    backgroundColor: '#3b82f6',
  },

  buttonText: {
    fontSize: 24,
    color: 'white',
    includeFontPadding: false,
  },

  bottomCard: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 28,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 20,
    elevation: 25,
    overflow: 'hidden',
    maxHeight: SCREEN_HEIGHT * 0.38,
  },

  cardClose: {
    position: 'absolute',
    top: 16,
    right: 20,
    zIndex: 2,
    padding: 4,
  },

  cardCloseIcon: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#9ca3af',
  },

  cardImage: {
    height: 140,
    width: '100%',
    backgroundColor: '#f3f4f6',
  },

  cardContent: {
    padding: 24,
    paddingTop: 0,
  },

  cardTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
    lineHeight: 28,
    marginBottom: 4,
  },

  cardDesc: {
    fontSize: 16,
    color: '#6b7280',
    lineHeight: 22,
    marginBottom: 16,
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },

  rating: {
    fontSize: 20,
    fontWeight: '800',
    color: '#f59e0b',
    marginRight: 8,
  },

  reviews: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
  },

  primaryButton: {
    backgroundColor: '#f8fafc',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },

  primaryButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#374151',
  },

  secondaryButton: {
    backgroundColor: '#22c55e',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignItems: 'center',
  },

  secondaryButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: 'white',
  },
});

