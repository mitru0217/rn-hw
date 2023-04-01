import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { authLogOutUser } from "../../redux/auth/authOperations";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const loginOut = () => {
    dispatch(authLogOutUser);
  };
  return (
    <View style={styles.container}>
      <Text>ProfileScreen</Text>
      <Button title='LogOut' onPress={loginOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProfileScreen;
