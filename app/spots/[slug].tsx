"use client";

import { useRef } from "react";
import { useLocalSearchParams, Link } from "expo-router";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useQuery } from "@tanstack/react-query";
import { fetchSpotBySlug } from "../../src/lib/api";

export default function SpotDetail() {
  const params = useLocalSearchParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  const scrollY = useRef(new Animated.Value(0)).current;

  const { data: spot, isLoading, isError } = useQuery({
    queryKey: ["spot", slug],
    queryFn: () => fetchSpotBySlug(slug as string),
    enabled: !!slug,
  });

  // LOADING
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  // ERROR
  if (isError || !spot) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <Text className="text-red-400">Failed to load</Text>
      </View>
    );
  }

  // PARALLAX EFFECT
  const imageTranslate = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, -50],
    extrapolate: "clamp",
  });

  return (
    <View className="flex-1 bg-black">

      {/* FLOATING HEADER BUTTONS */}
      <View className="absolute top-12 left-4 right-4 z-10 flex-row justify-between">
        <TouchableOpacity className="bg-black/50 p-3 rounded-full">
          <Text className="text-white">←</Text>
        </TouchableOpacity>

        <TouchableOpacity className="bg-black/50 p-3 rounded-full">
          <Text className="text-white">♡</Text>
        </TouchableOpacity>
      </View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        {/* HERO IMAGE WITH PARALLAX */}
        <Animated.View
          style={{ transform: [{ translateY: imageTranslate }] }}
        >
          <Image
            source={{
              uri: spot.image || "https://via.placeholder.com/600",
            }}
            className="h-96 w-full"
          />

          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.95)"]}
            className="absolute bottom-0 w-full h-48"
          />

          <View className="absolute bottom-6 left-5 right-5">
            <Text className="text-white text-3xl font-extrabold">
              {spot.name}
            </Text>
            <Text className="text-gray-300 text-sm mt-1">
              📍 Tourist Attraction
            </Text>
          </View>
        </Animated.View>

        {/* CONTENT */}
        <View className="bg-black rounded-t-3xl px-5 pt-6 pb-32 space-y-5">

          {/* QUICK INFO */}
          <View className="flex-row justify-between bg-white/10 p-4 rounded-2xl">
            <View>
              <Text className="text-gray-400 text-xs">Rating</Text>
              <Text className="text-white font-bold">⭐ 4.8</Text>
            </View>
            <View>
              <Text className="text-gray-400 text-xs">Distance</Text>
              <Text className="text-white font-bold">~2.3 km</Text>
            </View>
            <View>
              <Text className="text-gray-400 text-xs">Open</Text>
              <Text className="text-green-400 font-bold">Now</Text>
            </View>
          </View>

          {/* ABOUT */}
          <View className="bg-white/10 p-5 rounded-2xl">
            <Text className="text-white text-lg font-semibold mb-2">
              🧭 About
            </Text>
            <Text className="text-gray-300 leading-relaxed">
              {spot.description}
            </Text>
          </View>

          {/* HISTORY */}
          {spot.history && (
            <View className="bg-white/10 p-5 rounded-2xl">
              <Text className="text-white text-lg font-semibold mb-2">
                🏛️ History
              </Text>
              <Text className="text-gray-300 leading-relaxed">
                {spot.history}
              </Text>
            </View>
          )}

          {/* FUN FACTS */}
          {spot.funFacts?.length > 0 && (
            <View className="bg-white/10 p-5 rounded-2xl">
              <Text className="text-white text-lg font-semibold mb-3">
                🎯 Fun Facts
              </Text>

              {spot.funFacts.map((fact: string, index: number) => (
                <View key={index} className="flex-row mb-2">
                  <Text className="text-blue-400 mr-2">•</Text>
                  <Text className="text-gray-300 flex-1">
                    {fact}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </Animated.ScrollView>

      {/* STICKY BOTTOM CTA */}
      <View className="absolute bottom-0 left-0 right-0 p-5 bg-black/90 border-t border-white/10">
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
              className="p-5 rounded-2xl items-center"
            >
              <Text className="text-white font-bold text-lg">
                📍 Get Directions
              </Text>
              <Text className="text-blue-100 text-xs mt-1">
                Start navigation instantly
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}