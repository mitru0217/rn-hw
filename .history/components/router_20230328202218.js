import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
//import Icons
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import RegistrationScreen from "../Screens/auth/RegistrationScreen";
import LoginScreen from "../Screens/auth/LoginScreen";
import PostsScreen from "../Screens/main/PostsScreen";
import CreatePostsScreen from "../Screens/main/CreatePostsScreen";
import ProfileScreen from "../Screens/main/ProfileScreen";
import HomeScreen from "../Screens/nestedScreens/HomeScreen";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

export const userRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{ headerShown: false }}
          name='Register'
          component={RegistrationScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name='Login'
          component={LoginScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator screenOptions={{ tabBarShowLabel: false }}>
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name='grid' size={24} color={color} />
          ),
        }}
        name='Post'
        component={PostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <TouchableOpacity activeOpacity={0.8} style={styles.addButton}>
              <View style={styles.buttonContainer}>
                <Ionicons name='add' size={24} color='color' />
              </View>
            </TouchableOpacity>
          ),
        }}
        name='Create Post'
        component={CreatePostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name='user' size={24} color={"color"} />
          ),
        }}
        name='Profile'
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};

const styles = StyleSheet.create({
  addButton: {
    width: 70,
    height: 40,
    backgroundColor: "#FF6C00",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

// <TouchableOpacity
// activeOpacity={0.8}
// style={styles.button}
// onPress={handlerSubmit}
// >
// <Text style={styles.btnTitle}>LogIn</Text>
// </TouchableOpacity>
