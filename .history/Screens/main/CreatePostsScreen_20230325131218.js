import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Camera, CameraType } from "expo-camera";

const CreatePostsScreen = () => {
  return (
    <View style={styles.container}>
      <Camera style={styles.camera}></Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  camera: {
    height: 300,
  },
});

export default CreatePostsScreen;
