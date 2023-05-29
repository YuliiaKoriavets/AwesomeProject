import React, { useState } from "react";
import {
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  View,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const intialState = {
  login: "",
  email: "",
  password: "",
}

const RegistrationScreen = () => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [inputStates, setInputStates] = useState({
    input1: false,
    input2: false,
    input3: false,
  });
  const [state, setState] = useState(intialState)

  const handleFocus = (inputName) => {
    setIsShowKeyboard(true);
    setInputStates((prevState) => ({
      ...prevState,
      [inputName]: true,
    }));
  };

  const handleBlur = (inputName) => {
    setInputStates((prevState) => ({
      ...prevState,
      [inputName]: false,
    }));
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setState(intialState)
  };

  const handleKeyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handleKeyboardHide}>
      <ImageBackground
        source={require("../../assets/images/background-2.png")}
        style={styles.image}
      >
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : ""}>
          <View style={styles.imgContainer}></View>
          <View
            style={{
              ...Platform.select({
                ios: {
                  ...styles.container,
                  paddingBottom: isShowKeyboard ? 32 : 144,
                },
                android: {
                  ...styles.container,
                  paddingBottom: isShowKeyboard ? 0 : 78,
                },
              }),
            }}
          >
            <Text style={styles.title}>Registration</Text>

            <TextInput
              style={[styles.input, inputStates.input1 && styles.inputFocused]}
              onFocus={() => handleFocus("input1")}
              onBlur={() => handleBlur("input1")}
              onChangeText={(value) => { setState((prevState) => ({ ...prevState, login: value })) }}
              placeholder="Login"
              placeholderTextColor={"#BDBDBD"}
              value={state.login}
            />

            <TextInput
              style={[styles.input, inputStates.input2 && styles.inputFocused]}
              onFocus={() => handleFocus("input2")}
              onBlur={() => handleBlur("input2")}
              onChangeText={(value) => { setState((prevState) => ({ ...prevState, email: value })) }}
              placeholder="Email"
              placeholderTextColor={"#BDBDBD"}
              value={state.email}
            />

            <View style={{ ...styles.passwordContainer }}>
              <TextInput
                style={[
                  styles.input,
                  inputStates.input3 && styles.inputFocused,
                ]}
                onFocus={() => handleFocus("input3")}
                onBlur={() => handleBlur("input3")}
                onChangeText={(value) => { setState((prevState) => ({ ...prevState, password: value })) }}
                placeholder="Password"
                placeholderTextColor={"#BDBDBD"}
                value={state.password}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={styles.showButton}
                onPress={toggleShowPassword}
              >
                <Text style={styles.showButtonText}>
                  {showPassword ? "Hide" : "Show"}
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.textBtn}>Sign up</Text>
            </TouchableOpacity>

            <Text style={styles.text}>Already have an account? Log in</Text>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  imgContainer: {
    position: "relative",
    top: "15%",
    left: "48%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    zIndex: 1,
  },
  title: {
    marginTop: 92,
    marginBottom: 33,
    fontWeight: 500,
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.01,
    color: "#212121",
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
    resizeMode: "cover",
  },
  input: {
    marginBottom: 16,
    padding: 16,
    width: 343,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    color: "#212121",
  },
  inputFocused: {
    borderColor: "#FF6C00",
  },
  passwordContainer: {
    position: "relative",
    flexDirection: "row",
  },
  showButton: {
    position: "absolute",
    top: "30%",
    right: "10%",
  },
  showButtonText: {
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
  button: {
    marginTop: 27,
    marginBottom: 16,
    width: 343,
    height: 51,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    justifyContent: "center",
    alignItems: "center",
  },
  textBtn: {
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: "#FFFFFF",
  },
  text: {
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
});

export default RegistrationScreen;
