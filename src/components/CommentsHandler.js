import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useEffect, useState } from "react";
import { useUser } from "../services/UserContext";
import { useApp } from "../services/AppContext";
import { AntDesign } from "@expo/vector-icons";
import database from "@react-native-firebase/database";
import Comment from "./Comment";
import CommentTextInput from "./CommentTextInput";

export default function CommentsHandler({ videoInfo }) {
  const { googleId, user } = useUser();
  const { commentBox, setCommentBox } = useApp();
  const [replyData, setReplyData] = useState(null);
  const { id: videoId, comments: initialComments } = videoInfo;

  const [comments, setComments] = useState(
    initialComments
      ? Object.keys(initialComments).map((key) => ({
          id: key,
          ...initialComments[key],
          replies: initialComments[key].replies
            ? Object.values(initialComments[key].replies)
            : [],
        }))
      : []
  );

  useEffect(() => {
    if (replyData) {
      const updatedData = comments.find((c) => c.id === replyData.id);
      setReplyData((prevData) => ({
        ...prevData,
        commet: updatedData.comment,
        likes: updatedData.likes,
        dislikes: updatedData.dislikes,
        replies: updatedData.replies,
      }));
    }
  }, [comments]);

  const handleAddComment = (comment) => {
    if (comment.trim() === "") return;
    const commentsRef = database().ref(`videos/${videoId}/comments`);
    const newCommentRef = commentsRef.push();
    const commentId = newCommentRef.key;

    const newComment = {
      id: commentId,
      username: user.displayName,
      comment: comment,
      likes: "",
      dislikes: "",
      timestamp: database.ServerValue.TIMESTAMP,
      profilePhotoUrl: googleId.photoURL,
      replies: [],
    };

    newCommentRef.set(newComment);
    setComments([...comments, newComment]);
  };

  const handleAddReply = (comment) => {
    const parentCommentId = replyData.id;
    if (comment.trim() === "" || !parentCommentId) return;

    const commentsRef = database().ref(
      `videos/${videoId}/comments/${parentCommentId}/replies`
    );
    const newReplyRef = commentsRef.push();
    const replyId = newReplyRef.key;

    const newReply = {
      id: replyId,
      parentCommentId: parentCommentId,
      username: user.displayName,
      comment: comment,
      likes: "",
      dislikes: "",
      reply: true,
      timestamp: database.ServerValue.TIMESTAMP,
      profilePhotoUrl: googleId.photoURL,
    };

    newReplyRef.set(newReply);

    setComments((prevComments) => {
      return prevComments.map((c) => {
        if (c.id === parentCommentId) {
          return {
            ...c,
            replies: [...c.replies, newReply],
          };
        }
        return c;
      });
    });
  };

  const handleLike = (commentId, replyId = null) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        if (replyId) {
          const updatedReplies = comment.replies.map((reply) => {
            if (reply.id === replyId) {
              let likesArray = reply.likes ? reply.likes.split(",") : [];
              let dislikesArray = reply.dislikes
                ? reply.dislikes.split(",")
                : [];

              if (likesArray.includes(user.userId)) {
                likesArray = likesArray.filter((id) => id !== user.userId);
              } else {
                likesArray.push(user.userId);
                dislikesArray = dislikesArray.filter(
                  (id) => id !== user.userId
                );
              }

              return {
                ...reply,
                likes: likesArray.join(","),
                dislikes: dislikesArray.join(","),
              };
            }
            return reply;
          });

          database()
            .ref(`videos/${videoId}/comments/${commentId}`)
            .update({ replies: updatedReplies });

          return {
            ...comment,
            replies: updatedReplies,
          };
        } else {
          let likesArray = comment.likes ? comment.likes.split(",") : [];
          let dislikesArray = comment.dislikes
            ? comment.dislikes.split(",")
            : [];

          if (likesArray.includes(user.userId)) {
            likesArray = likesArray.filter((id) => id !== user.userId);
          } else {
            likesArray.push(user.userId);
            dislikesArray = dislikesArray.filter((id) => id !== user.userId);
          }

          const updatedComment = {
            ...comment,
            likes: likesArray.join(","),
            dislikes: dislikesArray.join(","),
          };

          database()
            .ref(`videos/${videoId}/comments/${commentId}`)
            .update(updatedComment);

          return updatedComment;
        }
      }
      return comment;
    });

    setComments(updatedComments);
  };

  const handleDislike = (commentId, replyId = null) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        if (replyId) {
          const updatedReplies = comment.replies.map((reply) => {
            if (reply.id === replyId) {
              let likesArray = reply.likes ? reply.likes.split(",") : [];
              let dislikesArray = reply.dislikes
                ? reply.dislikes.split(",")
                : [];

              if (dislikesArray.includes(user.userId)) {
                dislikesArray = dislikesArray.filter(
                  (id) => id !== user.userId
                );
              } else {
                dislikesArray.push(user.userId);
                likesArray = likesArray.filter((id) => id !== user.userId);
              }

              return {
                ...reply,
                likes: likesArray.join(","),
                dislikes: dislikesArray.join(","),
              };
            }
            return reply;
          });

          database()
            .ref(`videos/${videoId}/comments/${commentId}`)
            .update({ replies: updatedReplies });

          return {
            ...comment,
            replies: updatedReplies,
          };
        } else {
          let likesArray = comment.likes ? comment.likes.split(",") : [];
          let dislikesArray = comment.dislikes
            ? comment.dislikes.split(",")
            : [];

          if (dislikesArray.includes(user.userId)) {
            dislikesArray = dislikesArray.filter((id) => id !== user.userId);
          } else {
            dislikesArray.push(user.userId);
            likesArray = likesArray.filter((id) => id !== user.userId);
          }

          const updatedComment = {
            ...comment,
            likes: likesArray.join(","),
            dislikes: dislikesArray.join(","),
          };

          database()
            .ref(`videos/${videoId}/comments/${commentId}`)
            .update(updatedComment);

          return updatedComment;
        }
      }
      return comment;
    });

    setComments(updatedComments);
  };

  const handleReplyButton = (id) => {
    const data = comments.find((c) => c.id === id);
    setReplyData(data);
  };

  const handleCommentTextInput = (data) => {
    if (replyData) {
      handleAddReply(data);
    } else {
      handleAddComment(data);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => setCommentBox(true)}>
        {!commentBox && (
          <View style={styles.container}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Comments</Text>
              <Text style={styles.subTitle}>100</Text>
            </View>
            <View style={styles.subContainer}>
              <Image source={{ uri: googleId.photoURL }} style={styles.image} />
              <View style={styles.dummyCommentBox}>
                <Text style={{ ...styles.subTitle, marginLeft: 10 }}>
                  Add a comment...
                </Text>
              </View>
            </View>
          </View>
        )}
      </TouchableOpacity>

      {commentBox && (
        <View style={styles.expandConatiner}>
          <View style={styles.expandedTitleBar}>
            {replyData && (
              <TouchableOpacity onPress={() => setReplyData(null)}>
                <AntDesign name="arrowleft" size={24} color="white" />
              </TouchableOpacity>
            )}
            <Text style={styles.expandedTitle}>
              {!replyData ? "Comments" : "Replies"}
            </Text>
            <TouchableOpacity
              onPress={() => setCommentBox(false)}
              style={{ marginLeft: "auto", marginRight: 10 }}
            >
              <AntDesign name="close" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.line} />
          <FlatList
            data={!replyData ? comments : replyData.replies}
            extraData={!replyData ? comments : replyData.replies}
            style={{ marginBottom: 10 }}
            ListHeaderComponent={
              <View>
                {replyData && (
                  <View>
                    <Comment
                      reply={true}
                      item={replyData}
                      handleLike={handleLike}
                      handleDislike={handleDislike}
                    />
                    <View style={{ marginVertical: 5 }} />
                  </View>
                )}
                <CommentTextInput
                  data={handleCommentTextInput}
                  reply={replyData}
                />
                <View style={styles.line} />
              </View>
            }
            ListFooterComponent={<Text>Hello</Text>}
            renderItem={({ item }) => {
              return (
                <Comment
                  item={item}
                  handleDislike={handleDislike}
                  handleLike={handleLike}
                  handleReplyButton={handleReplyButton}
                />
              );
            }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "#1a1a1a",
  },
  titleContainer: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 17,
    marginRight: 5,
  },
  subTitle: {
    color: "#acaba7",
  },
  subContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 50,
    marginRight: 10,
  },
  dummyCommentBox: {
    padding: 5,
    backgroundColor: "#313131",
    borderRadius: 20,
    width: "85%",
  },
  expandConatiner: {
    padding: 10,
  },
  expandedTitleBar: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  expandedTitle: {
    color: "white",
    fontWeight: "600",
    fontSize: 20,
    marginLeft: 5,
  },
  line: {
    borderBottomColor: "#313131",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
});
