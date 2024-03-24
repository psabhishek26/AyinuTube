import { View, Image, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useUser } from "../services/UserContext";
import YtSortModes from "./YtSortModes";
export default function YtHeader() {
  const { user } = useUser();
  
  return (
    <View>
      <View style={styles.header}>
        <Image
          source={require("../../assets/bleachprofile.png")}
          style={{ height: 30, width: 50 }}
        />
        <Text style={styles.title}>AyinuTube</Text>
        <View
          style={{
            flexDirection: "row",
            marginLeft: "auto",
            alignItems: "center",
          }}
        >
          <FontAwesome name="bell" style={styles.icon} />
          <FontAwesome
            name="search"
            style={styles.icon}
          />
          <Image source={{ uri: user.photoURL }} style={styles.profileImage} />
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
  title: {
    fontSize: 20,
    fontWeight: "500",
    justifyContent: "center",
    padding: 10,
    color: "white",
  },
  icon: {
    fontSize: 20,
    marginRight: 18,
    color: "white",
  },
  profileImage: {
    height: 25,
    width: 25,
    borderRadius: 50,
    marginRight: 15,
  },
});
