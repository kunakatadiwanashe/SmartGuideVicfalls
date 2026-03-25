"use client";

import { useQuery } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import Animated, {
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
} from "react-native-reanimated";
import { fetchStoreProducts } from '../../../src/lib/api';

export default function ProductDetail() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const productId = Array.isArray(params.productId) ? params.productId[0] : params.productId;

  const [cartAdded, setCartAdded] = useState({ rent: false, buy: false });

  const { data: products } = useQuery({
    queryKey: ['storeProducts'],
    queryFn: fetchStoreProducts,
  });

  const product = products?.find(p => p.id === productId);

  if (!product) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Product not found</Text>
      </View>
    );
  }

  const scrollY = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const imageTranslate = useAnimatedStyle(() => ({
    transform: [{
      translateY: Math.max(-scrollY.value / 3, -50),
    }],
  }));

  const toggleCart = (type: 'rent' | 'buy') => {
    setCartAdded(prev => ({ ...prev, [type]: !prev[type] }));
    // In real app: dispatch to cart store
    console.log(`Added ${product.name} - ${type}`);
  };

  return (
    <View style={styles.container}>
      {/* Header Buttons */}
      <View style={styles.headerButtons}>
        <TouchableOpacity style={styles.headerButton} onPress={() => router.back()}>
          <Text style={styles.headerButtonText}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerButton}>
          <Text style={styles.headerButtonText}>♡</Text>
        </TouchableOpacity>
      </View>

      <Animated.ScrollView
        onScroll={onScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
      >
        {/* Hero Image */}
        <Animated.View style={[styles.heroImageContainer, imageTranslate]}>
          <ImageBackground
            source={{ uri: product.category === 'raincoat' 
              ? 'https://images.unsplash.com/photo-1576959432991-64b3beb4325e?w=800' 
              : 'https://images.unsplash.com/photo-1582376473943-04da187ce9f7?w=800' }}
            style={styles.heroImage}
            imageStyle={{ borderRadius: 24 }}
          >
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.95)"]}
              style={styles.gradientOverlay}
            />
            <View style={styles.heroTextContainer}>
              <Text style={styles.heroTitle}>{product.name}</Text>
              <Text style={styles.heroSubtitle}>
                {product.category === 'raincoat' ? '🧥 Rain Gear' : '🥄 Souvenir'}
              </Text>
            </View>
          </ImageBackground>
        </Animated.View>

        {/* Content */}
        <View style={styles.contentContainer}>
          {/* Prices */}
          <View style={styles.priceSection}>
            {product.rentPrice !== undefined && (
              <View style={styles.priceCard}>
                <Text style={styles.priceLabel}>Rent</Text>
                <Text style={styles.priceValue}>${product.rentPrice}/day</Text>
                <TouchableOpacity 
                  style={[styles.actionButton, cartAdded.rent && styles.actionAdded]}
                  onPress={() => toggleCart('rent')}
                >
                  <Text style={styles.actionText}>{cartAdded.rent ? 'Added' : 'Rent Now'}</Text>
                </TouchableOpacity>
              </View>
            )}
            <View style={styles.priceCard}>
              <Text style={styles.priceLabel}>Buy</Text>
              <Text style={styles.priceValue}>${product.buyPrice}</Text>
              <TouchableOpacity 
                style={[styles.actionButton, cartAdded.buy && styles.actionAdded]}
                onPress={() => toggleCart('buy')}
              >
                <Text style={styles.actionText}>{cartAdded.buy ? 'Added' : 'Buy Now'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📝 Description</Text>
            <Text style={styles.sectionText}>{product.description}</Text>
          </View>

          {/* Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>✨ Features</Text>
            {product.details.map((detail, index) => (
              <View key={index} style={styles.detailItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.detailText}>{detail}</Text>
              </View>
            ))}
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#000" 
  },
  centered: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "#000" 
  },
  errorText: { 
    color: "#f87171", 
    fontSize: 18 
  },
  headerButtons: {
    position: "absolute",
    top: 48,
    left: 16,
    right: 16,
    zIndex: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerButton: {
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 12,
    borderRadius: 999,
  },
  headerButtonText: { 
    color: "#fff", 
    fontSize: 16 
  },
  heroImageContainer: {
    height: 384,
  },
  heroImage: { 
    flex: 1,
    width: '100%',
  },
  gradientOverlay: { 
    ...StyleSheet.absoluteFillObject,
    borderRadius: 24,
  },
  heroTextContainer: { 
    position: "absolute", 
    bottom: 24, 
    left: 20, 
    right: 20 
  },
  heroTitle: { 
    color: "#fff", 
    fontSize: 28, 
    fontWeight: "800" 
  },
  heroSubtitle: { 
    color: "#d1d5db", 
    fontSize: 14, 
    marginTop: 4 
  },
  contentContainer: { 
    backgroundColor: "#000", 
    borderTopLeftRadius: 24, 
    borderTopRightRadius: 24, 
    paddingHorizontal: 20, 
    paddingTop: 24, 
    paddingBottom: 140,
    gap: 20,
  },
  priceSection: {
    flexDirection: 'row',
    gap: 12,
    paddingBottom: 12,
  },
  priceCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  priceLabel: {
    color: '#9ca3af',
    fontSize: 14,
    marginBottom: 4,
  },
  priceValue: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 12,
  },
  actionButton: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  actionAdded: {
    backgroundColor: '#16a34a',
  },
  actionText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 14,
  },
  section: { 
    backgroundColor: "rgba(255,255,255,0.08)", 
    padding: 20, 
    borderRadius: 16 
  },
  sectionTitle: { 
    color: "#fff", 
    fontSize: 18, 
    fontWeight: "600", 
    marginBottom: 12 
  },
  sectionText: { 
    color: "#d1d5db", 
    lineHeight: 20 
  },
  detailItem: { 
    flexDirection: "row", 
    marginBottom: 8 
  },
  bullet: { 
    color: "#22c55e", 
    marginRight: 8,
    fontSize: 16,
  },
  detailText: { 
    color: "#d1d5db", 
    flex: 1 
  },
});
