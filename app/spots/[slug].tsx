"use client";

import { useQuery } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useRef } from "react";
import {
  ActivityIndicator,
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { fetchSpotBySlug } from "../../src/lib/api";

export default function SpotDetail() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  const scrollY = useRef(new Animated.Value(0)).current;

  const { data: spot, isLoading, isError } = useQuery({
    queryKey: ["spot", slug],
    queryFn: () => fetchSpotBySlug(slug as string),
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (isError || !spot) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Failed to load</Text>
      </View>
    );
  }

  const imageTranslate = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, -50],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.container}>
      {/* Floating Header Buttons */}
      <View style={styles.headerButtons}>

        <TouchableOpacity style={styles.headerButton} onPress={() => router.back()}>
          <Text style={styles.headerButtonText}>←</Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.headerButton}>
          <Text style={styles.headerButtonText}>♡</Text>
        </TouchableOpacity>
      </View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        {/* Hero Image with Parallax */}
        <Animated.View style={{ transform: [{ translateY: imageTranslate }] }}>
          <Image
            source={spot.image}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.95)"]}
            style={styles.gradientOverlay}
          />
          <View style={styles.heroTextContainer}>
            <Text style={styles.heroTitle}>{spot.name}</Text>
            <Text style={styles.heroSubtitle}>📍 Tourist Attraction</Text>
          </View>
        </Animated.View>

        {/* Content */}
        <View style={styles.contentContainer}>
          {/* Quick Info */}
          <View style={styles.quickInfo}>
            <View>
              <Text style={styles.label}>Rating</Text>
              <Text style={styles.value}>⭐ 4.8</Text>
            </View>
            <View>
              <Text style={styles.label}>Distance</Text>
              <Text style={styles.value}>~2.3 km</Text>
            </View>
            <View>
              <Text style={styles.label}>Open</Text>
              <Text style={[styles.value, { color: "#22c55e" }]}>Now</Text>
            </View>
          </View>

          {/* About */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🧭 About</Text>
            <Text style={styles.sectionText}>{spot.description}</Text>
          </View>

          {/* History */}
          {spot.history && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>🏛️ History</Text>
              <Text style={styles.sectionText}>{spot.history}</Text>
            </View>
          )}

          {/* Fun Facts */}
          {spot.funFacts?.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>🎯 Fun Facts</Text>
              {spot.funFacts.map((fact, index) => (
                <View key={index} style={styles.factItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.factText}>{fact}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </Animated.ScrollView>

      {/* Sticky Bottom CTA */}
      <View style={styles.bottomCTA}>
        <Link
          href={{
            pathname: "/(tabs)/map",
            params: {
              lat: spot.lat,
              lng: spot.lng,
              name: spot.name,
            },
          }}
          asChild
        >
          <TouchableOpacity activeOpacity={0.85}>
            <LinearGradient
              colors={["#3b82f6", "#1d4ed8"]}
              style={styles.ctaButton}
            >
              <Text style={styles.ctaText}>📍 Get Directions</Text>
              <Text style={styles.ctaSubText}>Start navigation instantly</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  centered: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#000" },
  errorText: { color: "#f87171" },
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
  headerButtonText: { color: "#fff", fontSize: 16 },
  heroImage: { width: "100%", height: 384 },
  gradientOverlay: { position: "absolute", bottom: 0, width: "100%", height: 192 },
  heroTextContainer: { position: "absolute", bottom: 24, left: 20, right: 20 },
  heroTitle: { color: "#fff", fontSize: 28, fontWeight: "800" },
  heroSubtitle: { color: "#d1d5db", fontSize: 14, marginTop: 4 },
  contentContainer: { backgroundColor: "#000", borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingHorizontal: 20, paddingTop: 24, paddingBottom: 128, gap: 20 },
  quickInfo: { flexDirection: "row", justifyContent: "space-between", backgroundColor: "rgba(255,255,255,0.1)", padding: 16, borderRadius: 16 },
  label: { color: "#9ca3af", fontSize: 12 },
  value: { color: "#fff", fontWeight: "700" },
  section: { backgroundColor: "rgba(255,255,255,0.1)", padding: 20, borderRadius: 16 },
  sectionTitle: { color: "#fff", fontSize: 18, fontWeight: "600", marginBottom: 8 },
  sectionText: { color: "#d1d5db", lineHeight: 20 },
  factItem: { flexDirection: "row", marginBottom: 8 },
  bullet: { color: "#3b82f6", marginRight: 8 },
  factText: { color: "#d1d5db", flex: 1 },
  bottomCTA: { position: "absolute", bottom: 0, left: 0, right: 0, padding: 20, backgroundColor: "rgba(0,0,0,0.9)", borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.1)" },
  ctaButton: { padding: 20, borderRadius: 16, alignItems: "center" },
  ctaText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  ctaSubText: { color: "#bfdbfe", fontSize: 12, marginTop: 4 },
});