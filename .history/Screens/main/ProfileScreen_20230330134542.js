import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { getAuth, signOut } from "firebase/auth";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text>ProfileScreen</Text>
      <Button
        title='LogOut'
        onPress={() => {
          const auth = getAuth();
          signOut(auth);
        }}
      />
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
