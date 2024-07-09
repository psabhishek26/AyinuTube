import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import auth from "@react-native-firebase/auth";
import { useUser } from "../services/UserContext";
import { useNavigation } from "@react-navigation/native";

export default function About() {
  const { user, googleId } = useUser();
  const navigation = useNavigation();

  const handleSignOut = async () => {
    await auth()
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => console.error("Error signing out:", error.message));
  };

  return (
    <View style={styles.conatiner}>
      <View style={styles.userInfoContainer}>
        <Image source={{ uri: googleId.photoURL }} style={styles.profileImage} />
        <View>
          <Text style={styles.name}>{googleId.displayName}</Text>
          <Text style={styles.email}>{googleId.email}</Text>
        </View>
      </View>
      <View style={styles.accountInfo}>
        <View style={styles.tab}>
          <FontAwesome
            name="thumbs-up"
            color="#9b9b9b"
            size={13}
            style={{ marginRight: 7 }}
          />
          <Text style={{ color: "#e5e5e5", fontSize: 12 }}>Likes | {user.totalLikes}</Text>
        </View>

        <View style={styles.tab}>
          <FontAwesome
            name="thumbs-down"
            color="#9b9b9b"
            size={13}
            style={{ marginRight: 7 }}
          />
          <Text style={{ color: "#e5e5e5", fontSize: 12 }}>
            Dislikes | {user.totalDislikes}
          </Text>
        </View>

        <View style={styles.tab}>
          <FontAwesome
            name="eye"
            color="#9b9b9b"
            size={13}
            style={{ marginRight: 7 }}
          />
          <Text style={{ color: "#e5e5e5", fontSize: 12 }}>Views | {user.totalViews}</Text>
        </View>
      </View>
      <View
        style={{
          justifyContent: "space-around",
          flexDirection: "row",
          padding: 10,
          marginVertical: 20,
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Upload")}>
          <View style={styles.buttonConatiner}>
            <FontAwesome name="upload" size={15} />
            <Text style={styles.buttonText}>Upload</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSignOut}>
          <View style={styles.buttonConatiner}>
            <FontAwesome name="sign-out" size={15} />
            <Text style={styles.buttonText}>SignOut</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: "#0f0f0f",
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  profileImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderColor: "#f7971d",
    borderWidth: 3,
    margin: 20,
  },
  name: {
    fontSize: 25,
    color: "white",
  },
  email: {
    fontSize: 15,
    color: "grey",
  },
  accountInfo: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  tab: {
    backgroundColor: "#1a1a1a",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
  },
  buttonConatiner: {
    flexDirection: "row",
    backgroundColor: "#f7971d",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 15,
    marginLeft: 5,
    fontWeight: "500",
  },
});
