import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { useApp } from "../services/AppContext";
import { limitedTitle } from "../utils/getVideoInfo";
import SearchBar from "../components/SearchBar";
import YtFeeds from "../services/YtFeeds";

export default function Search() {
  const { searchInput, setSearchInput, filteredVideos, setFilteredVideos } =
    useApp();
  const [searchSumbit, setSearchSubmitted] = useState(false);

  const handleSelectSearchOption = (title) => {
    const filterSearch = filteredVideos.filter((video) =>
      video.title.toLowerCase().includes(title.toLowerCase())
    );
    setFilteredVideos(filterSearch);
    setSearchInput(limitedTitle(title, 5));
    setSearchSubmitted(true);
  };

  return (
    <View style={styles.container}>
      <SearchBar submitted={setSearchSubmitted} />
      {searchSumbit ? (
        <YtFeeds />
      ) : (
        <View style={styles.listContainer}>
          <FlatList
            data={filteredVideos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.videoItem}>
                <AntDesign name="search1" size={24} color="white" />
                <TouchableOpacity
                  onPress={() => handleSelectSearchOption(item.title)}
                  style={{ width: "100%" }}
                >
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles.videoTitle}
                  >
                    {limitedTitle(item.title, 8)}
                  </Text>
                </TouchableOpacity>
                <Feather
                  name="arrow-up-left"
                  size={24}
                  color="white"
                  style={{ marginLeft: "auto" }}
                />
              </View>
            )}
            ListEmptyComponent={
              searchInput && filteredVideos.length === 0 ? (
                <Text style={styles.noResults}>No results found</Text>
              ) : null
            }
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f0f",
  },
  listContainer: {
    padding: 10,
  },
  videoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "8%",
  },
  videoTitle: {
    color: "white",
    marginLeft: "5%",
    fontSize: 15,
    overflow: "hidden",
    width: "80%",
  },
  noResults: {
    color: "white",
    textAlign: "center",
    marginTop: 20,
  },
});
