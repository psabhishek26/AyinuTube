import { View, Image, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import YtSortModes from "./YtSortModes";
export default function YtHeader() {
  return (
    <View>
      <View style={styles.header}>
        <Image
          source={require("../../assets/bleachprofile.png")}
          style={{ height: 30, width: 50 }}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            justifyContent: "center",
            padding: 10,
            color: "white",
          }}
        >
          AyinuTube
        </Text>
        <View style={{ flexDirection: "row", marginLeft: "auto" }}>
          <FontAwesome
            name="bell"
            style={{
              fontSize: 20,
              marginRight: 18,
              color: "white",
            }}
          />
          <FontAwesome
            name="search"
            style={{
              fontSize: 20,
              marginRight: 18,
              color: "white",
            }}
          />
        </View>
      </View>
      <YtSortModes />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#0f0f0f",
    height: 60,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    padding: 5,
  },
});
