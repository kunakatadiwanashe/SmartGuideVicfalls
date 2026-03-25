import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Explore', tabBarIcon: ({ color }) => <Text>🗺️</Text> }} />
      <Tabs.Screen name="map" options={{ title: 'Map', tabBarIcon: ({ color }) => <Text>📍</Text> }} />
      <Tabs.Screen name="guide" options={{ title: 'Guide', tabBarIcon: ({ color }) => <Text>🧭</Text> }} />
      <Tabs.Screen name="store" options={{ title: 'Store', tabBarIcon: ({ color }) => <Text>🛒</Text> }} />
    </Tabs>
  );
}

