import React, {useEffect} from "react";
import { useIsFocused } from "@react-navigation/native"; // This hook helps you check if the tab is focused
import { Pressable, Text, View, } from "react-native";
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring, ReduceMotion } from "react-native-reanimated";
import { icon } from "./constants/icons";
 const TabNavButton = ({
  routeName,
  navigation,
  size=24
}) => {
  const scale = useSharedValue(0);
  const isTabFocused = useIsFocused(); 

  useEffect(() => {
    scale.value = withSpring(isTabFocused ? 1 : 0, 
      { duration: 350, reduceMotion: ReduceMotion.Never, });
  }, [scale, isTabFocused]);

  const animatedIconStyle = useAnimatedStyle(()=>{
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2]);

    const top = interpolate(scale.value,  [0, 1], [0, 9]);

    return {
      transform: [{
        scale: scaleValue
      }],
      top: top
  }
  })

  const animatedTextStyle = useAnimatedStyle(()=>{
    const opacity = interpolate(scale.value, [0, 1], [1, 0]);
    return {opacity,}
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

      {/* set tab icon */}
      <Animated.View style={animatedIconStyle}>
        {icon[routeName.toLowerCase()]?.({ color: isTabFocused ? "#ba0c2f" : "#63666a", size })}
      </Animated.View>

      {/* set tab text label */}
      <Animated.Text 
        style={{
          ...animatedTextStyle,
           color: isTabFocused ? "#ba0c2f" : "#63666a",
        }}
        >
          {routeName}
        </Animated.Text>
    </Pressable>
  );
};

export default TabNavButton;