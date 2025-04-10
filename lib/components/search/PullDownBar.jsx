import { useRouter } from "expo-router";
import { Easing } from 'react-native';
import React, { useRef, useEffect, useState, useContext } from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Keyboard, Dimensions, Animated, ScrollView, Image, } from "react-native";
import SearchBar from "./SearchBar";
import { icons } from "../../constants/icons";
import { SearchContext } from "../../context/SearchContext";


import { use } from "react";

export default function PullDownBar({ recentSearches, quieried }) {
  const router = useRouter();
  const { userInput, setUserInput, handleSearch, textInputRef, isFocused, setIsFocused } = useContext(SearchContext);

  // Go back: if we are in results page AND the search bar is focused
  useEffect(() => {
    if (quieried && isFocused) router.back(); 
  }, [quieried, isFocused ]); 

  // Set userInput: if a selection is made from suggestions
  const [selection, setSelection] = useState("");
  useEffect(() => {
    if (selection !== "") {
      setUserInput(selection);
      setSelection("");
    }
  }, [selection]); 


  // Ref to red top bar scroller
  //const scrollViewRef = useRef(null);

  // Handle top bar swipes
  const handleScroll = (event) => {
  const yOffset = event.nativeEvent.contentOffset.y;

  // Adjust behavior based on scroll position
  if (yOffset <= -10) {
    textInputRef.current?.focus(); // slide down focuses keyboard and text
    // trigger paw flash
    if (yOffset <= -100){
      hasAnimated.current = true; // Mark animation as played
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 0.8, // Shrink a little
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(rotateAnim, {
            toValue: 1, // Rotate slightly
            duration: 100,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.spring(scaleAnim, {
            toValue: 1, // Bounce back to normal
            friction: 4,
            useNativeDriver: true,
          }),
          Animated.timing(rotateAnim, {
            toValue: 0, // Reset rotation
            duration: 100,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    }
  } 
  if (yOffset > -100) hasAnimated.current = false;
  if (yOffset >= 10) {
    textInputRef.current?.blur(); // Reset searchInput when leaving range
    if (quieried) router.back(); 
    setUserInput("");
  }
  };

  // Animate the search bar and search ranger width when userInput changes
  const widthAnim = useRef(new Animated.Value(83)).current;  // Start at 83%
  const marginLeftAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    let f = 80;
    let t = 120;
    if (!quieried && userInput !== "") {
      Animated.spring(widthAnim, { toValue: 100, friction: f, tension: t, useNativeDriver: false }).start();
    } else if (quieried) {
      Animated.spring(widthAnim, { toValue: 64, friction: f, tension: t, useNativeDriver: false }).start();
    } else {
      Animated.spring(widthAnim, { toValue: 82, friction: f, tension: t, useNativeDriver: false }).start();
    }
  }, [userInput, quieried]);  
  
  // Animate border radius
  const borderRadiusAnim = useRef(new Animated.Value(35)).current;
    useEffect(() => {
      // Animate border radius based on user input
      Animated.spring(borderRadiusAnim, {
        toValue: userInput !== "" ? 0 : 35,  // Change to 0 when user input exists
        duration: 300,
        friction: 5, // Lower friction for a bouncier effect
        useNativeDriver: false,  // BorderRadius doesn't work with native driver
      }).start();
    }, [userInput]);

  // Animate paw logo
  const hasAnimated = useRef(false); 
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const rotateInterpolation = rotateAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "15deg"], 
  });
    
  // Listen for keyboard height to properly adjust search selections
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  useEffect(() => {
    // Listens for when the keyboard shows
    const keyboardDidShowListener = Keyboard.addListener( 'keyboardDidShow', (e) => { setKeyboardHeight(e.endCoordinates.height); },);
    // Listens for when the keyboard hides
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => { setKeyboardHeight(0); },);
    // Clean up listeners on component unmount
    return () => { keyboardDidHideListener.remove();  keyboardDidShowListener.remove(); };
  }, []);

