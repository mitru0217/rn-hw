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

  const takePhoto = async () => {
    try {
      await camera.current.resumePreview();
      const photo = await camera.current.takePictureAsync();
      console.log("camera ---->", photo.uri);
    } catch (error) {
      console.log("takePhoto error", error);
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  return (
    <View style={styles.container}>
      {hasPermission && (
        <Camera ref={(ref) => setCamera(ref)} style={styles.camera}>
          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <FontAwesome5
              name='camera'
              size={20}
              color='rgba(189, 189, 189, 1)'
            />
          </TouchableOpacity>
        </Camera>
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

// import React, { useState, useRef, useLayoutEffect } from "react";
// import { View, Text, StyleSheet } from "react-native";
// import { Camera } from "expo-camera";

// const CreatePostsScreen = () => {
//   const [camera, setCamera] = useState(null);
//   const [isReady, setIsReady] = useState(false);

//   const handleCameraReady = () => {
//     setIsReady(true);
//   };

//   const takePhoto = async () => {
//     if (isReady && camera) {
//       try {
//         const photo = await camera.takePictureAsync();
//         console.log("camera ---->", photo.uri);
//       } catch (error) {
//         console.log("takePhoto error", error);
//       }
//     }
//   };

//   const onUnmount = async () => {
//     if (camera && camera.current) {
//       await camera.current.pausePreview();
//       setCamera(null);
//     }
//   };

//   useLayoutEffect(() => {
//     let timeoutId;
//     const initializeCamera = async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       if (status === "granted") {
//         setCamera(
//           <Camera
//             ref={(ref) => setCamera(ref)}
//             style={styles.camera}
//             onCameraReady={handleCameraReady}
//             type={Camera.Constants.Type.back}
//           />
//         );
//       }
//     };

//     initializeCamera();

//     return () => {
//       clearTimeout(timeoutId);
//       onUnmount();
//     };
//   }, []);

//   useLayoutEffect(() => {
//     if (!isReady) {
//       const timeoutId = setTimeout(() => setIsReady(true), 3000);
//       return () => clearTimeout(timeoutId);
//     }
//   }, [isReady]);

//   return (
//     <View style={styles.container}>
//       {camera}
//       <View style={styles.overlay} />
//       <Text style={styles.text}>Take a photo</Text>
//       <View style={styles.button} onTouchEnd={takePhoto} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: "column",
//     backgroundColor: "black",
//   },
//   camera: {
//     flex: 1,
//     justifyContent: "flex-end",
//     alignItems: "center",
//   },
//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "rgba(0,0,0,0.5)",
//   },
//   text: {
//     position: "absolute",
//     top: 20,
//     left: 20,
//     color: "white",
//     fontSize: 20,
//   },
//   button: {
//     position: "absolute",
//     bottom: 20,
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: "white",
//     alignSelf: "center",
//   },
// });

// export default CreatePostsScreen;
