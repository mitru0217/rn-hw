import React, { useState, useEffect, useRef, useCallback } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { FontAwesome5 } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

const CreatePostsScreen = ({ navigation }) => {
  const cameraRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [photoUri, setPhotoUri] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    return () => {
      if (cameraRef.current) {
        cameraRef.current.destroy();
      }
    };
  }, []);

  const takePhoto = async () => {
    try {
      if (isCameraReady) {
        const photo = await cameraRef.current.takePictureAsync();
        console.log("camera ---->", photo.uri);
        setPhotoUri(photo.uri);
      } else {
        console.log("Camera is not ready");
      }
    } catch (error) {
      console.log("takePhoto error", error);
    }
  };

  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.resumePreview();
    }
  }, [cameraRef]);

  const handleCameraReady = () => {
    setIsCameraReady(true);
    console.log("Camera is ready");
  };

  useFocusEffect(
    React.useCallback(() => {
      if (cameraRef.current) {
        cameraRef.current.resumePreview();
      }
      return () => {
        if (cameraRef.current) {
          cameraRef.current.pausePreview();
        }
        if (photoUri) {
          setPhotoUri(null);
        }
      };
    }, [cameraRef, photoUri])
  );

  return (
    <View style={styles.container}>
      {hasPermission && !photoUri && (
        <Camera
          ref={cameraRef}
          style={styles.camera}
          onCameraReady={handleCameraReady}
          type={CameraType.back}
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
      {photoUri && (
        <View style={styles.photoPreview}>
          <Image source={{ uri: photoUri }} style={styles.photoPreviewImage} />
          <TouchableOpacity
            style={styles.photoPreviewCloseButton}
            onPress={() => setPhotoUri(null)}
          >
            <FontAwesome5 name='times' size={20} color='white' />
          </TouchableOpacity>
        </View>
      )}
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
    borderRadius: 10,
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
