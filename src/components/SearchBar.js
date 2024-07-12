import { View, TextInput, StyleSheet } from "react-native";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useApp } from "../services/AppContext";

export default function SearchBar({ submitted }) {
  const navigation = useNavigation();
  const { videos, filteredVideos, setFilteredVideos } = useApp();
  const {searchInput, setSearchInput} = useApp();

  useEffect(() => {
    if (searchInput.trim() === "") {
      setFilteredVideos([]);
      submitted(false);
    } else {
      const filtered = videos.filter((video) =>
        video.title.toLowerCase().includes(searchInput.toLowerCase())
      );
      setFilteredVideos(filtered);
    }
  }, [searchInput]);

  const handleSubmit = () => {
    submitted(filteredVideos.length > 0);
  }

  const handleInputChange = (data) => {
    setSearchInput(data);
    submitted(false);
  };

  return (
    <View style={styles.searchContainer}>
      <AntDesign
        name="arrowleft"
        size={24}
        color="white"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Search AyinuTube"
          placeholderTextColor="#acaba7"
          autoFocus={true}
          style={styles.textInput}
          value={searchInput}
          onChangeText={handleInputChange}
          onSubmitEditing={handleSubmit}
        />
        <AntDesign
          name="close"
          size={24}
          color="white"
          style={{ marginLeft: "auto" }}
          onPress={() => setSearchInput("")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    padding: 10,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    height: 38,
    width: "90%",
    borderRadius: 20,
    marginLeft: "auto",
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: "#272727",
  },
  textInput: {
    width: "90%",
    color: "white",
  },
});
