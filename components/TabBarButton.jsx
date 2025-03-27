import { Text, Pressable, StyleSheet } from "react-native"
import React, {useEffect} from "react"
import { icon } from "../constants/icons"
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring, ReduceMotion } from "react-native-reanimated";
const TabBarButton = ({onPress, onLongPress, isFocused, routeName, color, label}) => {

    const scale = useSharedValue(0);
  
    useEffect(() => {
      scale.value = withSpring(isFocused ? 1 : 0, 
        { duration: 350, reduceMotion: ReduceMotion.Never, });
    }, [scale, isFocused]);
  
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

    return (
        <Pressable 
        onPress={onPress} 
        onLongPress={onLongPress}
        style={({ pressed }) => [
            styles.tabbarbutton,
            {opacity: pressed ? 0.6 : 1}
        ]}
        >
        {/* Animated Tab Icon */}
        <Animated.View style={animatedIconStyle}>
            {icon[routeName.toLowerCase()]?.( {color: isFocused ? "#FFFFFF" : "#63666a",} )}
        </Animated.View>

        {/* Animated Tab Label */}
        <Animated.Text style={[{fontSize: 12, color: isFocused ? "#ba0c2f" : "#63666a"}, animatedTextStyle]}> {label} </Animated.Text>
        </Pressable>
    ) 
}

export default TabBarButton;

const styles = StyleSheet.create({
    tabbarbutton: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
        zIndex: 1
    }
})