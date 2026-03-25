import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Dimensions, FlatList, ImageBackground, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { emergencyContacts, parkRules, VicFallsAttraction, VicFallsRestaurant, vicFallsTourism } from '../../src/data/spots';

const { width } = Dimensions.get('window');

const GuideScreen = () => {
  const renderAttraction = ({ item }: { item: VicFallsAttraction }) => (
    <View style={styles.tableRow}>
      <ImageBackground source={{ uri: item.imageUrl }} style={styles.rowImage} imageStyle={{ borderRadius: 12 }}>
        <LinearGradient colors={["transparent", "rgba(0,0,0,0.5)"]} style={styles.imageOverlay} />
      </ImageBackground>
      <View style={styles.rowInfo}>
        <Text style={styles.rowTitle}>{item.name}</Text>
        <Text style={styles.rowRating}>⭐{item.rating.toFixed(1)}</Text>
        <Text style={styles.rowHours}>{item.hours} | {item.category}</Text>
        <Text style={styles.rowAddress}>{item.address}</Text>
        <Text style={styles.rowDetails} numberOfLines={1}>{item.details}</Text>
      </View>
      <TouchableOpacity style={styles.mapsBtn} onPress={() => Linking.openURL(item.maps_link)}>
        <Text style={styles.mapsText}>🗺️ Maps</Text>
      </TouchableOpacity>
    </View>
  );

  const renderRestaurant = ({ item }: { item: VicFallsRestaurant }) => (
    <View style={styles.tableRow}>
      <ImageBackground source={{ uri: item.imageUrl }} style={styles.rowImage} imageStyle={{ borderRadius: 12 }}>
        <LinearGradient colors={["transparent", "rgba(0,0,0,0.5)"]} style={styles.imageOverlay} />
      </ImageBackground>
      <View style={styles.rowInfo}>
        <Text style={styles.rowTitle}>{item.name}</Text>
        <Text style={styles.rowRating}>⭐{item.rating.toFixed(1)}</Text>
        <Text style={styles.rowHours}>{item.hours} | {item.category}</Text>
        <Text style={styles.rowAddress}>{item.address}</Text>
        <Text style={styles.rowDetails}>{item.signature_dishes.join(', ')}</Text>
      </View>
      <TouchableOpacity style={styles.mapsBtn} onPress={() => Linking.openURL(item.maps_link)}>
        <Text style={styles.mapsText}>🗺️ Maps</Text>
      </TouchableOpacity>
    </View>
  );

  const renderContact = ({ item }: any ) => (
    <View style={styles.contactRow}>
      <Text style={styles.contactName}>{item.name}</Text>
      <Text style={styles.contactNumber}>{item.number}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Hero */}
      <View style={styles.hero}>
        <ImageBackground 
          source={{ uri: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716' }} 
          style={styles.heroImage}
        >
          <LinearGradient colors={["rgba(0,0,0,0.7)", "transparent"]} style={styles.heroGradient} />
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Victoria Falls Guide</Text>
            <Text style={styles.heroSubtitle}>Attractions • Restaurants • Safety</Text>
          </View>
        </ImageBackground>
      </View>

      <FlatList
        data={vicFallsTourism.attractions}
        renderItem={renderAttraction}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>🏞️ Attractions Guide</Text>
              <Text style={styles.sectionSubtitle}>Top {vicFallsTourism.attractions.length} places to visit</Text>
            </View>
          </>
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <FlatList
        data={vicFallsTourism.restaurants}
        renderItem={renderRestaurant}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>🍽️ Restaurant Guide</Text>
              <Text style={styles.sectionSubtitle}>Must-try local flavors</Text>
            </View>
          </>
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        style={styles.restaurantList}
      />

      <View style={styles.bottomSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>📞 Emergency Contacts</Text>
        </View>
        <FlatList data={emergencyContacts} renderItem={renderContact} keyExtractor={(item) => item.number} style={styles.contactList} />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>⚠️ Park Rules</Text>
        </View>
        <View style={styles.rulesContainer}>
          {parkRules.map((rule, index) => (
            <View key={index} style={styles.ruleChip}>
              <Text style={styles.ruleText}>{rule}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050a05',
  },
  hero: {
    height: 250,
  },
  heroImage: {
    flex: 1,
  },
  heroGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  heroContent: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#fff',
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#ddd',
    marginTop: 8,
  },
  sectionHeader: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#fff',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#aaa',
    marginTop: 4,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  rowImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  imageOverlay: {
    flex: 1,
    borderRadius: 12,
  },
  rowInfo: {
    flex: 1,
  },
  rowTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 2,
  },
  rowRating: {
    fontSize: 16,
    color: '#facc15',
    fontWeight: '600',
    marginBottom: 4,
  },
  rowHours: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 4,
  },
  rowAddress: {
    fontSize: 13,
    color: '#cbd5e1',
    marginBottom: 2,
  },
  rowDetails: {
    fontSize: 12,
    color: '#94a3b8',
  },
  mapsBtn: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  mapsText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  listContent: {
    paddingBottom: 20,
  },
  restaurantList: {
    marginTop: -10,
  },
  bottomSection: {
    paddingBottom: 100,
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  contactName: {
    color: '#fff',
    fontWeight: '600',
  },
  contactNumber: {
    color: '#94a3b8',
  },
  contactList: {
    maxHeight: 200,
  },
  rulesContainer: {
    paddingHorizontal: 20,
  },
  ruleChip: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    marginBottom: 8,
  },
  ruleText: {
    color: '#e2e8f0',
    fontSize: 14,
  },
});

export default GuideScreen;
