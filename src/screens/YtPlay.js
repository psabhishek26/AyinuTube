import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Video, ResizeMode } from "expo-av";
import { useState, useEffect } from "react";
import YtFeeds from "../services/YtFeeds";
import { useApp } from "../services/AppContext";
import CommentsHandler from "../components/CommentsHandler";

export default function YtPlay({ route }) {
  const { videoInfo } = route.params;
  const { commentBox, setCommentBox } = useApp();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setCommentBox(false);
  }, []);

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <View style={styles.cotainer}>
      <View style={styles.videoContainer}>
        {isLoading && (
          <ActivityIndicator
            size="large"
            color="#f7971d"
            style={styles.loading}
          />
        )}
        <Video
          style={styles.video}
          source={{
            uri: videoInfo.videoUrl,
          }}
          useNativeControls
          isLooping
          resizeMode={ResizeMode.CONTAIN}
          onLoad={handleLoad}
        />
      </View>
      {commentBox ? (
        <CommentsHandler videoInfo={videoInfo} />
      ) : (
        <YtFeeds videoInfo={videoInfo} onPlayMode={true} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cotainer: {
    flex: 1,
    backgroundColor: "#010101",
  },
  video: {
    width: "100%",
    height: 300,
    marginTop: -40,
  },
  videoContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  loading: {
    position: "absolute",
    zIndex: 1,
  },
});
