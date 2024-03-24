import {
  View,
  StyleSheet,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import YtFeeds from "../services/YtFeeds";

export default function YtPlay({ route }) {
  const { videoInfo } = route.params;

  return (
    <View style={styles.cotainer}>
      <Video
        style={styles.video}
        source={{ uri: videoInfo.directLink }}
        useNativeControls
        isLooping
        resizeMode={ResizeMode.CONTAIN}
      />
      <YtFeeds videoInfo={videoInfo} />
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
});
