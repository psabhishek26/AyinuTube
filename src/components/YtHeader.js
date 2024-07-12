import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useUser } from "../services/UserContext";
import YtSortModes from "./YtSortModes";
import { useNavigation } from "@react-navigation/native";

export default function YtHeader() {
  const { googleId } = useUser();
  const navigation = useNavigation();

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Ayinu</Text>
        <Text style={styles.hubTheme}>Tube</Text>
        <View
          style={{
            flexDirection: "row",
            marginLeft: "auto",
            alignItems: "center",
          }}
        >
          <FontAwesome name="bell" style={styles.icon} />
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <FontAwesome name="search" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("About")}>
            <Image
              source={{ uri: googleId.photoURL }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
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
  hubTheme: {
    color: "black",
    backgroundColor: "#f7971d",
    borderRadius: 2,
    padding: 3,
    marginLeft: -8,
    fontWeight: "600",
    marginTop: 3,
  },
});
