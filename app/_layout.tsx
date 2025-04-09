import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect , useState } from 'react';
import { View } from 'react-native';
import 'react-native-reanimated';
import { SearchProvider } from '@/context/SearchContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [fontsLoaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    LoboFont: require("../assets/fonts/AmericanCaptain-MdEY.otf"),
    HeaderFont: require("../assets/fonts/Lucida-Grande-Regular-Font.ttf"),
    HeaderFont2: require("../assets/fonts/Poppins-Bold.ttf"),
    Gotham: require("../assets/fonts/Gotham-Black.ttf")

  });

  const loadData = async () => {
    try {
      // Simulate data fetching with timeout (replace with actual fetches)
      const response1 = await fetch('https://api.example.com/data1');
      const data1 = await response1.json();

      const response2 = await fetch('https://api.example.com/data2');
      const data2 = await response2.json();

      // After data is fetched, you can store the data in the state or context as needed
      // (e.g., useContext, Redux, or just useState)

      setDataLoaded(true); // Trigger the UI update once data is loaded
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  useEffect(() => {
    console.log("Assets Loaded:", fontsLoaded && dataLoaded);  // Debugging
    if (fontsLoaded && dataLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, dataLoaded]);
  
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || error) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);
  if (!fontsLoaded && !error) return null;
  
  if (dataLoaded) {
    return( 
      <SearchProvider>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </View>
    </SearchProvider>
    );
  }
}