import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
} from "react-native";

const backgroundImage = require("./assets/images/photo-1536528087222-ef43dd3bb0f3.jpg");

export default function App() {
  const [value, setValue] = useState("");
  const inputHandler = (text) => setValue(text);

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.image} source={backgroundImage}>
        <View style={styles.form}>
          <Text style={styles.formTitle}>Registration</Text>
          <TextInput
            style={styles.input}
            placeholder='Login'
            value={value}
            onChangeText={inputHandler}
          />
          <TextInput
            style={styles.input}
            placeholder='Email'
            value={value}
            onChangeText={inputHandler}
          />
          <TextInput
            style={styles.input}
            placeholder='Password'
            value={value}
            onChangeText={inputHandler}
          />
        </View>
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
    height: 549,
    marginHorizontal: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    // justifyContent: "flex-start",
    alignItems: "center",
  },
  formTitle: {
    fontSize: 30,
    lineHeight: 35,
    // fontWeight: 500,
    // marginTop: 92,
    paddingTop: 92,
    color: "#212121",
  },
  input: {
    backgroundColor: "#F6F6F6",
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E8E8E8",
    marginBottom: 16,
  },
});
