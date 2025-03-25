import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Text, View } from "react-native";
import SearchPage from "./SearchPage"; 
import Octicons from '@expo/vector-icons/Octicons';
import TabNavButton from "./TabNavButton"; 


// Sample screens replace with file and reference it later
function HomePage() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home Screen</Text>
    </View>
  );
}
function ProfilePage() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings Screen</Text>
    </View>
  );
}

// Tab Bar Button


// Basic tab navigation
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Home") iconName = "home";
            else if (route.name === "Search") iconName = "search";            
            else if (route.name === "Profile") iconName = "person";           
            else iconName = "";        

            return <Octicons name={iconName} size={size} color={color} />;
            
          },

        // Correct positioning of the tab bar
        tabBarStyle: {
            // backgroundColor: "#F9F9F9", 
            // borderRadius: 35,
            // height: 80, 
            // paddingTop:5,
            // paddingBottom: 5,
            // borderTopWidth: 1, 
            // borderTopColor: "#83888f",
            position: "absolute",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: 35,
            marginHorizontal: 50,
            bottom: 40,
            height: 70,

            backgroundColor: "#F9F9F9", 
            shadowColor: "000",
            shadowOffset: {width:0, height: 10},
            shadowRadius: 10,
            shadowOpacity: 0.1

          },
        tabBarLabelStyle: {
            fontSize: 12,
            marginBottom: 5, 
          },
        tabBarActiveTintColor: "#ba0c2f", 
        tabBarInactiveTintColor: "#63666a", 
        })}
      >
        <Tab.Screen name="Home" component={HomePage} />
        <Tab.Screen name="Search" component={SearchPage} /> 
        <Tab.Screen name="Profile" component={ProfilePage} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}
