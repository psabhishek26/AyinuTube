import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Video, ResizeMode } from "expo-av";
import { useState } from "react";
import YtFeeds from "../services/YtFeeds";

export default function YtPlay({ route }) {
  const { videoInfo } = route.params;
  const [isLoading, setIsLoading] = useState(true);

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
      <YtFeeds videoInfo={videoInfo} onPlayMode={true} />
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
