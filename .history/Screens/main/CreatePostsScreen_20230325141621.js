import React from "react";
import { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { FontAwesome5 } from "@expo/vector-icons";

const CreatePostsScreen = () => {
  // const [type, setType] = useState(CameraType.back);
  const [snap, setSnap] = useState(null);

  // function toggleCameraType() {
  //   setType((current) =>
  //     current === CameraType.back ? CameraType.front : CameraType.back
  //   );
  // }

  const takePhoto = async () => {
    console.log(snap);
  };

  return (
    // <View style={styles.container}>
    //   <Camera style={styles.camera} ref={setSnap}>
    //     <View style={styles.buttonContainer}>
    //       <TouchableOpacity style={styles.button} onPress={takePhoto}>
    //         <FontAwesome5
    //           name='camera'
    //           size={20}
    //           color='rgba(189, 189, 189, 1)'
    //         />
    //       </TouchableOpacity>
    //     </View>
    //   </Camera>
    // </View>
    <View style={styles.container}>
      <Camera style={styles.camera} ref={setSnap}>
        <TouchableOpacity style={styles.button} onPress={takePhoto}>
          <FontAwesome5
            name='camera'
            size={20}
            color='rgba(189, 189, 189, 1)'
          />
        </TouchableOpacity>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "#E5E5E5",
  },
  camera: {
    height: 270,

    marginTop: 32,
    marginHorizontal: 16,
  },
  // buttonContainer: {
  //   alignItems: "center",
  //   justifyContent: "center",
  //   height: 300,

  //   backgroundColor: "#F6F6F6",
  //   borderWidth: 1,
  //   borderColor: "rgba(232, 232, 232, 1)",
  //   borderRadius: 8,
  // },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: "#FFFFFF",
  },
});

export default CreatePostsScreen;
