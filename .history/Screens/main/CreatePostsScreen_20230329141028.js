import React, { useState, useEffect, useRef, useCallback } from "react";
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
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import * as Location from "expo-location";
// const CreatePostsScreen = ({ navigation }) => {
//   const cameraRef = useRef(null); // Инициализация хука useRef, используем его для создания ссылки на инстанс камеры
//   const [hasPermission, setHasPermission] = useState(null); //Инициализация хука useState для хранения информации о том, получено ли разрешение на использование камеры
//   const [isCameraReady, setIsCameraReady] = useState(false); // Инициализация хука useState для хранения информации о том, готова ли камера к работе
//   // const [photoUri, setPhotoUri] = useState(null);
//   const [photo, setPhoto] = useState(null);

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
//       setPhoto(null); // очищаем состояние фото при размонтировании компонента
//     };
//   }, []);

//   const takePhoto = async () => {
//     // Функция для получения фото с камеры
//     try {
//       if (isCameraReady) {
//         // Проверяем, готова ли камера к работе
//         const photo = await cameraRef.current.takePictureAsync(); // Получаем фото с помощью инстанса камеры
//         setPhoto(photo.uri); // Выводим ссылку на фото в консоль
//         console.log("camera ---->", photo.uri);
//       } else {
//         console.log("Camera is not ready"); // Выводим сообщение, если камера не готова
//       }
//     } catch (error) {
//       console.log("takePhoto error", error); // Выводим сообщение об ошибке, если произошла ошибка при получении фото
//     }
//   };

//   // useEffect(() => {
//   //   // Используем useEffect для возобновления превью при использовании камеры на другой странице
//   //   if (cameraRef.current) {
//   //     cameraRef.current.resumePreview();
//   //   }
//   // }, [cameraRef]);

//   const handleCameraReady = useCallback(() => {
//     // Функция, вызываемая после того, как камера готова к работе
//     setIsCameraReady(true); // Устанавливаем флаг, говорящий о том, что камера готова к работе
//     console.log("Camera is ready"); // Выводим сообщение в консоль
//   }, []);

//   useFocusEffect(
//     useCallback(() => {
//       // Используем хук useFocusEffect для возобновления работы камеры после возвращения на страницу с камерой
//       if (cameraRef.current) {
//         cameraRef.current.resumePreview();
//       }
//     }, [cameraRef])
//   );

//   return (
//     <View style={styles.container}>
//       {hasPermission && !photo && (
//         <Camera
//           ref={cameraRef}
//           style={styles.camera}
//           onCameraReady={handleCameraReady}
//           type={CameraType.back}
//         >
//           {photo && (
//             <View style={styles.takePhotoContainer}>
//               <Image
//                 source={{ uri: photo }}
//                 style={{ height: 300, width: 200 }}
//               />
//             </View>
//           )}
//           <TouchableOpacity style={styles.button} onPress={takePhoto}>
//             <FontAwesome5
//               name='camera'
//               size={20}
//               color='rgba(189, 189, 189, 1)'
//             />
//           </TouchableOpacity>
//         </Camera>
//       )}
//     </View>
//   );
// };

const initialState = {
  title: "",
  locality: "",
};

const CreatePostsScreen = ({ navigation }) => {
  const cameraRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

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
      setPhoto(null); // очищаем состояние фото при размонтировании компонента
    };
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  const takePhoto = async () => {
    try {
      if (isCameraReady) {
        const photo = await cameraRef.current.takePictureAsync();
        const location = await Location.getCurrentPositionAsync();
        console.log("location", location);
        setPhoto(photo.uri); // сохраняем ссылку на фото в состоянии компонента
        console.log("camera ---->", photo.uri);
      } else {
        console.log("Camera is not ready");
      }
    } catch (error) {
      console.log("takePhoto error", error);
    }
  };

  const sendPost = () => {
    console.log("navigate", navigation);
    const aboutPost = (value) =>
      setState((prevState) => ({
        ...prevState,
        title: value,
        locality: value,
      }));
    navigation.navigate("Home", { photo }, aboutPost);
    console.log("photo URI", photo, aboutPost);
  };

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

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setState(initialState);
  };
  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        {hasPermission && (
          <Camera
            ref={cameraRef}
            style={{ ...styles.camera, marginTop: isShowKeyboard ? 1 : 32 }}
            onCameraReady={handleCameraReady}
            type={CameraType.back}
          >
            {photo && (
              <View style={styles.takePhotoContainer}>
                <Image
                  source={{ uri: photo }}
                  style={{ height: 300, width: 360 }}
                />
              </View>
            )}
            <TouchableOpacity style={styles.btnCamera} onPress={takePhoto}>
              <FontAwesome5
                name='camera'
                size={20}
                color='rgba(189, 189, 189, 1)'
              />
            </TouchableOpacity>
          </Camera>
        )}

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
            <Feather name='map-pin' size={16} color='rgba(189, 189, 189, 1)' />
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
    // flex: 1,
    flexDirection: "row",

    alignItems: "center",
    // marginBottom: 16,
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
  // icon: {
  //   position: "absolute",
  //   top: 10,
  //   left: 0,
  // },
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
