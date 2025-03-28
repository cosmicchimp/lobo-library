import React, {useState} from "react"
import { View, StyleSheet } from 'react-native';
import TabBarButton from "../components/TabBarButton";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, ReduceMotion} from "react-native-reanimated";

function TabBar({ state, descriptors, navigation }) {

  // tab background set up
  const [dimensions, setDimensions] = useState({ height: 20, width: 100 });
  const buttonWidth = state.routes ? dimensions.width / state.routes.length : 0;
  const onTabbarLayout = (e) => {
    setDimensions({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    });
  };

  // tab background animation style
  const tabPosX = useSharedValue(0);  // tracks position of the background
  const animatedBackgroundStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPosX.value}]
    }
  });


  return (
    <View
        onLayout={onTabbarLayout}
        style={[
          styles.tabbar,
          { borderTopColor: state.index === 0 ? "#ba0c2f" : "#a7a8aa" },
        ]}
      >
        {/* Animated Tab Background */}
        <Animated.View
          style={[
            animatedBackgroundStyle,
            {
              position: "absolute",
              height: dimensions.height - 35,
              width: buttonWidth - 40,
              backgroundColor: "#ba0c2f",
              borderRadius: 40,
              marginHorizontal: 20,
              zIndex: 0,
            },
          ]}
        />
      {/* Create a TabBarButton for each tab */}
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          // Other effect
          // tabPosX.value = withSpring(buttonWidth * index, { 
          //             damping: 30, 
          //             stiffness: 150, 
          //             reduceMotion: ReduceMotion.Never
          //           });
          tabPosX.value = withSpring(buttonWidth * index, { 
            duration: 1000,
            reduceMotion: ReduceMotion.Never
          });            
                    
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TabBarButton
            key={route.name}
            onPress={onPress}
            onLongPress={onLongPress}
            tabPosX={tabPosX}
            buttonWidth={buttonWidth}
            index={index}
            isFocused={isFocused}
            routeName={route.name}
            color={isFocused ? "#ba0c2f" : "#63666a"}
            label={label}
            />
        );
      })}
    </View>
  );
}
export default TabBar; 

const styles = StyleSheet.create({
    tabbar: {
      position: "absolute",
      bottom: 0, left: 0, right: 0,
      flexDirection: "row",
      height: 100,
      justifyContent: "space-around",
      alignItems: "center",
      backgroundColor: "#F8F8F8",
      paddingBottom: 2,  
      borderTopWidth: 2,
    }
})