import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../nestedScreens/HomeScreen";
import MapScreen from "../nestedScreens/MapScreen";
import CommentsScreen from "../nestedScreens/CommentsScreen";

const NestedScreen = createStackNavigator();

const PostsScreen = () => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen name='Home' component={HomeScreen} />
      <NestedScreen.Screen name='Map' component={MapScreen} />
      <NestedScreen.Screen name='Comments' component={CommentsScreen} />
    </NestedScreen.Navigator>
  );
};

export default PostsScreen;
