import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { icons } from "../../../lib/constants/icons"


const handleUNMPress = () => {
  console.log("Sign in with SSO (UNM) Pressed!");
};

function Page() {

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.container}>

      {/* Account */}
      <View >
        <Text style={styles.textHeader}>Account</Text>
      </View>
      <TouchableOpacity style={styles.buttonUNM} onPress={handleUNMPress}>
        <Text style={[styles.text, {color:"#FFFFFF"}]}>Sign in with SSO (UNM)</Text>
      </TouchableOpacity>
      <View style={styles.seperator}></View>

      {/* Settings */}
      <View >
        <Text style={styles.textHeader}>Settings</Text>
      </View>

      <TouchableOpacity style={styles.buttonSettings} onPress={handleUNMPress}>
        <View style={styles.buttonContent}>
          <Text style={[styles.text]}>Notifications</Text>
          <View style={styles.iconContainer}>{icons.settingsNotifications({})}</View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonSettings} onPress={handleUNMPress}>
        <View style={styles.buttonContent}>
          <Text style={[styles.text]}>Accessibility</Text>
          <View style={styles.iconContainer}>{icons.settingsAccessibility({})}</View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonSettings} onPress={handleUNMPress}>
        <View style={styles.buttonContent}>
          <Text style={[styles.text]}>Downloads</Text>
          <View style={styles.iconContainer}>{icons.settingsDownloads({})}</View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonSettings} onPress={handleUNMPress}>
        <View style={styles.buttonContent}>
          <Text style={[styles.text]}>Language</Text>
          <View style={styles.iconContainer}>{icons.settingsLanguage({})}</View>
        </View>
      </TouchableOpacity>


      {/* Help & Privacy */}
      
      <View >
        <Text style={styles.textHeader}>Help & Privacy</Text>
      </View>
      <TouchableOpacity style={styles.buttonSettings} onPress={handleUNMPress}>
        <View style={styles.buttonContent}>
          <Text style={[styles.text]}>Contact UNM Libraries</Text>
          <View style={styles.iconContainer}>{icons.helpContact({})}</View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonSettings} onPress={handleUNMPress}>
        <View style={styles.buttonContent}>
          <Text style={[styles.text]}>Find UNM Libraries</Text>
          <View style={styles.iconContainer}>{icons.helpFind({})}</View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonSettings} onPress={handleUNMPress}>
        <View style={styles.buttonContent}>
          <Text style={[styles.text]}>Privacy Statement</Text>
          <View style={styles.iconContainer}>{icons.helpPrivacy({})}</View>
        </View>
      </TouchableOpacity>

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