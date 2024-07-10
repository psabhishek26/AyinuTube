import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { getTimeDifference, getTitleDesc } from "../utils/getVideoInfo";

export default function YtVideoInfo({ videoInfo }) {
  const [showDesc, setShowDesc] = useState(0);

  return (
    <View>
      <View style={styles.infoCaontainer}>
        <Text style={{ color: "#f2f2ed", fontSize: 20 }}>
          {getTitleDesc(videoInfo.title)[0]}
        </Text>
        {showDesc ? (
          <TouchableOpacity onPress={() => setShowDesc(!showDesc)}>
            <View style={styles.description}>
              <Text style={styles.descTitle}>Description</Text>
              <Text style={{ color: "#acaba7", marginBottom: 5 }}>
                168k views {getTimeDifference(videoInfo.uploadedAt)}
              </Text>
              <Text style={{ color: "#f2f2ed" }}>
                {getTitleDesc(videoInfo.title)[1]}
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setShowDesc(!showDesc)}>
            <Text style={{ color: "#acaba7" }}>
              168k views {getTimeDifference(videoInfo.uploadedAt)} ..more
            </Text>
          </TouchableOpacity>
        )}
        <View style={styles.profileInfo}>
          <Image
            source={{ uri: videoInfo.tgUserProfileImage }}
            style={styles.imgProfile}
          />
          <Text style={{ color: "#ebebeb", fontSize: 16, marginLeft: 12 }}>
            {videoInfo.tgUserName}
          </Text>
          <Text style={{ color: "#999798", fontSize: 12, marginLeft: 12 }}>
            2.06M
          </Text>
          <View
            style={{
              backgroundColor: "#f1f1f1",
              borderRadius: 50,
              padding: 8,
              marginLeft: "auto",
              marginRight: 10,
            }}
          >
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
    </View>
  );
}

const styles = StyleSheet.create({
  infoCaontainer: {
    padding: 10,
    marginTop: -10,
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
  description: {
    marginVertical: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#272727",
  },
  descTitle: {
    fontWeight: "600",
    fontSize: 15,
    color: "white",
    marginTop: -5,
  },
});
