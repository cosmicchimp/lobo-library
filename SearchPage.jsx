import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // You can choose from different icon sets like MaterialIcons, Ionicons, etc.

export default function SearchPage() {
  const [userInput, updateUserInput] = useState("");
  const [fetchedBooks, updateBooks] = useState([]);
  useEffect(() => {
    console.log(fetchedBooks);
  }, [fetchedBooks]);
  function fetchBook(title) {
    if (title.trim() === "") return; // Prevent empty searches
    const parsedTitle = title.split(" ").join("+");
    fetch(`https://openlibrary.org/search.json?title=${parsedTitle}`)
      .then((res) => res.json())
      .then((data) =>
        data.docs ? data.docs.slice(0, 12).filter((book) => book.cover_i) : []
      )
      .then(updateBooks)
      .catch((error) => console.error(error));
  }
  const [currentPopUp, updatePopUp] = useState([]);
  function handleBookPress() {
    alert("Press");
  }
  return (
    <View style={styles.container}>
      {/* TextInput for searching books */}
      <View style={styles.searchbar}>
        <Icon
          name="search"
          size={30}
          color="rgba(186, 12, 47, 1)"
          style={{
            alignSelf: "center",
          }}
        />
        <TextInput
          style={styles.bookInput}
          onChangeText={updateUserInput}
          onSubmitEditing={() => fetchBook(userInput)}
          placeholder="Type something..."
          placeholderTextColor="lightgrey"
        />
      </View>
      <FlatList
        data={fetchedBooks}
        keyExtractor={(book) => book.key}
        contentContainerStyle={{ justifyContent: "space-around" }} // Ensures no extra spacing at end
        renderItem={({ item }) => (
          <TouchableOpacity onPress={handleBookPress} style={styles.bookBox}>
            <View style={styles.bookItem}>
              <Image
                source={{
                  uri: `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`,
                }}
                style={styles.bookImage}
              />
              <Text style={styles.text}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

// // //
// // //
//Styles past this point
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  bookItem: {
    marginBottom: 20,
    alignSelf: "center",
  },
  bookInput: {
    padding: 10,
    minWidth: "90%",
    borderRadius: 10,
    color: "white",
  },
  bookImage: {
    width: 100,
    height: 150,
    marginBottom: 10,
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
  searchbar: {
    display: "flex",
    flexDirection: "row",
    marginBottom: "5%",
    backgroundColor: "rgba(167, 168, 170, .8)",
    borderRadius: 10,
    padding: 10,
    justifyContent: "space-around",
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
});
