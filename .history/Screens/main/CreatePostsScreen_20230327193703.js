// import React, { useState, useEffect, useRef, useCallback } from "react";
// import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { Camera, CameraType } from "expo-camera";
// import { FontAwesome5 } from "@expo/vector-icons";
// import { useFocusEffect } from "@react-navigation/native";

// const CreatePostsScreen = ({ navigation }) => {
//   const cameraRef = useRef(null); // Инициализация хука useRef, используем его для создания ссылки на инстанс камеры
//   const [hasPermission, setHasPermission] = useState(null); // Инициализация хука useState для хранения информации о том, получено ли разрешение на использование камеры
//   const [isCameraReady, setIsCameraReady] = useState(false); // Инициализация хука useState для хранения информации о том, готова ли камера к работе
//   const [photoUri, setPhotoUri] = useState(null); // photoUri используется для хранения URI (Uniform Resource Identifier) фотографии, которую пользователь сделал с помощью камеры. Начальное значение null указывает на то, что в начале приложения нет фотографии.
//   useEffect(() => {
//     // Используем useEffect для получения разрешения на использование камеры
//     (async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       setHasPermission(status === "granted");
//     })();
//   }, []);

//   useEffect(() => {
//     // Используем useEffect для уничтожения инстанса камеры при размонтировании компонента
//     return () => {
//       if (cameraRef.current) {
//         cameraRef.current.destroy();
//       }
//     };
//   }, []);

//   const takePhoto = async () => {
//     // Функция для получения фото с камеры
//     try {
//       if (isCameraReady) {
//         // Проверяем, готова ли камера к работе
//         const photo = await cameraRef.current.takePictureAsync(); // Получаем фото с помощью инстанса камеры
//         console.log("camera ---->", photo.uri); // Выводим ссылку на фото в консоль
//       } else {
//         console.log("Camera is not ready"); // Выводим сообщение, если камера не готова
//       }
//     } catch (error) {
//       console.log("takePhoto error", error); // Выводим сообщение об ошибке, если произошла ошибка при получении фото
//     }
//   };

//   useEffect(() => {
//     // Используем useEffect для возобновления превью при использовании камеры на другой странице
//     if (cameraRef.current) {
//       cameraRef.current.resumePreview();
//     }
//   }, [cameraRef]);

//   const handleCameraReady = useCallback(() => {
//     // Функция, вызываемая после того, как камера готова к работе
//     setIsCameraReady(true); // Устанавливаем флаг, говорящий о том, что камера готова к работе
//     console.log("Camera is ready"); // Выводим сообщение в консоль
//   }, []);

//   useFocusEffect(
//     // Используем хук useFocusEffect для возобновления работы камеры после возвращения на страницу с камерой
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

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // alignItems: "center",
//     // justifyContent: "center",
//     backgroundColor: "#E5E5E5",
//   },
//   camera: {
//     height: 300,
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 32,
//     marginHorizontal: 16,
//     borderRadius: 10,
//   },
//   // buttonContainer: {
//   //   alignItems: "center",
//   //   justifyContent: "center",
//   //   height: 300,

//   //   backgroundColor: "#F6F6F6",
//   //   borderWidth: 1,
//   //   borderColor: "rgba(232, 232, 232, 1)",
//   //   borderRadius: 8,
//   // },
//   button: {
//     alignItems: "center",
//     justifyContent: "center",
//     width: 60,
//     height: 60,
//     borderRadius: 100,
//     backgroundColor: "#FFFFFF",
//   },
//   overlay: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//   },
// });

// export default CreatePostsScreen;

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
import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Camera } from "expo-camera";
import { TouchableOpacity } from "react-native-gesture-handler";
const CreateScreen = () => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
    console.log("photo", photo);
  };
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={setCamera}>
        {photo && (
          <View style={styles.takePhotoContainer}>
            <Image
              source={{ uri: photo }}
              style={{ height: 200, width: 200 }}
            />
          </View>
        )}
        <TouchableOpacity onPress={takePhoto} style={styles.snapContainer}>
          <Text style={styles.snap}>SNAP</Text>
        </TouchableOpacity>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  snap: {
    color: "#fff",
  },
  snapContainer: {
    borderWidth: 1,
    borderColor: "#ff0000",
    width: 70,
    height: 70,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  takePhotoContainer: {
    position: "absolute",
    top: 50,
    left: 10,
    borderColor: "#fff",
    borderWidth: 1,
  },
});

export default CreateScreen;
