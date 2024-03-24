import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function YtSortModes() {
  const [sortMode, setSortMode] = useState(1);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setSortMode(1)}>
        <View
          style={{
            backgroundColor: sortMode === 1 ? "#f1f1f1" : "#272727",
            padding: 5,
            borderRadius: 5,
          }}
        >
          <Text style={{ color: sortMode === 1 ? "#212121" : "#e6e6e6" }}>
            Latest
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setSortMode(2)}>
        <View
          style={{
            backgroundColor: sortMode === 2 ? "#f1f1f1" : "#272727",
            padding: 5,
            borderRadius: 5,
          }}
        >
          <Text style={{ color: sortMode === 2 ? "#212121" : "#e6e6e6" }}>
            Collections
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    backgroundColor: "#0f0f0f",
    paddingVertical: 8,
    justifyContent: "space-around",
  },
});
