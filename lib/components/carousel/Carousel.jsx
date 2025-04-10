import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Dimensions, View, Text, Image, Animated, FlatList, TouchableOpacity, Linking } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const LibraryCarousel = () => {
  const [carouselItems, setCarouselItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(1); // Start from the second item after looping
  const flatListRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const adjustedScrollX = Animated.subtract(scrollX, width); // remove the 1-item offset


  useEffect(async () => {

    // Fetch carousel json data from db
    let carouselData;
    try {
      const response = await fetch("http://localhost:3006/api/carousel");
      carouselData = await response.json();
    } catch (error) {
      console.error("Fetch failed:", error);
    }

    if (carouselData?.carousel?.length) {
        const data = carouselData.carousel;
        // Clone last + first items
        const looped = [
          data[data.length - 1], 
          ...data, 
          data[0]
        ];
        setCarouselItems(data);

        // Auto-scroll functionality
         const intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % carouselItems.length; // Loop back to the first item
          flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
          return nextIndex;
        });
      }, 1000000); // 3 secs
    
          
        // Delay scrollToIndex slightly to allow rendering
        setTimeout(() => {
          flatListRef.current?.scrollToIndex({ index: 1, animated: false });
        }, 50);

        // Clear the interval when the component is unmounted
        return () => clearInterval(intervalId);
    }
}, []);
const handleScrollEnd = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
  
    if (index === 0) {
        flatListRef.current?.scrollToIndex({ index: carouselItems.length - 1, animated: false });
        //flatListRef.current?.scrollToIndex({ index: carouselItems.length - 2, animated: false });
    } else if (index === carouselItems.length - 1) {
        // flatListRef.current?.scrollToIndex({ index: 1, animated: false });
        flatListRef.current?.scrollToIndex({ index: 0, animated: false });
    }
  };
  

  const {width, height} = Dimensions.get("screen");
  const imageW = width * 0.7;
  const imageH = imageW * 0.6;

  const renderItem = ({ item }) => (
    <View style={{ marginHorizontal: 45, justifyContent: "center", alignItems: "center" }}>

      <Image source={{ uri: item.image_url }} 
             style={{ 
                width: imageW, 
                height: imageH, 
                resizeMode: "cover",
                borderRadius: 20,    
        }}/>
      <View 
        style={{
            width: imageW-20,
            height: "auto", 
            borderRadius: 20,
            padding:15,
            paddingTop:50,
            bottom:40,
            zIndex: -1,
            justifyContent: "center", 
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.8)" 
        }}
      >
        <Text>{item.alt_text}</Text>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 10, height: imageH, borderColor: "#007a86", borderTopColor:"#007a86", borderWidth:2 }}>

      {/* Background images */}
      <View
        style={[StyleSheet.absoluteFillObject,]
      }>
        {carouselItems.map((item, index) => {
            const inputRange = [
                (index -1.5) * width,
                index * width,
                (index + 1.5) * width
            ]
            const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0, 1, 0],
            })
            return <Animated.Image
                    key={index}
                    source={{ uri: item.image_url }}
                    style={[StyleSheet.absoluteFillObject, {opacity}]}
                    blurRadius={40}
                    />
        })}
      </View>
      
      {/* Carousel */}
      
      <Animated.FlatList
        ref={flatListRef}
        style={{ flexGrow: 0, paddingHorizontal: 10 }}
        data={carouselItems}
        removeClippedSubviews={false}
        renderItem={renderItem}
        onMomentumScrollEnd={handleScrollEnd}
        keyExtractor={(_, index) => index.toString()}
        onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: true}
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}  // Optional: Hides the scroll indicator

    />
    </View>
  );
};

export default LibraryCarousel;
