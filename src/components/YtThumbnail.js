import { useState } from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function YtThumbnail({ item, onPlayMode}) {
  const navigation = useNavigation();
  const [selectedVideo, setSelectedVideo] = useState(null);
  
  return (
    <View>
      <TouchableOpacity onPress={() => setSelectedVideo(item)}>
        <View
          style={{
            backgroundColor: "#0f0f0f",
            marginBottom: 8,
          }}
        >
          <Image
            source={require("../../assets/bleachprofile.png")}
            style={{ width: "100%", height: 200, resizeMode: "stretch" }}
          />
          <View
            style={{ padding: 8, flexDirection: "row", alignItems: "center" }}
          >
            <Image
              source={require("../../assets/bleachprofile.png")}
              style={{ height: 50, width: 50, borderRadius: 50 }}
            />
            <View style={{ marginLeft: 10 }}>
              <Text
                style={{ fontWeight: "200", fontSize: 15, color: "#e8e8e8" }}
              >
                {item.name}
              </Text>
              <Text
                style={{ fontWeight: "100", fontSize: 12, color: "#a0a0a0" }}
              >
                1M Views 2 years ago
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      {selectedVideo && onPlayMode && navigation.replace("Video", { videoInfo: item })}
      {selectedVideo && !onPlayMode && navigation.navigate("Video", { videoInfo: item })}
    </View>
  );
}
