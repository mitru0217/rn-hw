import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Camera, CameraType } from "expo-camera";

const CreatePostsScreen = () => {
  return (
    <View style={styles.container}>
      <Camera></Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CreatePostsScreen;
