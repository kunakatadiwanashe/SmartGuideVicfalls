import { useQuery } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { TouristSpot } from '../../src/data/spots';
import { fetchSpots } from '../../src/lib/api';

const { height } = Dimensions.get('window');
const HERO_HEIGHT = height * 0.75;

export default function ExploreScreen() {
  const { data: spots = [] } = useQuery<TouristSpot[]>({
    queryKey: ['spots'],
    queryFn: fetchSpots,
  });

  const scrollY = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  // Parallax Hero Animation
  const heroStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollY.value,
      [-200, 0],
      [1.4, 1],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ scale }],
    };
  });

  const overlayStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, HERO_HEIGHT / 2],
      [1, 0],
      Extrapolate.CLAMP
    );

    return { opacity };
  });

  const renderSpot = ({ item }: { item: TouristSpot }) => (
    <Link href={`/spots/${item.id}`} asChild>
      <TouchableOpacity style={styles.card}>
        <ImageBackground
          source={item.image }
          style={styles.cardImage}
          imageStyle={{ borderRadius: 20 }}
        >
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.cardOverlay}
          />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={{ color: '#ccc', fontSize: 12 }}>{item.description}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </Link>
  );

  const HeroHeader = () => (
    <>
      {/* --- HERO --- */}
      <View style={{ height: HERO_HEIGHT }}>
        <Animated.View style={[styles.hero, heroStyle]}>
          <ImageBackground
            source={{
              uri: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716',
            }}
            style={styles.heroImage}
          >
            <LinearGradient
              colors={['rgba(0,0,0,0.7)', 'transparent', '#050a05']}
              style={StyleSheet.absoluteFillObject}
            />
          </ImageBackground>
        </Animated.View>

        {/* Overlay Content */}
        <Animated.View style={[styles.heroContent, overlayStyle]}>
          <Text style={styles.heroTitle}>Mosi-oa-Tunya</Text>
          <Text style={styles.heroSubtitle}>
            The Smoke That Thunders
          </Text>

          {/* Glass Card */}
          <View style={styles.glassCard}>
            <Text style={styles.glassText}>28°C • Sunny</Text>
            <Text style={styles.glassSub}>Peak Flow Season</Text>
          </View>

          <TouchableOpacity style={styles.cta}>
            <Text style={styles.ctaText}>Start Journey</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* --- SECTION HEADER --- */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Explore Nature</Text>
      </View>
    </>
  );

  return (
    <View style={styles.container}>
      <Animated.FlatList
        style={{ flex: 1 }}
        onScroll={onScroll}
        scrollEventThrottle={16}
        ListHeaderComponent={HeroHeader}
        data={spots}
        renderItem={renderSpot}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 120 }}
      />

      {/* --- FLOATING QR BUTTON --- */}
      <TouchableOpacity style={styles.fab}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>
          QR
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#162116',
  },

  hero: {
    ...StyleSheet.absoluteFillObject,
  },

  heroImage: {
    flex: 1,
  },

  heroContent: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
  },

  heroTitle: {
    fontSize: 48,
    fontWeight: '900',
    color: '#fff',
  },

  heroSubtitle: {
    fontSize: 18,
    color: '#ddd',
    marginBottom: 20,
    fontStyle: 'italic',
  },

  glassCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 15,
    borderRadius: 16,
    marginBottom: 15,
  },

  glassText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  glassSub: {
    color: '#ccc',
    fontSize: 12,
  },

  cta: {
    backgroundColor: '#22c55e',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },

  ctaText: {
    fontWeight: 'bold',
    color: '#000',
  },

  sectionHeader: {
    padding: 20,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#fff',
  },

  card: {
    marginHorizontal: 16,
    marginBottom: 20,
  },

  cardImage: {
    height: 200,
    justifyContent: 'flex-end',
  },

  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20,
  },

  cardContent: {
    padding: 16,
  },

  cardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#22c55e',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
});