import { useState, useEffect } from "react";
import { View, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import YtThumbnail from "../components/YtThumbnail";
import YtVideoInfo from "../components/YtVideoInfo";
import YtHeader from "../components/YtHeader";
import database from "@react-native-firebase/database";
import { useApp } from "./AppContext";

export default function YtFeeds({ videoInfo, onPlayMode, onHome }) {
  const { videos, setVideos, filteredVideos } = useApp();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (filteredVideos.length == 0) {
      fetchVideos();
    } else {
      setLoading(false);
    }
  }, [filteredVideos]);

  const fetchVideos = async () => {
    try {
      const snapshot = await database().ref("/videos").once("value");
      const videoData = snapshot.val();

      const videosList = Object.keys(videoData).map((key) => ({
        id: key,
        ...videoData[key],
      }));

      setVideos(videosList);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching videos:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={"#f7971d"} />
      </View>
    );
  }

  return (
    <FlatList
      data={
        filteredVideos.length > 0 && !onPlayMode && !onHome
          ? filteredVideos
          : videos
      }
      ListHeaderComponent={
        videoInfo ? (
          <YtVideoInfo videoInfo={videoInfo} />
        ) : filteredVideos.length > 0 && !onHome ? null : (
          <YtHeader />
        )
      }
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        return <YtThumbnail item={item} onPlayMode={onPlayMode} />;
      }}
    />
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
