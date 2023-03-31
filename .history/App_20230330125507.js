import React, { useState, useEffect } from "react";
import { registerRootComponent } from "expo";
import * as Font from "expo-font";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { store } from "./redux/store";

import Main from "./components/main";

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
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
registerRootComponent(App);
