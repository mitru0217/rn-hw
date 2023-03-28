import React, { useState, useEffect, useRef, useCallback } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { FontAwesome5 } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

const CreatePostsScreen = ({ navigation }) => {
  const cameraRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [photoUri, setPhotoUri] = useState(null);
  const [photo, setPhoto] = useState(null);

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
        setPhoto(photo.uri);
        console.log("camera ---->", photo.uri);
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

  const handleCameraReady = useCallback(() => {
    setIsCameraReady(true);
    console.log("Camera is ready");
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (cameraRef.current) {
        cameraRef.current.resumePreview();
      }
    }, [cameraRef])
  );

  useEffect(() => {
    // Add this useEffect to reset the photo state when navigating away from the screen
    return () => {
      setPhoto(null);
    };
  }, []);

  return (
    <View style={styles.container}>
      {hasPermission && !photoUri && (
        <Camera
          ref={cameraRef}
          style={styles.camera}
          onCameraReady={handleCameraReady}
          type={CameraType.back}
        >
          {photo && (
            <View style={styles.takePhotoContainer}>
              <Image
                source={{ uri: photo }}
                style={{ height: 200, width: 200 }}
              />
            </View>
          )}
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

{
  /* <View style={styles.container}>
  <Camera style={styles.camera} ref={setSnap}>
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={takePhoto}>
        <FontAwesome5 name='camera' size={20} color='rgba(189, 189, 189, 1)' />
      </TouchableOpacity>
    </View>
  </Camera>
</View>; */
}

//разделяю useEffect на две части: первый запускается только при монтировании компонента и запрашивает разрешение
// на использование камеры, а второй запускается только тогда, когда camera и hasPermission установлены в своих состояниях.
// Это может помочь избежать ошибки Cannot read property 'current' of null.
// const CreatePostsScreen = ({ navigation }) => {
//   const cameraRef = useRef(null);
//   const [hasPermission, setHasPermission] = useState(null);
//   const [isCameraReady, setIsCameraReady] = useState(false);
//   const [photoUri, setPhotoUri] = useState(null);
//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       setHasPermission(status === "granted");
//     })();
//   }, []);

//   useEffect(() => {
//     return () => {
//       if (cameraRef.current) {
//         cameraRef.current.destroy();
//       }
//     };
//   }, []);

//   const takePhoto = async () => {
//     try {
//       if (isCameraReady) {
//         const photo = await cameraRef.current.takePictureAsync();
//         console.log("camera ---->", photo.uri);
//       } else {
//         console.log("Camera is not ready");
//       }
//     } catch (error) {
//       console.log("takePhoto error", error);
//     }
//   };

//   useEffect(() => {
//     const unsubscribe = navigation.addListener("focus", () => {
//       if (cameraRef.current) {
//         cameraRef.current.resumePreview();
//       }
//     });

//     return unsubscribe;
//   }, [navigation]);
//   useEffect(() => {
//     if (cameraRef.current) {
//       cameraRef.current.resumePreview();
//     }
//   }, [cameraRef]);

//   const handleCameraReady = useCallback(() => {
//     setIsCameraReady(true);
//     console.log("Camera is ready");
//   }, []);

//   useEffect(() => {
//     const unsubscribe = navigation.addListener('focus', () => {
//       if (cameraRef.current) {
//         cameraRef.current.resumePreview();
//       }
//     });

//     return unsubscribe;
//   }, [navigation]);
//   useFocusEffect(
//     useCallback(() => {
//       if (cameraRef.current) {
//         cameraRef.current.resumePreview();
//       }
//     }, [cameraRef])
//   );
//   return (
//     <View style={styles.container}>
//       {hasPermission && !photoUri && (
//         <Camera
//           ref={cameraRef}
//           style={styles.camera}
//           onCameraReady={handleCameraReady}
//           type={CameraType.back}
//         >
//           <TouchableOpacity style={styles.button} onPress={takePhoto}>
//             <FontAwesome5
//               name='camera'
//               size={20}
//               color='rgba(189, 189, 189, 1)'
//             />
//           </TouchableOpacity>
//         </Camera>
//       )}
//       {photoUri && (
//         <View style={styles.photoPreview}>
//           <Image source={{ uri: photoUri }} style={styles.photoPreviewImage} />
//           <TouchableOpacity
//             style={styles.photoPreviewCloseButton}
//             onPress={() => setPhotoUri(null)}
//           >
//             <FontAwesome5 name='times' size={20} color='white' />
//           </TouchableOpacity>
//         </View>
//       )}
//     </View>
//   );
// };
//---------------------------------------------------------------------
