// Temporary static fallback until Supabase setup
import type { TouristSpot } from "../data/spots";
import { touristSpots } from "../data/spots";

export const fetchSpots = async (): Promise<TouristSpot[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return touristSpots;
};

export const fetchSpotBySlug = async (
  slug: string,
): Promise<TouristSpot | null> => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return touristSpots.find((s) => s.id === slug) || null;
};

import type { StoreProduct } from "../data/storeProducts";
import { storeProducts } from "../data/storeProducts";

export const fetchStoreProducts = async (): Promise<StoreProduct[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return storeProducts;
};
