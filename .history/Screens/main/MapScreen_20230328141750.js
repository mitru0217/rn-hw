import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

import MapView from "react-native-maps";

const MapScreen = () => {
  <View style={styles.container}>
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        longitude: "",
        latitude: "",
        longitudeDelta: "",
        latitudeDelta: "",
      }}
    ></MapView>
  </View>;
};

const styles = {
  container: {
    flex: 1,
  },
};

export default MapScreen;
