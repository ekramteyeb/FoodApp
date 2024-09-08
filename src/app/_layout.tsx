import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';
import CartProvider from '@/src/providers/CartProvider';

import { useColorScheme } from '@/src/components/useColorScheme';
import AuthProvider from '../providers/AuthProvider';
import QueryProvider from '../providers/QueryProvider';
import { StripeProvider } from '@stripe/stripe-react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import NotificationProvider from '../providers/NotificationProvider';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Expo deep linking

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome5.font,
  });
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (error) {
      console.error('Font loading error:', error);
      setIsReady(true);  // Ensure that splash screen hides even if there is a font error
    }
  }, [error]);

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined;

    if (fontsLoaded) {
      setIsReady(true);
    } else {
      timeout = setTimeout(() => {
        console.warn('Font loading timeout reached, hiding splash screen.');
        setIsReady(true);
      }, 5000); // 5 seconds timeout
    }

    return () => clearTimeout(timeout);
  }, [fontsLoaded]);

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return <Slot />
    //return null;  // Keep showing splash screen until fonts are ready
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  

  return (
    <StripeProvider publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AuthProvider>
          <QueryProvider>
            <NotificationProvider>
              <CartProvider>
                
                  <Stack screenOptions={{}}>
                    {/* Define your screens here */}
                    <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                    <Stack.Screen name="(user)" options={{ headerShown: false }} />
                    <Stack.Screen name="(admin)" options={{ headerShown: false }} />
                    <Stack.Screen name="notification-detail" />
                    <Stack.Screen name="cart" options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
                  </Stack>

              </CartProvider>
            </NotificationProvider>
          </QueryProvider>
        </AuthProvider>
      </ThemeProvider>
    </StripeProvider>
  );
}
