import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import "react-native-reanimated";
import { SearchProvider } from "@/lib/context/SearchContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    SpaceMono: require("@/lib/assets/fonts/SpaceMono-Regular.ttf"),
    LoboFont: require("@/lib/assets/fonts/AmericanCaptain-MdEY.otf"),
    HeaderFont: require("@/lib/assets/fonts/Lucida-Grande-Regular-Font.ttf"),
    HeaderFont2: require("@/lib/assets/fonts/Poppins-Bold.ttf"),
    Gotham: require("@/lib/assets/fonts/Gotham-Black.ttf"),
  });

  useEffect(() => {
    console.log("Assets Loaded:", fontsLoaded); // Debugging
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || error) await SplashScreen.hideAsync();
  }, [fontsLoaded, error]);
  if (!fontsLoaded && !error) return null;

  return (
    <SearchProvider>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </View>
    </SearchProvider>
  );
}
