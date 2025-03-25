import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Octicons from '@expo/vector-icons/Octicons';
import SearchPage from "./SearchPage"; 

const TabBarIcon = ({ name, color, onPress }) => {
  return (
    <Pressable 
      onPress={onPress} 
      style={({ pressed }) => ({
        opacity: pressed ? 0.6 : 1, // Adds a slight fade effect when pressed
      })}
    >
      <Octicons name={name} size={24} color={color} />
    </Pressable>
  );
};