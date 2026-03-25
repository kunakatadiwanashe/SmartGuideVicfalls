import { config } from '@gluestack-ui/config';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { SafeAreaProvider } from 'react-native-safe-area-context';



const queryClient = new QueryClient();

export default function RootLayout() {
    return (
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <GluestackUIProvider config={config}>
            <StatusBar style="auto" />
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="spots/[slug]" />
            </Stack>
          </GluestackUIProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    );
}

