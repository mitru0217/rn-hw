// import React, { useState, useEffect, useRef, useCallback } from "react";
import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

import { Camera, CameraType } from "expo-camera";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
// import { useFocusEffect } from "@react-navigation/native";
// import * as Location from "expo-location";
// // const CreatePostsScreen = ({ navigation }) => {
// //   const cameraRef = useRef(null); // Инициализация хука useRef, используем его для создания ссылки на инстанс камеры
// //   const [hasPermission, setHasPermission] = useState(null); //Инициализация хука useState для хранения информации о том, получено ли разрешение на использование камеры
// //   const [isCameraReady, setIsCameraReady] = useState(false); // Инициализация хука useState для хранения информации о том, готова ли камера к работе
// //   // const [photoUri, setPhotoUri] = useState(null);
// //   const [photo, setPhoto] = useState(null);

// //   useEffect(() => {
// //     // Используем useEffect для получения разрешения на использование камеры
// //     (async () => {
// //       const { status } = await Camera.requestCameraPermissionsAsync();
// //       setHasPermission(status === "granted");
// //     })();
// //   }, []);

// //   useEffect(() => {
// //     // Используем useEffect для уничтожения инстанса камеры при размонтировании компонента
// //     return () => {
// //       if (cameraRef.current) {
// //         cameraRef.current.destroy();
// //       }
// //       setPhoto(null); // очищаем состояние фото при размонтировании компонента
// //     };
// //   }, []);

// //   const takePhoto = async () => {
// //     // Функция для получения фото с камеры
// //     try {
// //       if (isCameraReady) {
// //         // Проверяем, готова ли камера к работе
// //         const photo = await cameraRef.current.takePictureAsync(); // Получаем фото с помощью инстанса камеры
// //         setPhoto(photo.uri); // Выводим ссылку на фото в консоль
// //         console.log("camera ---->", photo.uri);
// //       } else {
// //         console.log("Camera is not ready"); // Выводим сообщение, если камера не готова
// //       }
// //     } catch (error) {
// //       console.log("takePhoto error", error); // Выводим сообщение об ошибке, если произошла ошибка при получении фото
// //     }
// //   };

// //   // useEffect(() => {
// //   //   // Используем useEffect для возобновления превью при использовании камеры на другой странице
// //   //   if (cameraRef.current) {
// //   //     cameraRef.current.resumePreview();
// //   //   }
// //   // }, [cameraRef]);

// //   const handleCameraReady = useCallback(() => {
// //     // Функция, вызываемая после того, как камера готова к работе
// //     setIsCameraReady(true); // Устанавливаем флаг, говорящий о том, что камера готова к работе
// //     console.log("Camera is ready"); // Выводим сообщение в консоль
// //   }, []);

// //   useFocusEffect(
// //     useCallback(() => {
// //       // Используем хук useFocusEffect для возобновления работы камеры после возвращения на страницу с камерой
// //       if (cameraRef.current) {
// //         cameraRef.current.resumePreview();
// //       }
// //     }, [cameraRef])
// //   );

// //   return (
// //     <View style={styles.container}>
// //       {hasPermission && !photo && (
// //         <Camera
// //           ref={cameraRef}
// //           style={styles.camera}
// //           onCameraReady={handleCameraReady}
// //           type={CameraType.back}
// //         >
// //           {photo && (
// //             <View style={styles.takePhotoContainer}>
// //               <Image
// //                 source={{ uri: photo }}
// //                 style={{ height: 300, width: 200 }}
// //               />
// //             </View>
// //           )}
// //           <TouchableOpacity style={styles.button} onPress={takePhoto}>
// //             <FontAwesome5
// //               name='camera'
// //               size={20}
// //               color='rgba(189, 189, 189, 1)'
// //             />
// //           </TouchableOpacity>
// //         </Camera>
// //       )}
// //     </View>
// //   );
// // };

const initialState = {
  title: "",
  locality: "",
};

const CreatePostsScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null); // используем хук useState для установки состояния разрешения на камеру
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back); // используем хук useState для установки начального состояния типа камеры
  const [photo, setPhoto] = useState(null); //проверяем есть ли фото или нет
  const [isTakingPicture, setIsTakingPicture] = useState(false); // используем хук useState для управления состоянием фотографирования
  const [cameraReady, setCameraReady] = useState(false); // используем хук useState для управления состоянием готовности камеры

  const [state, setState] = useState(initialState); //используем хук useState для управления состоянием для создания поста
  const [isShowKeyboard, setIsShowKeyboard] = useState(false); //используем хук useState: делаем флаг, видна клавиатура или нет

  const cameraRef = useRef(null); // используем useRef для создания ссылки на объект камеры

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync(); // используем useEffect и Camera.requestCameraPermissionsAsync для запроса разрешений на использование камеры
      setHasPermission(status === "granted");
    })();
  }, []);

  //   useEffect(() => {
  //     return () => {
  //       if (cameraRef.current) {
  //         cameraRef.current.destroy();
  //       }
  //       setPhoto(null); // очищаем состояние фото при размонтировании компонента
  //     };
  //   }, []);
  const startCamera = async () => {
    if (cameraRef.current) {
      await cameraRef.current.resumePreview(); // используем ссылку на объект камеры для запуска предварительного просмотра камеры
      setCameraReady(true); // устанавливаем состояние cameraReady для предотвращения фотографирования до тех пор, пока камера не будет готова
    }
  };

  const stopCamera = async () => {
    if (cameraRef.current) {
      await cameraRef.current.pausePreview(); // используем ссылку на объект камеры для остановки предварительного просмотра камеры
      setCameraReady(false); // сбрасываем состояние cameraReady
    }
  };

  const switchCamera = () => {
    if (cameraType === Camera.Constants.Type.back) {
      setCameraType(Camera.Constants.Type.front); // переключаемся на переднюю камеру
    } else {
      setCameraType(Camera.Constants.Type.back); // переключаемся на заднюю камеру
    }
  };

  //   const takePhoto = async () => {
  //     try {
  //       if (isCameraReady) {
  //         const photo = await cameraRef.current.takePictureAsync();
  //         const location = await Location.getCurrentPositionAsync();
  //         console.log("location", location);
  //         setPhoto(photo.uri); // сохраняем ссылку на фото в состоянии компонента
  //         console.log("camera ---->", photo.uri);
  //       } else {
  //         console.log("Camera is not ready");
  //       }
  //     } catch (error) {
  //       console.log("takePhoto error", error);
  //     }
  //   };
  const takePicture = async () => {
    if (cameraRef.current && !isTakingPicture) {
      setIsTakingPicture(true); // устанавливаем состояние isTakingPicture для предотвращения повторного фотографирования
      try {
        const { uri } = await cameraRef.current.takePictureAsync(); // используем ссылку на объект камеры и метод takePictureAsync для фотографирования
        setPhoto(uri); // сохраняем ссылку на фото в состоянии компонента
        console.log(uri); // выводим uri фотографии в консоль
      } catch (error) {
        console.log(error); // логируем ошибку в консоль, если она возникнет
      } finally {
        setIsTakingPicture(false); // в любом случае сбрасываем состояние isTakingPicture
      }
    }
  };

  const handleCameraReady = () => {
    setCameraReady(true); // используем обратный вызов onCameraReady для установки состояния cameraReady
  };
  //   useEffect(() => {
  //     (async () => {
  //       let { status } = await Location.requestForegroundPermissionsAsync();
  //       if (status !== "granted") {
  //         setErrorMsg("Permission to access location was denied");
  //         return;
  //       }
  //     })();
  //   }, []);

  //Создаём пост. Это мой код
  const sendPost = () => {
    console.log("navigate", navigation);
    const { title, locality } = state;
    navigation.navigate("Home", { photo, title, locality });
    console.log("photo URI", { photo, title, locality });
    setState(initialState);
    setPhoto(null);
  };

  //   const handleCameraReady = useCallback(() => {
  //     setIsCameraReady(true);
  //     console.log("Camera is ready");
  //   }, []);

  //   useFocusEffect(
  //     useCallback(() => {
  //       if (cameraRef.current) {
  //         cameraRef.current.resumePreview();
  //       }
  //     }, [cameraRef])
  //   );

  const keyboardHide = () => {
    //Убираем клавиатуру
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setState(initialState);
  };
  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        {hasPermission === null ? (
          <View>
            <Text>Requesting camera permission</Text>
          </View>
        ) : hasPermission === false ? (
          <View>
            <Text>No access to camera</Text>
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <Camera
              ref={cameraRef}
              type={cameraType}
              onCameraReady={handleCameraReady}
              style={{ ...styles.camera, marginTop: isShowKeyboard ? 1 : 32 }}
            >
              <View style={{ flex: 0.2, backgroundColor: "transparent" }}>
                {cameraReady && (
                  <TouchableOpacity
                    onPress={takePicture}
                    style={styles.btnCamera}
                  >
                    {isTakingPicture ? (
                      <FontAwesome name='circle' size={50} color='#fff' />
                    ) : (
                      <FontAwesome
                        name='camera'
                        size={20}
                        color='rgba(189, 189, 189, 1)'
                      />
                    )}
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  onPress={switchCamera}
                  style={{
                    alignSelf: "flex-end",
                    padding: 20,
                  }}
                >
                  <FontAwesome name='camera-retro' size={35} color='#fff' />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={stopCamera}
                  style={{
                    alignSelf: "flex-end",
                    padding: 20,
                  }}
                >
                  <FontAwesome name='stop' size={35} color='#fff' />
                </TouchableOpacity>
              </View>
            </Camera>
          </View>
        )}
        {photo && (
          <View style={styles.takePhotoContainer}>
            <Image
              source={{ uri: photo }}
              style={{ height: 300, width: 360 }}
            />
          </View>
        )}
        {/* <TouchableOpacity style={styles.btnCamera} onPress={takePhoto}>
            <FontAwesome
                       name='camera'
                size={20}
                 color='rgba(189, 189, 189, 1)'
               />
             </TouchableOpacity> 
                   </Camera>
         )}   */}
        <TouchableOpacity style={styles.downloadPhoto}>
          <Text style={styles.downloadText}>Download Photo</Text>
        </TouchableOpacity>
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : ""}>
          <View
            style={{
              ...styles.inputView,
              marginTop: isShowKeyboard ? 2 : 48,
              marginBottom: isShowKeyboard ? 5 : 16,
            }}
          >
            <TextInput
              style={styles.input}
              placeholder='Title'
              placeholderTextColor='rgba(189, 189, 189, 1)'
              placeholderStyle={{
                fontFamily: "Roboto-Regular",
                fontSize: 16,
                lineHeight: 19,
              }}
              onFocus={() => setIsShowKeyboard(true)}
              onBlur={() => setIsShowKeyboard(false)}
              value={state.title}
              onChangeText={(value) =>
                setState((prevState) => ({ ...prevState, title: value }))
              }
            />
          </View>

          <View style={styles.inputViewLocation}>
            {/* <Feather name='map-pin' size={16} color='rgba(189, 189, 189, 1)' /> */}
            <TextInput
              style={styles.input}
              placeholder='Locality'
              placeholderTextColor='rgba(189, 189, 189, 1)'
              placeholderStyle={{
                fontFamily: "Roboto-Regular",
                fontSize: 16,
                lineHeight: 19,
                marginLeft: 10,
              }}
              onFocus={() => setIsShowKeyboard(true)}
              onBlur={() => setIsShowKeyboard(false)}
              value={state.locality}
              onChangeText={(value) =>
                setState((prevState) => ({ ...prevState, locality: value }))
              }
            />
          </View>
        </KeyboardAvoidingView>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.button}
          onPress={sendPost}
        >
          <Text style={styles.btnTitle}>Publish</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

