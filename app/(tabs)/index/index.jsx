import React, { useState } from "react";
import { View, Text, Switch, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { icons } from "../../../constants/icons"


const handleUNMPress = () => {
  console.log("Sign in with SSO (UNM) Pressed!");
};

function Page() {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.container}>
      <View>
        <Text style={styles.textHeader}>Stuff</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#fff" },
  seperator: {
    marginVertical: 25,
    borderBottomWidth: 2,
    borderBottomColor: "#ddd",
  },
  item: {
    flexDirection: "row",
    //justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  text: { fontSize: 16 },
  whiteText: {fontSize: 18, color: "white"},
  textHeader: {
    fontFamily: "HeaderFont2",
    fontSize: 24,       // Large text
    //fontWeight: "bold", // Bold text
    textAlign: "left", // Center align
    paddingVertical: 15, // Top & bottom padding
    color: "#525559",      // Dark gray color
   // textTransform: "uppercase", // Makes text uppercase
    letterSpacing: 1,  
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40, 
    
  },
  buttonSettings: {
    backgroundColor: "#FFF",
    paddingVertical: 15,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignItems: "left",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
    justifyContent: "space-between",

  },
  buttonUNM: {
    backgroundColor: "#ba0c2f",
    paddingVertical: 15,
    paddingHorizontal: 24,
    marginVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
    
});


export default Page;