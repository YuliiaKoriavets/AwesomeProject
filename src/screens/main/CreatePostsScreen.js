import React, { useState, useEffect } from "react";
import {
  TouchableWithoutFeedback,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  Keyboard,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import * as Location from "expo-location";

const CreatePostsScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");
  const [location, setLocation] = useState(null);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
  };

  const sendData = () => {
    navigation.navigate("Home", { photo });
    setTitle("");
    setPlace("");
  };

  const handleKeyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handleKeyboardHide}>
      <View style={styles.container}>
        <Camera style={styles.camera} ref={setCamera} type={CameraType.back}>
          {photo && (
            <View style={styles.photoContainer}>
              <Image source={{ uri: photo }} style={styles.photo} />
            </View>
          )}

          {!photo && (
            <TouchableOpacity
              style={styles.snapContainerBefore}
              onPress={takePhoto}
            >
              <MaterialIcons name="camera-alt" size={20} color="#BDBDBD" />
            </TouchableOpacity>
          )}

          {photo && (
            <TouchableOpacity
              style={styles.snapContainerAfter}
              onPress={() => {
                setPhoto(null);
              }}
            >
              <MaterialIcons name="camera-alt" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          )}
        </Camera>

        <Text style={styles.text}>
          {!photo ? "Upload photo" : "Edit photo"}
        </Text>

        <TextInput
          style={styles.input}
          onChangeText={(value) => {
            setTitle((prevState) => ({ ...prevState, value }));
          }}
          onFocus={() => {
            setIsShowKeyboard(true);
          }}
          placeholder="Title..."
          placeholderTextColor={"#BDBDBD"}
          value={title}
        />

        <View>
          <TextInput
            style={{ ...styles.input, marginLeft: 44 }}
            onChangeText={(value) => {
              setPlace((prevState) => ({ ...prevState, value }));
            }}
            onFocus={() => {
              setIsShowKeyboard(true);
            }}
            placeholder="Location..."
            placeholderTextColor={"#BDBDBD"}
            value={place}
          />

          <View style={{ position: "absolute", top: 15, left: 16 }}>
            <Feather name="map-pin" size={24} color="#BDBDBD" />
          </View>
        </View>

        <TouchableOpacity style={styles.sendBtn} onPress={sendData}>
          <Text style={styles.textSendBtn}>Publish</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  camera: {
    marginLeft: "auto",
    marginRight: "auto",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginTop: 32,
    height: 240,
    width: 343,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E8E8E8",
  },
  photoContainer: {
    position: "absolute",
    height: 240,
    width: 343,
    borderWidth: 1,
    borderRadius: 8,
  },
  photo: {
    height: 240,
    borderRadius: 8,
    width: Dimensions.get("window").width - 32,
  },
  snapContainerBefore: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "#FFFFFF",
  },
  snapContainerAfter: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "#ffffff4c",
    alignItems: "center",
    justifyContent: "center",
  },
  textWrapper: {
    marginBottom: 48,
  },
  text: {
    marginLeft: 16,
    marginTop: 8,
    marginBottom: 48,
    color: "#BDBDBD",
    fontSize: 16,
  },
  input: {
    marginBottom: 32,
    paddingBottom: 16,
    paddingTop: 16,
    marginHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    fontSize: 16,
  },
  sendBtn: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 27,
    marginBottom: 16,
    width: 343,
    height: 51,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    justifyContent: "center",
    alignItems: "center",
  },
  textSendBtn: {
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: "#FFFFFF",
  },
});

export default CreatePostsScreen;
