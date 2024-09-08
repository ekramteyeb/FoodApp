import { DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { Text } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';
import CartProvider from '@/src/providers/CartProvider'

import { useColorScheme } from '@/src/components/useColorScheme';
import AuthProvider from '../providers/AuthProvider';
import QueryProvider from '../providers/QueryProvider';
import { StripeProvider } from '@stripe/stripe-react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import NotificationProvider from '../providers/NotificationProvider';
import * as Linking from 'expo-linking'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();


//expo deep linking 
const prefix = Linking.createURL('/')

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome5.font,
  });
  const [isReady, setIsReady] = useState(false);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
   // Handle font loading error
    if (error) {
      console.error('Font loading error:', error);
      setIsReady(true);  // Ensure that splash screen hides even if there is a font error
    }
  }, [error]);

  useEffect(() => {
   let timeout: string | number | NodeJS.Timeout | undefined;

    // When fonts are loaded or after a timeout, hide the splash screen
    if (fontsLoaded) {
      setIsReady(true);
    } else {
      // Set a timeout to hide splash screen even if fonts fail to load
      timeout = setTimeout(() => {
        console.warn('Font loading timeout reached, hiding splash screen.');
        setIsReady(true);
      }, 5000); // 5 seconds timeout
    }

    return () => clearTimeout(timeout);  // Cleanup the timeout when component unmounts
  }, [fontsLoaded]);

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;  // Keep showing splash screen until ready
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const linking = {
    prefixes : [prefix]
  }
  
  
  return (
    <StripeProvider
      publishableKey={
        process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
      }
    >

    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AuthProvider>
          <QueryProvider>
            <NotificationProvider>
              <CartProvider>
                <NavigationContainer  linking={linking} fallback={<Text> Loading</Text>}>
                <Stack  screenOptions={{
                  /* headerRight: () => (
                    <Link href="/" asChild>
                      <Pressable>
                        {({ pressed }) => (
                          <FontAwesome5
                            name="plane"
                            size={25}
                            color={Colors.light.tint}
                            style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                          />
                        )}
                      </Pressable>
                    </Link>

                  ), */
                  }}>
                    
                    <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                    <Stack.Screen name="(user)" options={{ headerShown: false }} />
                    <Stack.Screen name="(admin)" options={{ headerShown: false }} />
                    <Stack.Screen name="cart" options={{  presentation: 'modal', animation: 'slide_from_bottom' }} />
                  </Stack>
                  </NavigationContainer>
                </CartProvider>
              </NotificationProvider>
          </QueryProvider>
      </AuthProvider>
      </ThemeProvider>
    </StripeProvider>
  );
}
