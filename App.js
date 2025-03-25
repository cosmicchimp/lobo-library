import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import TabNavigator from "./TabNavigation.jsx";
import Header from "./Header.jsx";
import { SafeAreaView } from "react-native-safe-area-context";
export default function App() {
  return (
    <>
      <Header />
      <StatusBar style="auto" />
      <TabNavigator />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    alignItems: "center",
  },
});
