import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//import Icons
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

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
    <MainTab.Navigator screenOptions={{ tabBarShowLabel: false }}>
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name='grid' size={24} color={color} />
          ),
        }}
        name='Posts'
        component={PostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons name='md-add-circle' size={24} color={color} />
          ),
        }}
        name='Create'
        component={CreatePostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name='user' size={24} color={color} />
          ),
        }}
        name='Profile'
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};
