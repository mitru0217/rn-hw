const CreatePostsScreen = () => {
  const [camera, setCamera] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);

  const takePhoto = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      const photo = await camera.takePictureAsync();
      console.log("camera ---->", photo.uri);
    } catch (error) {
      console.log("takePhoto error", error);
    }
  };

  const onCameraReady = async () => {
    try {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
      if (status === "granted") {
        await camera.resumePreview();
      }
    } catch (error) {
      console.log("onCameraReady error", error);
    }
  };

  const onUnmount = async () => {
    if (camera) {
      await camera.pausePreview();
    }
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        ref={setCamera}
        onCameraReady={onCameraReady}
        onUnmount={onUnmount}
      >
        <TouchableOpacity style={styles.button} onPress={takePhoto}>
          <FontAwesome5
            name='camera'
            size={20}
            color='rgba(189, 189, 189, 1)'
          />
        </TouchableOpacity>
      </Camera>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "#E5E5E5",
  },
  camera: {
    height: 300,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 32,
    marginHorizontal: 16,
  },
  // buttonContainer: {
  //   alignItems: "center",
  //   justifyContent: "center",
  //   height: 300,

  //   backgroundColor: "#F6F6F6",
  //   borderWidth: 1,
  //   borderColor: "rgba(232, 232, 232, 1)",
  //   borderRadius: 8,
  // },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: "#FFFFFF",
  },
});

export default CreatePostsScreen;

// <View style={styles.container}>
//   <Camera style={styles.camera} ref={setSnap}>
//     <View style={styles.buttonContainer}>
//       <TouchableOpacity style={styles.button} onPress={takePhoto}>
//         <FontAwesome5
//           name='camera'
//           size={20}
//           color='rgba(189, 189, 189, 1)'
//         />
//       </TouchableOpacity>
//     </View>
//   </Camera>
// </View>

//разделяю useEffect на две части: первый запускается только при монтировании компонента и запрашивает разрешение
// на использование камеры, а второй запускается только тогда, когда camera и hasPermission установлены в своих состояниях.
// Это может помочь избежать ошибки Cannot read property 'current' of null.
