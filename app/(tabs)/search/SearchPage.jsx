import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Keyboard, Dimensions} from "react-native";
import Octicons from "@expo/vector-icons/Octicons";
import { useRouter } from "expo-router";
import { BlurView } from "expo-blur";
import PullDownBar from "../../../components/PullDownBar";
import { useContext } from "react";
import { SearchContext } from "../../../context/SearchContext";



export default function SearchPage() {
  const { userInput, setUserInput, recentSearches, setRecentSearches, handleSearch, textInputRef, isFocused, setIsFocused } = useContext(SearchContext);

  // Set userInput: if a selection is made from recently searched
  const [selection, setSelection] = useState("");
  useEffect(() => {
    console.log("Selected item:", selection);
    if (selection !== "") {
      setUserInput(selection);
      setSelection("");
    }
  }, [selection]); 

 

//////////////////////////////////////////////////////////////////////////////////
  return (
    // Top Bar Scroll with filters
    <View style={{flexDirection:"column", }}>

      {/*Recently made searches*/}
      <View style={{top: 200, position:"absolute"}}>
        <BlurView tint={"dark"} intensity={0} style={[styles.searchBlur, {display: (recentSearches.length > 0 && userInput.trim() === "" ? "flex" : "none")}]}>
          <View style={[styles.searchBlurContainer, {  }]}>
            
            {/* title */}
            <View style={styles.recentlySearchedItemTitle}>
              <Text style={{ fontFamily: "HeaderFont2", fontSize: 24, borderBottomColor: "#a7a8aa" }}>
                Recent Queries
              </Text>
              <TouchableOpacity onPress={() => setRecentSearches([])} style={{ padding: 3, alignContent:"center" }}>
                <Octicons name="x" size={21} />
              </TouchableOpacity>
            </View>

            <FlatList
              data={recentSearches}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{ paddingBottom: 20 }}
              renderItem={({ item }) => (
                // recently searched item
                <TouchableOpacity style={styles.recentlySearchedItem} onPress={() => {setSelection(item.toString()); textInputRef.current?.focus(); handleSearch();}}>
                  <Text style={{ paddingVertical: 6, fontSize: 18, color:"#007a86", fontFamily: "Gotham" }}>{item}</Text>
                  <TouchableOpacity
                    onPress={() => setRecentSearches(recentSearches.filter((search) => search !== item))}
                    style={{ padding: 5 }}
                  >
                    <Octicons name="x" size={15} />
                  </TouchableOpacity>
                </TouchableOpacity>
              )}
            />
          </View>
        </BlurView>
      </View>
    </View>    
  );
}

//Styles past this point
const styles = StyleSheet.create({
  container: { }, // Stack views vertically, margin: 50, backgroundColor: "transparent" },
  bookItem: {
    marginBottom: 20,
    alignSelf: "center",
  },
  bookInput: {
    minWidth: "90%",
    marginLeft: 10,
    borderRadius: 10,
    color: "black",
    fontSize: 18,
  },
  bookImage: {
    width: 100,
    height: 150,
    marginBottom: 10,
    marginTop: 30,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
  },
  text: {
    color: "black",
    maxWidth: "70%",
    textAlign: "center",
    borderBottomWidth: 1,
    borderBottomColor: "white",
    paddingBottom: 10,
    marginBottom: 10,
    color: "white",
    fontFamily: "Georgia",
    fontWeight: 600,
    marginTop: 10,
  },
  bookCarousel: {
    marginTop: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  bookBox: {
    padding: 20,
    width: 200,
    height: 320,
    marginBottom: 60,
    alignSelf: "center",
    borderRadius: 10,
    backgroundColor: "rgba(186, 12, 47, 1)",
  },
  searchBlur: {
    borderRadius: 25,
    alignItems: "flex-start",
    //backgroundColor: "rgba(0, 122, 134,0.5)",
    overflow:"hidden",
    marginHorizontal: 40,

  },
  searchBlurContainer:{
    overflow:"visible",
    justifyContent: "left",
    alignItems: "center",
    paddingHorizontal: 20,
    borderRadius: 25,
    height:"auto",
    overflow:"hidden"
  },
  recentlySearchedItemTitle:{
    flexDirection:"row", 
    alignContent:"center", 
    justifyContent:"space-between", 
    width:"100%", marginTop:10, 
    paddingVertical:10,

    borderBottomColor: "#77", 
    borderBottomWidth:1
  },
  recentlySearchedItem:{
    flexDirection:"row", 
    alignContent:"center", 
    justifyContent:"space-between", 
    width:"100%",
    paddingVertical:10,
    borderBottomColor: "#77", 
    borderBottomWidth:1,
  },

});
