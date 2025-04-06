import React, { createContext, useState, useRef } from 'react';
import { useRouter } from "expo-router";

// Create the Context
export const SearchContext = createContext();

// SearchProvider Component
export const SearchProvider = ({ children }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const textInputRef = useRef(null);
  const router = useRouter();
  
  // Handle search logic
  const handleSearch = () => {
    console.log("Search initiated with query:", userInput);
    if (userInput.trim() === "") return;

    // Update recent searches
    const updatedSearches = [userInput, ...recentSearches.filter((s) => s !== userInput)].slice(0, 9);
    setRecentSearches(updatedSearches);

    router.push(`/search/SearchResults?query=${encodeURIComponent(userInput)}`);
    setIsFocused(false);  // Close the input focus
  };

  return (
    <SearchContext.Provider value={{ 
      userInput, 
      setUserInput, 
      recentSearches, 
      setRecentSearches, 
      textInputRef, 
      handleSearch,
      isFocused,
      setIsFocused,
    }}>
      {children}
    </SearchContext.Provider>
  );
};

// og fetch func
//  // Nagivate to results page when a search is made
//  const [fetchedBooks, updateBooks] = useState([]);
//  function fetchBook(title) {
//    if (title.trim() === "") return; // Prevent empty searches

//    const parsedTitle = title.split(" ").join("+"); // Replace spaces with '+'

//    // Fetch books from Open Library API
//    fetch(`https://openlibrary.org/search.json?title=${parsedTitle}`)
//      .then((response) => 
//        response.json()) // Parse the response as JSON

//      .then((json) => 
//        json.docs ? json.docs.slice(0, 12).filter((book) => book.cover_i) : [] ) // Filter out books without cover images

//      .then(updateBooks) // Update the state with the filtered books

//      .catch((error) => 
//        console.error(error)); // Handle any errors
//  }