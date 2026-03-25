import { useQuery } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import React, { useState } from 'react';
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
import type { StoreProduct } from '../../src/data/storeProducts';
import { fetchStoreProducts } from '../../src/lib/api';

const { height: windowHeight } = Dimensions.get('window');
const HERO_HEIGHT = windowHeight * 0.75;

interface CartItem {
  product: StoreProduct;
  quantity: number;
  type: 'rent' | 'buy'; // rent or buy
}

export default function StoreScreen() {
  const { data: products = [] } = useQuery({
    queryKey: ['storeProducts'],
    queryFn: fetchStoreProducts,
  });

  const [cart, setCart] = useState<CartItem[]>([]);

  const scrollY = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const heroStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollY.value,
      [-200, 0],
      [1.4, 1],
      Extrapolate.CLAMP
    );
    return { transform: [{ scale }] };
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

  const addToCart = (product: StoreProduct, type: 'rent' | 'buy') => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.type === type);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id && item.type === type
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1, type }];
    });
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const renderProduct = ({ item }: { item: StoreProduct }) => (
    <Link href={`/store/${item.id}`} asChild>
      <TouchableOpacity style={styles.card}>
        <ImageBackground
          source={{ uri: item.category === 'raincoat' 
            ? 'https://images.unsplash.com/photo-1576959432991-64b3beb4325e?w=400' 
            : 'https://images.unsplash.com/photo-1582376473943-04da187ce9f7?w=400' }}
          style={styles.cardImage}
          imageStyle={{ borderRadius: 20 }}
        >
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.cardOverlay}
          />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardPrice}>
              {item.rentPrice !== undefined && `Rent $${item.rentPrice}/day | `}
              Buy ${item.buyPrice}
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </Link>
  );

  const HeroHeader = () => (
    <>
      <View style={{ height: HERO_HEIGHT }}>
        <Animated.View style={[styles.hero, heroStyle]}>
          <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=800' }} // Falls shop vibe
            style={styles.heroImage}
          >
            <LinearGradient
              colors={['rgba(0,0,0,0.7)', 'transparent', '#050a05']}
              style={StyleSheet.absoluteFillObject}
            />
          </ImageBackground>
        </Animated.View>
        <Animated.View style={[styles.heroContent, overlayStyle]}>
          <Text style={styles.heroTitle}>Victoria Falls Shop</Text>
          <Text style={styles.heroSubtitle}>Essentials & Souvenirs</Text>
          <View style={styles.glassCard}>
            <Text style={styles.glassText}>🛒 Ready to Shop</Text>
            <Text style={styles.glassSub}>6 Products Available</Text>
          </View>
          <TouchableOpacity style={styles.cta} onPress={() => {}}>
            <Text style={styles.ctaText}>Browse Essentials</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Featured Products</Text>
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
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 140 }}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
      {/* Floating Cart */}
      <TouchableOpacity style={[styles.fab, { backgroundColor: cartCount > 0 ? '#22c55e' : '#6b7280' }]}>
        <Text style={styles.fabText}>🛒</Text>
        {cartCount > 0 && <View style={styles.badge}><Text style={styles.badgeText}>{cartCount}</Text></View>}
      </TouchableOpacity>
      {/* Bottom CTA */}
      <View style={styles.bottomCTA}>
        <TouchableOpacity style={styles.cartButton}>
          <Text style={styles.cartButtonText}>View Cart ({cartCount})</Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 42,
    fontWeight: '900',
    color: '#fff',
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#ddd',
    marginBottom: 20,
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
    fontSize: 16,
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
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  card: {
    flex: 0.48,
    marginBottom: 20,
    height: 220,
  },
  cardImage: {
    flex: 1,
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
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardPrice: {
    color: '#22c55e',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
  },
  fab: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
  fabText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#ef4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  bottomCTA: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.9)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  cartButton: {
    backgroundColor: '#3b82f6',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  cartButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
