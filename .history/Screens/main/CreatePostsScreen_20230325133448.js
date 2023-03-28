import React from "react";
import { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Camera, CameraType } from "expo-camera";

const CreatePostsScreen = () => {
  const [type, setType] = useState(CameraType.back);

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }
  return (
    <View style={styles.container}>
      <Camera style={styles.camera}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
  camera: {
    height: 300,
    marginTop: 32,
    marginHorizontal: 16,
    backgroundColor: "#F6F6F6",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: "#FFFFFF",
  },
  text: {
    width: 25,
    color: "black",
  },
});

export default CreatePostsScreen;
