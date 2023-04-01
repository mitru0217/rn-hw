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
import * as Location from "expo-location";

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

  const takePicture = async () => {
    if (cameraRef.current && !isTakingPicture) {
      setIsTakingPicture(true); // устанавливаем состояние isTakingPicture для предотвращения повторного фотографирования
      try {
        const { uri } = await cameraRef.current.takePictureAsync(); // используем ссылку на объект камеры и метод takePictureAsync для фотографирования
        const location = await Location.getCurrentPositionAsync(); //получаем координаты, где сделано фото
        console.log("location", location); // выводим координаты в консоль
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
  useEffect(() => {
    //используем хук useEffect для запроса разрешения пользователя на доступ к местоположению устройства в React компоненте
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  //Создаём пост. Это мой код
  const sendPost = () => {
    console.log("navigate", navigation);
    const { title, locality } = state;
    navigation.navigate("Home", { photo, title, locality });
    console.log("photo URI", { photo, title, locality });
    setState(initialState);
    setPhoto(null);
  };

  //Убираем клавиатуру
  const keyboardHide = () => {
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
                    <FontAwesome
                      name='camera'
                      size={20}
                      color='rgba(189, 189, 189, 1)'
                    />
                    {/* {isTakingPicture && (
                      <FontAwesome
                        name='circle'
                        size={20}
                        color='rgba(189, 189, 189, 1)'
                      />
                    )} */}
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  onPress={switchCamera}
                  style={{
                    alignSelf: "flex-end",
                    padding: 20,
                    backgroundColor: "white",
                    borderRadius: 50,
                  }}
                >
                  <FontAwesome
                    name='camera-retro'
                    size={20}
                    color='rgba(189, 189, 189, 1)'
                  />
                </TouchableOpacity>
                {/* <TouchableOpacity
                  onPress={stopCamera}
                  style={{
                    alignSelf: "flex-end",
                    padding: 20,
                  }}
                >
                  <FontAwesome
                    name='stop'
                    size={20}
                    color='rgba(189, 189, 189, 1)'
                  />
                </TouchableOpacity> */}
              </View>
              {photo && (
                <View style={styles.takePhotoContainer}>
                  <Image
                    source={{ uri: photo }}
                    style={{ height: 300, width: 360 }}
                  />
                </View>
              )}
            </Camera>
          </View>
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
