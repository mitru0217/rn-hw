import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import "react-native-gesture-handler";
import AppLoading from "expo";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import RegistationScreen from "./Screens/auth/RegistrationScreen";
import LoginnScreen from "./Screens/auth/LoginScreen";

// const loadingFonts = async () => {
//   await Font.loadAsync({
//     "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
//     "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
//     "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
//   });
// };

const Stack = createStackNavigator();
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
  // if (!isReady) {
  //   return (
  //     <AppLoading
  //       startAsync={loadingFonts}
  //       onFinish={() => setIsReady(true)}
  //       onError={console.warn}
  //     />
    );
  }

  return (
    <>
      {/* <RegistationScreen /> */}
      <LoginnScreen />
    </>
  );
}
