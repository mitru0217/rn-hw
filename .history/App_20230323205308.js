import React, { useState, useEffect } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   ImageBackground,
//   TextInput,
//   TouchableOpacity,
//   Platform,
//   KeyboardAvoidingView,
//   Keyboard,
//   TouchableWithoutFeedback,
//   Dimensions,
// } from "react-native";
import * as Font from "expo-font";
// import { useFonts } from 'expo-font';
import RegistationScreen from "./Screens/auth/RegistrationScreen";
// const backgroundImage = require("./assets/images/photo-1536528087222-ef43dd3bb0f3.jpg");
// const initialState = {
//   name: "",
//   email: "",
//   password: "",
// };

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
          "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
          "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }
    loadFonts();
  }, []);

  if (!isReady) {
    return null; // или можно отображать индикатор загрузки
  }
  return (
    <>
      <RegistationScreen />
    </>
  );
}
