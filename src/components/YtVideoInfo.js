import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { getTimeDifference, getTitleDesc } from "../utils/getVideoInfo";
import { useUser } from "../services/UserContext";
import database from "@react-native-firebase/database";

export default function YtVideoInfo({ videoInfo }) {
  const { user } = useUser();
  const [showDesc, setShowDesc] = useState(false);
  const [viewCount, setViewCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [userLiked, setUserLiked] = useState(false);
  const [userDisliked, setUserDisliked] = useState(false);

  useEffect(() => {
    const viewsArray = videoInfo.views ? videoInfo.views.split(",") : [];
    const likesArray = videoInfo.likes ? videoInfo.likes.split(",") : [];
    const dislikesArray = videoInfo.dislikes
      ? videoInfo.dislikes.split(",")
      : [];
    setViewCount(viewsArray.length);
    setLikeCount(likesArray.length);
    setDislikeCount(dislikesArray.length);
    setUserLiked(likesArray.includes(user.userId));
    setUserDisliked(dislikesArray.includes(user.userId));

    const updateViews = async () => {
      if (!viewsArray.includes(user.userId)) {
        viewsArray.push(user.userId);
        const updatedViews = viewsArray.join(",");

        const videoRef = database().ref(`videos/${videoInfo.id}`);
        await videoRef.update({ views: updatedViews });
      }
    };

    updateViews();
  }, []);

  const handleLike = () => {
    const videoRef = database().ref(`videos/${videoInfo.id}`);
    videoRef.transaction((video) => {
      if (video) {
        let likesArray = video.likes ? video.likes.split(",") : [];
        let dislikesArray = video.dislikes ? video.dislikes.split(",") : [];

        if (likesArray.includes(user.userId)) {
          likesArray = likesArray.filter((id) => id !== user.userId);
          setUserLiked(false);
        } else {
          likesArray.push(user.userId);
          dislikesArray = dislikesArray.filter((id) => id !== user.userId);
          setUserLiked(true);
          setUserDisliked(false);
        }
        video.likes = likesArray.join(",");
        video.dislikes = dislikesArray.join(",");
        setLikeCount(likesArray.length);
        setDislikeCount(dislikesArray.length);
      }
      return video;
    });
  };

  const handleDislike = () => {
    const videoRef = database().ref(`videos/${videoInfo.id}`);
    videoRef.transaction((video) => {
      if (video) {
        let likesArray = video.likes ? video.likes.split(",") : [];
        let dislikesArray = video.dislikes ? video.dislikes.split(",") : [];

        if (dislikesArray.includes(user.userId)) {
          dislikesArray = dislikesArray.filter((id) => id !== user.userId);
          setUserDisliked(false);
        } else {
          dislikesArray.push(user.userId);
          likesArray = likesArray.filter((id) => id !== user.userId);
          setUserDisliked(true);
          setUserLiked(false);
        }
        video.likes = likesArray.join(",");
        video.dislikes = dislikesArray.join(",");
        setLikeCount(likesArray.length);
        setDislikeCount(dislikesArray.length);
      }
      return video;
    });
  };

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
                {viewCount}M views {getTimeDifference(videoInfo.uploadedAt)}
              </Text>
              <Text style={{ color: "#f2f2ed" }}>
                {getTitleDesc(videoInfo.title)[1]}
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setShowDesc(!showDesc)}>
            <Text style={{ color: "#acaba7" }}>
              {viewCount}M views {getTimeDifference(videoInfo.uploadedAt)} ..more
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
        <TouchableOpacity onPress={handleLike}>
          <View
            style={{
              ...styles.tabButton,
              backgroundColor: userLiked ? "#f1f1f1" : "#1a1a1a",
            }}
          >
            <FontAwesome
              name="thumbs-up"
              color={userLiked ? "#1a1a1a" : "#9b9b9b"}
              size={13}
              style={{ marginRight: 7 }}
            />
            <Text
              style={{ color: userLiked ? "#1a1a1a" : "#e5e5e5", fontSize: 13 }}
            >
              Like | {likeCount}k
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleDislike}>
          <View
            style={{
              ...styles.tabButton,
              backgroundColor: userDisliked ? "#f1f1f1" : "#1a1a1a",
            }}
          >
            <FontAwesome
              name="thumbs-down"
              color={userDisliked ? "#1a1a1a" : "#9b9b9b"}
              size={13}
              style={{ marginRight: 7 }}
            />
            <Text
              style={{
                color: userDisliked ? "#1a1a1a" : "#e5e5e5",
                fontSize: 13,
              }}
            >
              Dislike | {dislikeCount}k
            </Text>
          </View>
        </TouchableOpacity>

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
