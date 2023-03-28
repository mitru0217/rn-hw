import React, { useState, useEffect, useRef, useCallback } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { FontAwesome5 } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

const CreatePostsScreen = ({ navigation }) => {
  const cameraRef = useRef(null); // Инициализация хука useRef, используем его для создания ссылки на инстанс камеры
  const [hasPermission, setHasPermission] = useState(null); //Инициализация хука useState для хранения информации о том, получено ли разрешение на использование камеры
  const [isCameraReady, setIsCameraReady] = useState(false); // Инициализация хука useState для хранения информации о том, готова ли камера к работе
  const [photoUri, setPhotoUri] = useState(null);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    // Используем useEffect для получения разрешения на использование камеры
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    // Используем useEffect для уничтожения инстанса камеры при размонтировании компонента
    return () => {
      if (cameraRef.current) {
        cameraRef.current.destroy();
      }
      return () => {
        setPhoto(null);
      };
    };
  }, []);

  const takePhoto = async () => {
    // Функция для получения фото с камеры
    try {
      if (isCameraReady) {
        // Проверяем, готова ли камера к работе
        const photo = await cameraRef.current.takePictureAsync(); // Получаем фото с помощью инстанса камеры
        setPhoto(photo.uri); // Выводим ссылку на фото в консоль
        console.log("camera ---->", photo.uri);
      } else {
        console.log("Camera is not ready"); // Выводим сообщение, если камера не готова
      }
    } catch (error) {
      console.log("takePhoto error", error); // Выводим сообщение об ошибке, если произошла ошибка при получении фото
    }
  };

  useEffect(() => {
    // Используем useEffect для возобновления превью при использовании камеры на другой странице
    if (cameraRef.current) {
      cameraRef.current.resumePreview();
    }
  }, [cameraRef]);

  const handleCameraReady = useCallback(() => {
    // Функция, вызываемая после того, как камера готова к работе
    setIsCameraReady(true); // Устанавливаем флаг, говорящий о том, что камера готова к работе
    console.log("Camera is ready"); // Выводим сообщение в консоль
  }, []);

  useFocusEffect(
    useCallback(() => {
      // Используем хук useFocusEffect для возобновления работы камеры после возвращения на страницу с камерой
      if (cameraRef.current) {
        cameraRef.current.resumePreview();
      }
    }, [cameraRef])
  );

  // useEffect(() => {
  //   // Add this useEffect to reset the photo state when navigating away from the screen
  //   return () => {
  //     setPhoto(null);
  //   };
  // }, []);

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
