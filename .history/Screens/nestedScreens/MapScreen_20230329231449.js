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

import MapView, { Marker } from "react-native-maps";

const MapScreen = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          longitude: "35.0214723",
          latitude: "48.4648891",
          longitudeDelta: "0.001",
          latitudeDelta: "0.006",
        }}
      >
        {/* <Marker
          coordinate={{
            longitude: "",
            latitude: "",
          }}
        /> */}
      </MapView>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
};

export default MapScreen;
