import { Stack, useSegments } from "expo-router";
import { ImageBackground, View } from "react-native";
import 'react-native-gesture-handler';
import { useContext } from "react";
import { SearchContext } from "@/context/SearchContext";
import PullDownBar from "@/components/PullDownBar";

export default function SearchLayout() {
  const {
    recentSearches,
  } = useContext(SearchContext);

  // Dynamically check if we're on the "results" screen
  const segments = useSegments();
  console.log("current path:", segments);
  const isQueried = segments[segments.length - 1] === "SearchResults";

  return (
    <ImageBackground 
      source={require('@/assets/images/unm_pattern(1).png')}
      style={{ flex: 1, width: "100%", height: "100%" }}
      resizeMode="cover"
    >
      <PullDownBar
        recentSearches={recentSearches}
        quieried={isQueried}
      />

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SearchPage" />
        <Stack.Screen name="SearchResults" />
      </Stack>
    </ImageBackground>
  );
}
