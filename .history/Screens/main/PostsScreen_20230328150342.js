import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../nestedScreens/HomeScreen";

// const PostsScreen = ({ route }) => {
//   const [posts, setPosts] = useState([]);
//   console.log("route.params", route.params);

//   useEffect(() => {
//     if (route.params && route.params.photo) {
//       setPosts((prevState) => [...prevState, route.params]);
//     }
//   }, [route.params]);

//   console.log("posts", posts);

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={posts}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={({ item }) => (
//           <View
//             style={{
//               marginBottom: 10,
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             <Image
//               source={{ uri: item.photo }}
//               style={{ width: 300, height: 200 }}
//             />
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // alignItems: "center",
//     justifyContent: "center",
//   },
// });

// export default PostsScreen;

const NestedScreen = createStackNavigator();

const PostsScreen = () => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen name='Home' component={HomeScreen} />
      {/* <NestedScreen.Screen name="" component={}/>
  <NestedScreen.Screen name="" component={}/> */}
    </NestedScreen.Navigator>
  );
};

export default PostsScreen;
