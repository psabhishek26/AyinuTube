import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { getTimeDifference } from "../utils/getVideoInfo";
import { useUser } from "../services/UserContext";

export default function Comment({
  item,
  reply,
  handleLike,
  handleDislike,
  handleReplyButton,
}) {
  const { user } = useUser();
  const likesArray = item.likes ? item.likes.split(",") : [];
  const dislikesArray = item.dislikes ? item.dislikes.split(",") : [];
  const likes = likesArray.length;
  const dislikes = dislikesArray.length;

  return (
    <View
      style={[
        !reply ? styles.commentContainer : styles.replyCommentContainer,
        { marginLeft: item.reply ? "10%" : "0%" },
      ]}
    >
      <Image source={{ uri: item.profilePhotoUrl }} style={styles.image} />

      <View style={styles.textContainer}>
        <Text style={styles.username}>
          @{item.username} {getTimeDifference(item.timestamp)}
        </Text>

        <Text numberOfLines={10} style={styles.commentText}>
          {item.comment}
        </Text>

        <View
          style={[!reply ? styles.likesContainer : styles.replyLikesContainer]}
        >
          <TouchableOpacity
            onPress={() =>
              !item.reply
                ? handleLike(item.id)
                : handleLike(item.parentCommentId, item.id)
            }
          >
            {likesArray.includes(user.userId) ? (
              <AntDesign name="like1" size={18} color="white" />
            ) : (
              <AntDesign name="like2" size={18} color="white" />
            )}
          </TouchableOpacity>

          <Text style={styles.likesText}>{likes}</Text>

          <TouchableOpacity
            onPress={() =>
              !item.reply
                ? handleDislike(item.id)
                : handleDislike(item.parentCommentId, item.id)
            }
          >
            {dislikesArray.includes(user.userId) ? (
              <AntDesign name="dislike1" size={18} color="white" />
            ) : (
              <AntDesign name="dislike2" size={18} color="white" />
            )}
          </TouchableOpacity>

          <Text style={styles.likesText}>{dislikes}</Text>

          {!item.reply && !reply && (
            <TouchableOpacity
              onPress={() => {
                handleReplyButton(item.id);
              }}
            >
              <MaterialCommunityIcons
                name="comment-text-outline"
                size={18}
                color="white"
                style={{ marginLeft: 10 }}
              />
            </TouchableOpacity>
          )}
        </View>

        {!item.reply && !reply && item.replies.length != 0 && (
          <TouchableOpacity
            onPress={() => handleReplyButton(item.id)}
            style={{ width: "30%" }}
          >
            <Text style={styles.replyText}>{item.replies.length} replies</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  commentContainer: {
    flexDirection: "row",
    marginVertical: 8,
  },
  replyCommentContainer: {
    backgroundColor: "#272727",
    flexDirection: "row",
    padding: 10,
    borderRadius: 5,
  },
  textContainer: {
    width: "88%",
  },
  expandedTitle: {
    color: "white",
    fontWeight: "600",
    fontSize: 20,
    marginLeft: 5,
  },
  username: {
    color: "#acaba7",
    fontSize: 13,
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 50,
    marginRight: 10,
  },
  commentText: {
    color: "white",
    fontSize: 14,
  },
  likesContainer: {
    flexDirection: "row",
    marginVertical: 15,
    alignItems: "center",
  },
  replyLikesContainer: {
    flexDirection: "row",
    marginTop: 15,
    alignItems: "center",
  },
  likesText: {
    color: "white",
    fontSize: 12,
    marginHorizontal: 10,
  },
  replyText: {
    fontSize: 15,
    color: "#0197f6",
  },
});
