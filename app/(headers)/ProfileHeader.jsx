import { View, Text, StyleSheet } from "react-native";

function ProfileHeader() {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Profile</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#F8F8F8",
    height:100,
    alignItems: "left", 
    paddingLeft: 14,
    borderBottomWidth: 2, 
    borderBottomColor: "#a7a8aa",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3, 
  },
  headerText: {
    color: "#000000",
    fontFamily: "HeaderFontt",
    fontSize: 35,
    fontWeight: "bold",
    letterSpacing: -1, 
    paddingTop:52
  },
});

export default ProfileHeader;
