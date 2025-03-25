import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import SearchPage from "./SearchPage";
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

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route, navigation, state }) => {
          return {

            // Pressable object for each nav button
            tabBarButton: (props) => (
              <TabNavButton
                {...props}
                routeName={route.name}
                navigation={navigation}
              />
            ),

            // Nav bars style
            tabBarStyle: {
              position: "absolute",
              height: 80,
              backgroundColor: "#F9F9F9",
              borderColor: "black",
              paddingTop: 10,
            },
          };
        }}
      >
        <Tab.Screen name="Home" component={HomePage} />
        <Tab.Screen name="Search" component={SearchPage} />
        <Tab.Screen name="Profile" component={ProfilePage} />
  
      </Tab.Navigator>
    </NavigationContainer>
  );
}
 