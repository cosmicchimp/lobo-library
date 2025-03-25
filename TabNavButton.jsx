import React, {useEffect} from "react";
import { useIsFocused } from "@react-navigation/native"; // This hook helps you check if the tab is focused
import { Pressable, Text, View, } from "react-native";
import { interpolate, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { icon } from "./constants/icons";
 const TabNavButton = ({
  routeName,
  navigation,
  size=24
}) => {
  const scale = useSharedValue(0);
  const isTabFocused = useIsFocused(); 

  useEffect(()=> {
    scale.value = withSpring(typeof isFocused === "boolean" ? (isTabFocused ? 1 : 0) : isTabFocused, 
    { duration: 350}
  );
  }, [scale, isTabFocused]);  

  const animatedTextStyle = useAnimatedStyle(()=>{
    const opacity = interpolate(scale.value, [0, 1], [1, 0]);
    return {opacity}
  })

  const onPress = () => {
    if (!isTabFocused) navigation.navigate(routeName); 
  };

  const onLongPress = () => {
    console.log(`Long pressed on ${routeName}`);
  };

  return (
    <Pressable 
      onPress={onPress} 
      onLongPress={onLongPress}
      style={({ pressed }) => ({
        opacity: pressed ? 0.6 : 1, //  fade effect when pressed
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center', 
      })}
    >
      
      {icon[routeName.toLowerCase()]?.({ color: isTabFocused ? "#ba0c2f" : "#63666a", size })}
      <Text style={{color: isTabFocused ? "#ba0c2f" : "#63666a"}}>{routeName}</Text>
    </Pressable>
  );size
};

export default TabNavButton;