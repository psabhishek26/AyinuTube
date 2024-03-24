import { View, StyleSheet } from "react-native";
import YtFeeds from "../services/YtFeeds";

const YtHome = () => {
  return (
    <View style={styles.container}>
      <YtFeeds onPlayMode={false} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f0f",
  },
});

export default YtHome;
