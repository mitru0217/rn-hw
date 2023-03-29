import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Image, Button, Text } from "react-native";
import { Feather } from "@expo/vector-icons";

const HomeScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);
  console.log("route.params", route.params);

  useEffect(() => {
    if (
      route.params &&
      route.params.photo &&
      route.params.locality &&
      route.params.title
    ) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  console.log("posts", posts);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.postWrapper}>
            <Image
              source={{ uri: item.photo }}
              style={{ width: 343, height: 240 }}
            />
            <View style={{ marginTop: 8, marginBottom: 10 }}>
              <Text style={styles.title}>{item.title}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={{ marginRight: 8 }}>
                <Feather
                  name='message-circle'
                  size={24}
                  color='rgba(189, 189, 189, 1)'
                  onPress={() => navigation.navigate("Comments")}
                />
              </View>
              <View>
                <Text>0</Text>
              </View>
              <View style={{ marginLeft: 53 }}>
                <Feather
                  name='map-pin'
                  size={24}
                  color='rgba(189, 189, 189, 1)'
                />
              </View>
              <View style={{ marginLeft: 8, justifyContent: "center" }}>
                <Text
                  style={styles.locality}
                  onPress={() => navigation.navigate("Map")}
                >
                  {item.locality}
                </Text>
              </View>
            </View>
          </View>
        )}
      />
      {/* <Button title='go to map' onPress={() => navigation.navigate("Map")} /> */}
      {/* <Button
        title='go to comments'
        onPress={() => navigation.navigate("Comments")}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // paddingHorizontal: 16,
    justifyContent: "center",
  },
  postWrapper: {
    // justifyContent: "center",
    // alignItems: "center",
    // marginHorizontal: 16,
    width: 343,
    borderRadius: 8,
    marginTop: 20,
  },
  title: {
    fontFamily: "Roboto-Bold",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  locality: {
    fontFamily: "Roboto-Regular",
    fontSize: 20,
    lineHeight: 19,
    color: "#212121",
    textDecorationLine: "underline",
  },
});

export default HomeScreen;