// import React, { useState, useRef, useEffect } from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import { Camera } from 'expo-camera';
// import { FontAwesome } from '@expo/vector-icons';

// export default function CreatePostsScreen() {

// const [hasPermission, setHasPermission] = useState(null); // используем хук useState для установки состояния разрешения на камеру
// const [cameraType, setCameraType] = useState(Camera.Constants.Type.back); // используем хук useState для установки начального состояния типа камеры
// const [isTakingPicture, setIsTakingPicture] = useState(false); // используем хук useState для управления состоянием фотографирования
// const [cameraReady, setCameraReady] = useState(false); // используем хук useState для управления состоянием готовности камеры

// const cameraRef = useRef(null); // используем useRef для создания ссылки на объект камеры

// useEffect(() => {
//   (async () => {
//     const { status } = await Camera.requestPermissionsAsync(); // используем useEffect и Camera.requestPermissionsAsync для запроса разрешений на использование камеры
//     setHasPermission(status === 'granted');
//   })();
// }, []);

// const startCamera = async () => {
//   if (cameraRef.current) {
//     await cameraRef.current.resumePreview(); // используем ссылку на объект камеры для запуска предварительного просмотра камеры
//     setCameraReady(true); // устанавливаем состояние cameraReady для предотвращения фотографирования до тех пор, пока камера не будет готова
//   }
// };

