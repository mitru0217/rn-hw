import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";

import RegistrationScreen from "./Screens/auth/RegistrationScreen";
import LoginScreen from "./Screens/auth/LoginScreen";
import PostsScreen from "./Screens/main/PostsScreen";
import CreatePostsScreen from "./Screens/main/CreatePostsScreen";
import ProfileScreen from "./Screens/main/ProfileScreen";

export default function App() {
  const [isReady, setIsReady] = useState(false);
  // const routing = userRoute(null);
  const routing = userRoute({});

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

  return <NavigationContainer>{routing}</NavigationContainer>;
}
