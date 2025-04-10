import React, { useContext } from "react";
import { useRouter } from "expo-router";

import { StyleSheet, View, TextInput, TouchableOpacity, Image, Animated } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { icons } from "../../constants/icons";
import { useNavigation } from "expo-router";
import { SearchContext } from "../../context/SearchContext";


const SearchBar = ({ widthAnim, marginLeftAnim,quieried}) => {

  const router = useRouter();
  const { userInput, setUserInput, handleSearch, textInputRef, isFocused, setIsFocused, recentSearches } = useContext(SearchContext);

  return ( 
    <View>
      <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between", width: "100%"}}>

        {/* back button */}
        <TouchableOpacity 
            onPress={() => {router.back(); setIsFocused(false); setUserInput("")}} 
            style={[styles.backButton, { display: false ? "none" : "flex" }]}>
          <View >
              {icons.menuLeft({ size: 24, color: "#007a86" })}
          </View>
        </TouchableOpacity>

        {/* Search Range */}
        <Animated.View>
          <TouchableOpacity 
            style={[styles.searchRanger, {  }]} 
            onPress={() => alert("Image clicked!")}
          >
            <Image
              source={require("../../assets/images/UNMLogo.png")} 
              style={{ width: 40, height: 40 }}
            />
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Search bar (absolute overlay) */}
      <Animated.View
        style={{
          position: "absolute",
          alignSelf: "center",
          width: 
            (!quieried && userInput=="")
              ? widthAnim.interpolate({
                  inputRange: [82, 100],
                  outputRange: ["82%", "100%"],
                })
                : (quieried)
                ? widthAnim.interpolate({
                    inputRange: [64, 100], 
                    outputRange: ["64%", "100%"]
                  })
                  : widthAnim.interpolate({
                    inputRange: [0, 100],  
                    outputRange: ["0%", "100%"]
                  }),
          transform: [{
            translateX: (!quieried && userInput!=="")
              ? widthAnim.interpolate({
                inputRange: [0, 100],
                outputRange: [0, 0] 
              })
              : (!quieried && userInput==="" ) 
                ? widthAnim.interpolate({
                  inputRange: [0, 100],
                  outputRange: [0, -40] 
                })
                : "0%"
          }]
        }}
      >
          {/* icon, text input, and cancel button*/}
          <View style={styles.searchbar}>

            {/* search icon */}
            <View style={{justifyContent:"center", alignItems:"center", width:30}}>
              <Icon name="search" size={20} color="#007a86" />
            </View>

            {/* search input */}
            <TextInput
              ref={textInputRef}
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                if (userInput === "" && quieried) {
                  setIsFocused(false); // only blur when input is empty
                }
              }}              
              style={[styles.bookInput, {width: quieried ? "71%" : "83%",}]}
              onChangeText={(text) => setUserInput(text.trimStart())}
              onSubmitEditing={handleSearch}
              placeholder="Search..."
              placeholderTextColor={"#007a86"}
              value={userInput}
            />
        
            {/* cancel button (x) ,*/}
            <View style={{justifyContent:"center", marginRight: (quieried) ? 20 : 0}}>
              <TouchableOpacity  
                onPress={() => {
                  if (quieried) router.back();
                  setUserInput(""); 
                }} 
                style={[styles.cancelButton, {display: userInput==="" ? "none" : "flex", marginLeft:-0}]}>
                {icons.x({ size: 18, color: "#007a86" })}          
              </TouchableOpacity>
            </View>
          </View>
      </Animated.View>
    </View>
  );
};

export default SearchBar;
const styles = StyleSheet.create({
  searchbarContainer:{
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButton:{
    borderRadius: 25,
    height:30,
    width:30,
    justifyContent:"center", 
    alignItems:"center", 
    backgroundColor: "rgba(0, 122, 134,0.2)", 
  },
  backButton: {
    width: 60, height: 60, 
    alignItems: "center", 
    justifyContent: "center",
    backgroundColor: "white",
    borderColor: '#007a86',
    borderRadius: 35,
    borderWidth: 4,
    paddingRight: 3
  },
  bookInput: {
    color: "black",
    fontSize: 18,
    height:52,
    alignContent: "flex-start",
    justifyContent: "flex-start",
  },
  searchbar: {
    flexDirection: "row",
    backgroundColor: "rgb(255, 255, 255)",
    height: 60,
    borderRadius: 35,
    alignItem: "center",
    justifyContent: "space-between",
    borderWidth: 4,
    borderColor: '#007a86',
    paddingHorizontal: 15,
  },
  searchRanger: {
    borderWidth: 4,
    backgroundColor: "white",
    borderColor: '#007a86',
    borderRadius: 35,
    overflow: 'hidden',
    width: 60, 
    height: 60, 
    alignItems: "center", 
    justifyContent: "center"
  },
});