// const stopCamera = async () => {
//   if (cameraRef.current) {
//     await cameraRef.current.pausePreview(); // используем ссылку на объект камеры для остановки предварительного просмотра камеры
//     setCameraReady(false); // сбрасываем состояние cameraReady
//   }
// };

// const switchCamera = () => {
//   if (cameraType === Camera.Constants.Type.back) {
//     setCameraType(Camera.Constants.Type.front); // переключаемся на переднюю камеру
//   } else {
//     setCameraType(Camera.Constants.Type.back); // переключаемся на заднюю камеру
//   }
// };

// const takePicture = async () => {
//   if (cameraRef.current && !isTakingPicture) {
//     setIsTakingPicture(true); // устанавливаем состояние isTakingPicture для предотвращения повторного фотографирования
//     try {
//       const { uri } = await cameraRef.current.takePictureAsync(); // используем ссылку на объект камеры и метод takePictureAsync для фотографирования
//       console.log(uri); // выводим uri фотографии в консоль
//     } catch (error) {
//       console.log(error); // логируем ошибку в консоль, если она возникнет
//     } finally {
//       setIsTakingPicture(false); // в любом случае сбрасываем состояние isTakingPicture
//     }
//   }
// };

//   const handleCameraReady = () => {
//     setCameraReady(true); // используем обратный вызов onCameraReady для установки состояния cameraReady
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       {hasPermission === null ? (
//         <View>
//           <Text>Requesting camera permission</Text>
//         </View>
//       ) : hasPermission === false ? (
//         <View>
//           <Text>No access to camera</Text>
//         </View>
//       ) : (
//         <View style={{ flex: 1 }}>
//           <Camera
//             ref={cameraRef}
//             type={cameraType}
//             onCameraReady={handleCameraReady}
//             style={{ flex: 1 }}
//           />
//           <View style={{ flex: 0.2, backgroundColor: 'transparent' }}>
//             {cameraReady && (
//               <TouchableOpacity
//                 onPress={takePicture}
//                 style={{
//                   alignSelf: 'center',
//                   padding: 20,
//                   borderWidth: 4,
//                   borderRadius: 50,
//                   borderColor: '#fff',
//                   marginBottom: 20,
//                 }}
//               >
//                 {isTakingPicture ? (
//                   <FontAwesome name="circle" size={50} color="#fff" />
//                 ) : (
//                   <FontAwesome name="camera" size={50} color="#fff" />
//                 )}
//               </TouchableOpacity>
//             )}
//             <TouchableOpacity
//               onPress={switchCamera}
//               style={{
//                 alignSelf: 'flex-end',
//                 padding: 20,
//               }}
//             >
//               <FontAwesome name="camera-retro" size={35} color="#fff" />
//             </TouchableOpacity>
//           </View>
//         </View>
//       )}
//     </View>
//   );
// }

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
  btnCamera: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: "#FFFFFF",
  },
  takePhotoContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    borderRadius: 10,
  },
  downloadPhoto: {
    marginTop: 8,
    marginLeft: 16,
  },
  downloadText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "rgba(189, 189, 189, 1)",
  },
  inputView: {
    marginHorizontal: 16,
  },
  inputViewLocation: {
    marginHorizontal: 16,

    // flexDirection: "row",
  },

  input: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(189, 189, 189, 1)",
    height: 50,
    fontFamily: "Roboto-Bold",
    fontSize: 16,
    lineHeight: 19,
    color: "rgba(33, 33, 33, 1)",
  },

  button: {
    marginTop: 27,
    marginBottom: 16,
    backgroundColor: "#FF6C00",
    height: 50,
    borderRadius: 100,
    paddingBottom: 16,
    paddingTop: 16,
    marginHorizontal: 16,
  },
  btnTitle: {
    textAlign: "center",
    fontSize: 16,
    lineHeight: 19,
    fontWeight: 400,
    color: "#FFFFFF",
    fontFamily: "Roboto-Medium",
  },
});

export default CreatePostsScreen;
