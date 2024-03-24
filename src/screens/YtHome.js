import { View, StyleSheet } from "react-native";
import YtHeader from "../components/YtHeader";
import YtSortModes from "../components/YtSortModes";
import YtFeeds from "../services/YtFeeds";

const YtHome = () => {
  return (
    <View style={styles.container}>
      <YtHeader />
      <YtSortModes />
      <YtFeeds />
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
