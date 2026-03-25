import { useLocalSearchParams, Link } from 'expo-router';
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { fetchSpotBySlug } from '../../src/lib/api';
import { useQuery } from '@tanstack/react-query';

export default function SpotDetail() {
  const params = useLocalSearchParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  const {
    data: spot,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['spot', slug],
    queryFn: () => fetchSpotBySlug(slug as string),
    enabled: !!slug, // prevents undefined calls
  });

  // --- LOADING ---
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // --- ERROR ---
  if (isError || !spot) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-red-500">Failed to load spot</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      {/* IMAGE */}
      <Image
        source={{
          uri: spot.image || 'https://via.placeholder.com/600',
        }}
        className="h-64 w-full rounded-xl"
      />

      {/* TITLE */}
      <Text className="text-2xl font-bold mt-4">{spot.name}</Text>

      {/* DESCRIPTION */}
      <Text className="text-gray-600 mt-2">{spot.description}</Text>

      {/* HISTORY */}
      {spot.history && (
        <View className="mt-4">
          <Text className="text-lg font-semibold">History</Text>
          <Text className="text-gray-700">{spot.history}</Text>
        </View>
      )}

      {/* FUN FACTS */}
      {spot.funFacts?.length > 0 && (
        <View className="mt-4">
          <Text className="text-lg font-semibold">Fun Facts</Text>
          {spot.funFacts.map((fact: string, index: number) => (
            <Text key={index} className="text-gray-700">
              • {fact}
            </Text>
          ))}
        </View>
      )}

      {/* MAP LINK (WITH PARAMS) */}
      <Link
        href={{
          pathname: '/(tabs)/map',
          params: {
            lat: spot.lat,
            lng: spot.lng,
            name: spot.name,
          },
        }}
        className="bg-blue-500 p-4 rounded-xl mt-6 self-center"
      >
        <Text className="text-white font-bold">View on Map</Text>
      </Link>
    </ScrollView>
  );
}