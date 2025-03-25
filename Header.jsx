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
    height: "10%",
    textAlign: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  title: {
    top: "10%",
    fontWeight: 800,
    color: "white",
    fontSize: 20,
    alignSelf: "center",
  },
});
