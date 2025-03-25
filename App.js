import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SearchPage from "./SearchPage.jsx";
import Header from "./Header.jsx";
import { SafeAreaView } from "react-native-safe-area-context";
export default function App() {
  return (
    <>
      <Header />
      <SafeAreaView style={styles.container} edges={["left", "right", "top"]}>
        <SearchPage />
        <StatusBar style="auto" />
      </SafeAreaView>
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
