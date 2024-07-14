import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "../services/UserContext";
import { useState } from "react";

export default function CommentTextInput({ data, reply }) {
  const { googleId } = useUser();
  const [comment, setComment] = useState("");

  const handleComment = () => {
    if (comment.length > 0) { 
        data(comment);
        setComment("");
    }
  };

  return (
    <View style={styles.commentBoxContainer}>
      <Image source={{ uri: googleId.photoURL }} style={styles.image} />
      <View style={styles.commentBox}>
        <TextInput
          placeholder={!reply ? "Add a comment..." : "Reply..."}
          value={comment}
          placeholderTextColor={"#acaba7"}
          onChangeText={setComment}
          style={styles.textInput}
        />
      </View>
      <TouchableOpacity onPress={handleComment}>
        <Ionicons
          name="send-outline"
          size={24}
          color="white"
          style={{ marginLeft: 10 }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  commentBoxContainer: {
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 50,
    marginRight: 10,
  },
  commentBox: {
    padding: 5,
    backgroundColor: "#313131",
    borderRadius: 3,
    width: "80%",
  },
  textInput: {
    marginLeft: 5,
    color: "white",
  },
});
