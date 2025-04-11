import { useGlobalSearchParams } from "expo-router";
import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity, Dimensions } from "react-native";
import { SearchContext } from "../../../lib/context/SearchContext";
import { LinearGradient } from "expo-linear-gradient";

export default function SearchResults() {
  const { userInput, setUserInput } = useContext(SearchContext);
  const [books, setBooks] = useState([]);
  const params = useGlobalSearchParams();

  useEffect(() => {
    if (params.query && params.query !== userInput) {
      setUserInput(params.query);
    }
  }, []);

  useEffect(() => {
    if (!userInput) return;

    const fetchBooks = async () => {
      try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(userInput)}`);
        const data = await response.json();

        const parsedBooks = data.items?.map((item) => {
          const info = item.volumeInfo;
          return {
            id: item.id,
            title: info.title,
            authors: info.authors || ["Unknown Author"],
            thumbnail: info.imageLinks?.thumbnail || "https://via.placeholder.com/128x195?text=No+Image",
          };
        }) || [];

        setBooks(parsedBooks);
      } catch (err) {
        console.error("Failed to fetch books", err);
      }
    };

    fetchBooks();
  }, [userInput]);

  return (
    <LinearGradient
      colors={['rgb(0, 0, 0)', 'rgba(245, 245, 245, 0.8)', 'rgba(230, 230, 230, 0.7)']}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <FlatList
          data={books}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card}>
              <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.authors}>{item.authors.join(", ")}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 12,
    overflow: 'hidden',
  },
  thumbnail: {
    width: 80,
    height: 120,
  },
  textContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  authors: {
    fontStyle: 'italic',
    color: '#555',
    marginTop: 4,
  },
});
