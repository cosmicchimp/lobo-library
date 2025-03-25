import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  Image,
} from "react-native";

export default function SearchPage() {
  const [userInput, updateUserInput] = useState("");
  const [fetchedBooks, updateBooks] = useState([]);

  function fetchBook(title) {
    if (title.trim() === "") return; // Prevent empty searches
    const parsedTitle = title.split(" ").join("+");
    fetch(`https://openlibrary.org/search.json?title=${parsedTitle}`)
      .then((res) => res.json())
      .then((data) =>
        data.docs ? data.docs.slice(0, 5).filter((book) => book.cover_i) : []
      )
      .then(updateBooks)
      .catch((error) => console.error(error));
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={fetchedBooks}
        keyExtractor={(book) => book.key}
        contentContainerStyle={{ justifyContent: "space-around" }} // Ensures no extra spacing at end
        renderItem={({ item }) => (
          <View style={styles.bookItem}>
            <Image
              source={{
                uri: `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`,
              }}
              style={styles.bookImage}
            />
            <Text style={styles.text}>{item.title}</Text>
          </View>
        )}
      />

      {/* TextInput for searching books */}
      <TextInput
        style={styles.bookInput}
        onChangeText={updateUserInput}
        onSubmitEditing={() => fetchBook(userInput)}
        placeholder="Type something..."
        placeholderTextColor="lightgrey"
      />
      <Text>This is the search page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  bookItem: {
    marginBottom: 20,
  },
  bookInput: {
    padding: 10,
    minWidth: "90%",
    backgroundColor: "grey",
    borderRadius: 10,
    color: "white",
    marginBottom: "20%",
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
  },
  bookCarousel: {
    marginTop: "50%",
  },
});
