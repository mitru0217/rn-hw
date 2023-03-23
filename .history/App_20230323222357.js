import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import "react-native-gesture-handler";
import AppLoading from "expo";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import RegistrationScreen from "./Screens/auth/RegistrationScreen";
import LoginScreen from "./Screens/auth/LoginScreen";

const AuthStack = createStackNavigator();
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
    <NavigationContainer>
      <AuthStack.Navigator>
        <AuthStack.Screen name='Register' component={RegistrationScreen} />
        <AuthStack.Screen name='Login' component={LoginScreen} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}
