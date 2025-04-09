import { View, Text, StyleSheet } from "react-native";

function IndexHeader() {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Lobo Library</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#F8F8F8",
    height:100,
    alignItems: "left", 
    paddingLeft: 15,
    borderBottomWidth: 2, 
    borderBottomColor: "#ba0c2f",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3, 
  },
  headerText: {
    color: "#ba0c2f",
    fontFamily: "LoboFont",
    fontSize: 42,
    accessibilityRole: "header",
    textTransform: "uppercase", 
    letterSpacing: 1, 
    paddingTop:57
  },
});

export default IndexHeader;
