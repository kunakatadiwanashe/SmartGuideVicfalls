import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const iconColor = Colors[colorScheme ?? 'light'].tabIconDefault;
  const activeIconColor = Colors[colorScheme ?? 'light'].tabIconSelected;

  return (
    <Tabs
      screenOptions={{
        tabBarButton: (props) => <HapticTab {...props} />,
        tabBarActiveTintColor: activeIconColor,
        tabBarInactiveTintColor: iconColor,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].background + 'CC', // semi-transparent
          borderTopWidth: 0.5,
          borderTopColor: Colors[colorScheme ?? 'light'].icon,
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginBottom: 0,
        },
        tabBarItemStyle: {
          paddingVertical: 4,
        },
      }}
    >
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: 'Explore',
          tabBarIcon: ({ color, focused, size = 24 }) => (
            <Ionicons 
              name={focused ? "map" : "map-outline"} 
              size={size} 
              color={color} 
            />
          ),
        }} 
      />
      <Tabs.Screen 
        name="map" 
        options={{ 
          title: 'Map',
          tabBarIcon: ({ color, focused, size = 24 }) => (
            <Ionicons 
              name={focused ? "location" : "location-outline"} 
              size={size} 
              color={color} 
            />
          ),
        }} 
      />
      <Tabs.Screen 
        name="guide" 
        options={{ 
          title: 'Guide',
          tabBarIcon: ({ color, focused, size = 24 }) => (
            <Ionicons 
              name={focused ? "compass" : "compass-outline"} 
              size={size} 
              color={color} 
            />
          ),
        }} 
      />
      <Tabs.Screen 
        name="store" 
        options={{ 
          title: 'Store',
          tabBarIcon: ({ color, focused, size = 24 }) => (
            <Ionicons 
              name={focused ? "cart" : "cart-outline"} 
              size={size} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="store/[productId]"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
