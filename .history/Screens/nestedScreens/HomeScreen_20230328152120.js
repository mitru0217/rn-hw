import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Image, Button } from "react-native";

const HomeScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);
  console.log("route.params", route.params);

  useEffect(() => {
    if (route.params && route.params.photo) {
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
          <View
            style={{
              marginBottom: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: item.photo }}
              style={{ width: 300, height: 200 }}
            />
          </View>
        )}
      />
      <Button title='go to map' onPress={() => navigation.navigate("Map")} />
      <Button
        title='go to comments'
        onPress={() => navigation.navigate("Comments")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
