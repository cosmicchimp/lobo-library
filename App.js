import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SearchPage from "./SearchPage.jsx";
import Header from "./Header.jsx";
export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      <SearchPage />
      <StatusBar style="auto" />
    </View>
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
