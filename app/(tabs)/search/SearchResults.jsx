import { useGlobalSearchParams } from "expo-router";
import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Keyboard, Dimensions} from "react-native";
import PullDownBar from "../../../components/PullDownBar";
import { SearchContext } from "../../../context/SearchContext";
import { LinearGradient } from "expo-linear-gradient";


export default function SearchResults() {
  // const params = useGlobalSearchParams(); // Get query parameters safely
  // const query = params.query || ""; // Default to empty string if undefined
  const { userInput, setUserInput, handleSearch, textInputRef, isFocused, setIsFocused, recentSearches } = useContext(SearchContext);
  const params = useGlobalSearchParams();


  useEffect(() => {
    if (params.query && params.query !== userInput) {
      setUserInput(params.query); // Update state only if query is different
    }
  }, []);

  return (
    <LinearGradient
            colors={['rgba(255, 255, 255, 1)', 'rgba(245, 245, 245, 0.8)', 'rgba(230, 230, 230, 0.7)']}
            style={{ flex: 1 }}
    >
      <View>

      </View>
    </LinearGradient>
  );
}
