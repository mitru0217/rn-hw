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
} from "react-native";

const backgroundImage = require("./assets/images/photo-1536528087222-ef43dd3bb0f3.jpg");

export default function App() {
  console.log(Platform.OS);
  // const [value, setValue] = useState("");
  // const inputHandler = (text) => setValue(text);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.image} source={backgroundImage}>
        <View style={styles.form}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <Text style={styles.formTitle}>Registration</Text>
            <TextInput
              style={styles.input}
              // textAlign={"center"}
              onFocus={() => setIsShowKeyboard(true)}
              placeholder='Login'
              // value={value}
              // onChangeText={inputHandler}
            />
            <TextInput
              style={styles.input}
              onFocus={() => setIsShowKeyboard(true)}
              placeholder='Email'
              // value={value}
              // onChangeText={inputHandler}
            />
            <TextInput
              style={styles.input}
              onFocus={() => setIsShowKeyboard(true)}
              secureTextEntry={true}
              placeholder='Password'
              // value={value}
              // onChangeText={inputHandler}
            />
          </KeyboardAvoidingView>
        </View>

        <TouchableOpacity activeOpacity={0.8} style={styles.button}>
          <Text style={styles.btnTitle}>SIGN IN</Text>
        </TouchableOpacity>
        <Text style={styles.formText}> Have you account? Log in</Text>
      </ImageBackground>
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
    // height: 549,
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
