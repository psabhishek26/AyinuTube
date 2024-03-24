import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import YtFeeds from "../services/YtFeeds";
import { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";

export default function YtPlay({ route }) {
  const { videoInfo } = route.params;
  const [showDesc, setShowDesc] = useState(0);

  return (
    <View style={styles.cotainer}>
      <Video
        style={styles.video}
        source={{ uri: videoInfo.directLink }}
        useNativeControls
        isLooping
        resizeMode={ResizeMode.CONTAIN}
      />
      <View style={styles.infoCaontainer}>
        <Text style={{ color: "#f2f2ed", fontSize: 20 }}>{videoInfo.name}</Text>
        <TouchableOpacity onPress={() => setShowDesc(!showDesc)}>
          <Text style={{ color: "#acaba7" }}>168k views 3d ago ..more</Text>
        </TouchableOpacity>
        <View style={styles.profileInfo}>
          <Image
            source={require("../../assets/bleachprofile.png")}
            style={styles.imgProfile}
          />
          <Text style={{ color: "#ebebeb", fontSize: 16, marginLeft: 12 }}>
            Greg Doucette
          </Text>
          <Text style={{ color: "#999798", fontSize: 12, marginLeft: 12 }}>
            2.06M
          </Text>
          <View style={{ backgroundColor: '#f1f1f1', borderRadius: 50, padding: 8, marginLeft: 'auto', marginRight: 10 }}>
            <Text style={{ fontSize: 13 }}>Subscribe</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          justifyContent: "space-around",
          flexDirection: "row",
          marginBottom: 12,
        }}
      >
        <View style={styles.tabButton}>
          <FontAwesome
            name="thumbs-up"
            color="#9b9b9b"
            size={13}
            style={{ marginRight: 7 }}
          />
          <Text style={{ color: "#e5e5e5", fontSize: 13 }}>Like</Text>
        </View>

        <View style={styles.tabButton}>
          <FontAwesome
            name="thumbs-down"
            color="#9b9b9b"
            size={13}
            style={{ marginRight: 7 }}
          />
          <Text style={{ color: "#e5e5e5", fontSize: 13 }}>Dislike</Text>
        </View>

        <View style={styles.tabButton}>
          <FontAwesome
            name="share"
            color="#9b9b9b"
            size={13}
            style={{ marginRight: 7 }}
          />
          <Text style={{ color: "#e5e5e5", fontSize: 13 }}>Share</Text>
        </View>

        <View style={styles.tabButton}>
          <FontAwesome
            name="download"
            color="#9b9b9b"
            size={13}
            style={{ marginRight: 7 }}
          />
          <Text style={{ color: "#e5e5e5", fontSize: 13 }}>Download</Text>
        </View>
      </View>
      <YtFeeds />
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
  infoCaontainer: {
    padding: 10,
    marginTop: -20,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  imgProfile: {
    height: 40,
    width: 40,
    borderRadius: 25,
    marginVertical: 10,
  },
  tabButton: {
    backgroundColor: "#1a1a1a",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 50,
  },
});
