import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect } from 'react';
import { View } from 'react-native';
import 'react-native-reanimated';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    LoboFont: require("../assets/fonts/AmericanCaptain-MdEY.otf"),
    HeaderFont: require("../assets/fonts/Lucida-Grande-Regular-Font.ttf"),
    HeaderFont2: require("../assets/fonts/Poppins-Bold.ttf"),
    Gotham: require("../assets/fonts/Gotham-Black.ttf")


  });

  useEffect(() => {
    console.log("Fonts loaded:", loaded);  // Debugging
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);
  
  const onLayoutRootView = useCallback(async () => {
    if (loaded || error) {
      await SplashScreen.hideAsync();
    }
  }, [loaded, error]);
  if (!loaded && !error) return null;
  
  return( 
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
}