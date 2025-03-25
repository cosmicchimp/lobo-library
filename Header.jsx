import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  Image,
} from "react-native";
export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>LoboLibrary</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: "rgba(186, 12, 47, 1)",
    width: "100%",
    top: "5%",
    height: "10%",
    textAlign: "center",
    alignSelf: "center",
  },
  title: {
    fontWeight: 800,
    color: "white",
    top: "50%",
    left: "49%",
    transform: "translateX(-49%)",
    fontSize: 20,
  },
});