/////////////////////////////////////////////////////////////////////////////////
  return (
    //red top bar scroller
    <View> 
        <ScrollView 
        style={styles.scrollView} 
        onScroll={handleScroll}
        scrollEventThrottle={16}
        >
            <View style={styles.topBarContainer}>

                {/* red top bar */}
                <Animated.View style={[styles.topBar, { borderRadius: !quieried ? borderRadiusAnim : 0}]}>

                    {/* paw logo */}
                    <Animated.View style={[styles.logoContainer, { transform: [{ scale: scaleAnim }, { rotate: rotateInterpolation }] }]}>
                        <Image source={require('../../assets/images/lobo_paw.png')} style={styles.logo} />
                    </Animated.View>

                    {/* search bar */}
                    <SearchBar 
                        userInput={userInput} 
                        setUserInput={setUserInput} 
                        handleSearch={handleSearch} 
                        textInputRef={textInputRef}
                        isFocused={isFocused}
                        setIsFocused={setIsFocused}
                        widthAnim={widthAnim}
                        marginLeftAnim={marginLeftAnim}
                        quieried={quieried}
                    />
                </Animated.View>
                
                {/* filters button */}
                <TouchableOpacity style={[styles.filtersButton, { display: userInput !== "" ? "none" : "flex" }]}>
                <View style={styles.bumpyFilterContainer}>
                    {icons.menuDown({ size: 24, color: "white" })}
                </View>
                </TouchableOpacity>

            </View>
        </ScrollView>

        {/* Possible Search Selections */}
        <View style={[styles.searchSelections, { height: true ? (Dimensions.get('window').height) : keyboardHeight+10 , display: (userInput.trim() !== "" && isFocused ? "flex" : "none")}]}>
            <FlatList
                data={recentSearches}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                <TouchableOpacity 
                  style={[ styles.recentlySearchedItem, {borderBottomColor: index === recentSearches.length - 1 ? "transparent" : "#ccc", }, // hide bottom border for last item
                  ]} 
                  onPress={() => { setSelection(item.toString()); handleSearch(); }}
                  >
                    <Text style={{  paddingHorizontal: 15, paddingVertical:14, fontSize: 18, fontFamily: "Gotham"  }}>{item}</Text>     
                </TouchableOpacity>
                )}
                ListFooterComponent={<View style={{ height: keyboardHeight === 0 ? 0 : 325}} />} // Footer component
            />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    position: "absolute",
    width: "100%",
    zIndex: 1,
    overflow:"visible"
  },
  topBarContainer: {
    flexDirection: "column",
    marginTop: -410,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    backgroundColor: "#ba0c2f",
    height: 550,
    width: "100%",
    borderRadius: 35,
    paddingBottom: 17,
    padding: 13,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  logoContainer: {
    position: "absolute",
    top: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 320,
    left: "46%",
    width: 50,
    height: 50,
  },
  logo: {
    width: 80,
    height: 80,
  },
  bumpyFilterContainer: {
    backgroundColor: '#007a86',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 3,
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginTop: -23,
    alignSelf: 'center',
    position: 'relative',
    zIndex: -1,
  },
  filtersButton: {
    zIndex: -1,
  },
  filterText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  recentlySearchedItemTitle:{
    flexDirection:"row", 
    alignContent:"center", 
    justifyContent:"space-between", 
    width:"100%", marginTop:15, 
    borderBottomColor: "#77", 
    borderBottomWidth:1
  },
  recentlySearchedItem:{
    flexDirection:"row", 
    alignContent:"center", 
    justifyContent:"space-between", 
    width:"100%",marginBottom:10,
    borderBottomColor: "#77", 
    borderBottomWidth:1,
  },
  searchSelections: {
    paddingTop:138,
    flexDirection:"column",
    backgroundColor:"#fff",
    borderColor:"#007a86",
    borderWidth:2,
  },
});
