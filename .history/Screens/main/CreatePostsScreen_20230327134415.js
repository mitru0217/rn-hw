import React, { useState, useEffect } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import { FontAwesome5 } from "@expo/vector-icons";

const CreatePostsScreen = () => {
  const [camera, setCamera] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);

  const onUnmount = async () => {
    if (camera && camera.current) {
      await camera.current.pausePreview();
      setCamera(null);
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
    return onUnmount; // Добавляем метод onUnmount в список зависимостей useEffect
  }, []);

  const takePhoto = async () => {
    try {
      if (camera) {
        await camera.resumePreview();
        const photo = await camera.takePictureAsync();
        console.log("camera ---->", photo.uri);
      }
    } catch (error) {
      console.log("takePhoto error", error);
    }
  };

  const handleCameraReady = () => {
    if (camera) {
      camera.resumePreview();
    }
  };

  // Добавляем обработчик события focus, который запускает камеру, если она еще не запущена
  const handleFocus = async () => {
    if (camera && !camera._isMounted) {
      await camera.resumePreview();
    }
  };

  return (
    <View style={styles.container}>
      {hasPermission && (
        <Camera
          ref={(ref) => setCamera(ref)}
          style={styles.camera}
          onCameraReady={handleCameraReady}
        >
          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <FontAwesome5
              name='camera'
              size={20}
              color='rgba(189, 189, 189, 1)'
            />
          </TouchableOpacity>
        </Camera>
      )}
      <TouchableWithoutFeedback onPress={handleFocus}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>
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
    height: 300,
    alignItems: "center",
    justifyContent: "center",
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
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default CreatePostsScreen;

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

//разделяю useEffect на две части: первый запускается только при монтировании компонента и запрашивает разрешение
// на использование камеры, а второй запускается только тогда, когда camera и hasPermission установлены в своих состояниях.
// Это может помочь избежать ошибки Cannot read property 'current' of null.
