import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import * as Font from "expo-font";

const backgroundImage = require("./assets/images/photo-1536528087222-ef43dd3bb0f3.jpg");
const initialState = {
  name: "",
  email: "",
  password: "",
};

const loadFonts = async () => {
  await Font.loadAsync({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });
};
export default function App() {
  console.log(Platform.OS);
  // const [value, setValue] = useState("");
  // const inputHandler = (text) => setValue(text);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };
  const handlerSubmit = () => {
    console.log(state);
    setState(initialState);
  };
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <ImageBackground style={styles.image} source={backgroundImage}>
          <View style={{ ...styles.form, height: isShowKeyboard ? 374 : 549 }}>
            {/* <View style={{ ...styles.form, marginBottom: isShowKeyboard ? 32 : 0 }}> */}
            {/* 549 : 374  */}
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <Text style={styles.formTitle}>Registration</Text>
              <TextInput
                style={styles.input}
                // textAlign={"center"}
                onFocus={() => setIsShowKeyboard(true)}
                placeholder='Login'
                value={state.name}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, name: value }))
                }
              />
              <TextInput
                style={styles.input}
                onFocus={() => setIsShowKeyboard(true)}
                placeholder='Email'
                value={state.email}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, email: value }))
                }
              />
              <TextInput
                style={styles.input}
                onFocus={() => setIsShowKeyboard(true)}
                secureTextEntry={true}
                placeholder='Password'
                value={state.password}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, password: value }))
                }
              />
            </KeyboardAvoidingView>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.button}
              onPress={handlerSubmit}
            >
              <Text style={styles.btnTitle}>SIGN IN</Text>
            </TouchableOpacity>
            <Text style={styles.formText}> Have you account? Log in</Text>
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  form: {
    backgroundColor: "#fff",
    height: 549,
    marginHorizontal: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    // justifyContent: "flex-start",
    // alignItems: "center",
  },
  formTitle: {
    textAlign: "center",
    fontSize: 30,
    lineHeight: 35,
    fontWeight: 500,
    marginTop: 92,
    marginBottom: 33,
    // paddingTop: 92,
    color: "#212121",
  },
  input: {
    backgroundColor: "#F6F6F6",
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E8E8E8",
    marginBottom: 16,
    padding: 16,
  },
  button: {
    marginTop: 27,
    marginBottom: 16,
    backgroundColor: "#FF6C00",
    height: 50,
    borderRadius: 100,
    paddingBottom: 16,
    paddingTop: 16,
  },
  btnTitle: {
    textAlign: "center",
    fontSize: 16,
    lineHeight: 19,
    fontWeight: 400,
    color: "#FFFFFF",
  },
  formText: {
    textAlign: "center",
    fontSize: 16,
    lineHeight: 19,
    fontWeight: 400,
    color: "#1B4371",
  },
});
