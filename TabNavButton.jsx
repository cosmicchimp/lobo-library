import React from "react";
import Octicons from '@expo/vector-icons/Octicons';

const TabNavButton = ({ name, color, onPress }) => {
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