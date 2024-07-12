import { useState } from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getTimeDifference, limitedTitle } from "../utils/getVideoInfo";

export default function YtThumbnail({ item, onPlayMode }) {
  const navigation = useNavigation();
  const [selectedVideo, setSelectedVideo] = useState(null);

  const viewsArray = item.views ? item.views.split(",") : [];
  const viewCount = viewsArray.length;

  return (
    <View>
      <TouchableOpacity onPress={() => setSelectedVideo(item)}>
        <View style={styles.container}>
          <Image source={{ uri: item.thumbnailUrl }} style={styles.image} />
          <View style={styles.subContainer}>
            <Image
              source={{ uri: item.tgUserProfileImage }}
              style={styles.profileImage}
            />
            <View style={{ marginLeft: 10, width: "100%" }}>
              <Text numberOfLines={2} ellipsizeMode="tail" style={styles.title}>
                {limitedTitle(item.title, 8)}
              </Text>
              <Text style={styles.subText}>
                {viewCount}M Views {getTimeDifference(item.uploadedAt)}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      {selectedVideo &&
        onPlayMode &&
        navigation.replace("Video", { videoInfo: item })}
      {selectedVideo &&
        !onPlayMode &&
        navigation.navigate("Video", { videoInfo: item })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0f0f0f",
    marginBottom: 8,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "stretch",
  },
  subContainer: {
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  title: {
    fontWeight: "200",
    fontSize: 15,
    color: "#e8e8e8",
    width: "85%",
    overflow: "hidden",
  },
  subText: {
    fontWeight: "100",
    fontSize: 12,
    color: "#a0a0a0",
  },
});
