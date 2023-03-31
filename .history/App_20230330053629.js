import React, { useState, useEffect } from "react";
import { registerRootComponent } from "expo";
import * as Font from "expo-font";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { userRoute } from "./components/router";
import { store } from "./redux/store";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [user, setUser] = useState(null);
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
      const uid = user.uid;
    }
    // else {

    // }
  });

  const routing = userRoute(uid);

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
    <Provider store={store}>
      <NavigationContainer>{routing}</NavigationContainer>
    </Provider>
  );
}
registerRootComponent(App);
