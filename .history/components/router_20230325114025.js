import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import RegistrationScreen from "../Screens/auth/RegistrationScreen";
import LoginScreen from "../Screens/auth/LoginScreen";
import PostsScreen from "../Screens/main/PostsScreen";
import CreatePostsScreen from "../Screens/main/CreatePostsScreen";
import ProfileScreen from "../Screens/main/ProfileScreen";

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
    <MainTab.Navigator options={{ showLabel: false }}>
      <MainTab.Screen name='Posts' component={PostsScreen} />
      <MainTab.Screen name='Create' component={CreatePostsScreen} />
      <MainTab.Screen name='Profile' component={ProfileScreen} />
    </MainTab.Navigator>
  );
};
