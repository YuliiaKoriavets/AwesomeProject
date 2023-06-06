import React, { useState } from "react";
import {
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  View,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from "react-native";
import { useDispatch } from "react-redux";
import { authSignInUser } from "../../../redux/auth/authOperations";

const intialState = {
  userEmail: "",
  password: "",
};

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [inputStates, setInputStates] = useState({
    input1: false,
    input2: false,
  });
  const [state, setState] = useState(intialState);

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
    setState(intialState);
    dispatch(authSignInUser(state));
  };

  const handleKeyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handleKeyboardHide}>
      <ImageBackground
        source={require("../../../assets/images/background-2.png")}
        style={styles.image}
      >
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : ""}>
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
            <Text style={styles.title}>Log in</Text>

            <TextInput
              style={[styles.input, inputStates.input1 && styles.inputFocused]}
              onFocus={() => handleFocus("input1")}
              onBlur={() => handleBlur("input1")}
              onChangeText={(value) => {
                setState((prevState) => ({ ...prevState, userEmail: value }));
              }}
              placeholder="Email"
              placeholderTextColor={"#BDBDBD"}
              value={state.userEmail}
            />

            <View style={{ ...styles.passwordContainer }}>
              <TextInput
                style={[
                  styles.input,
                  inputStates.input2 && styles.inputFocused,
                ]}
                onFocus={() => handleFocus("input2")}
                onBlur={() => handleBlur("input2")}
                onChangeText={(value) => {
                  setState((prevState) => ({ ...prevState, password: value }));
                }}
                placeholder="Password"
                placeholderTextColor={"#BDBDBD"}
                secureTextEntry={!showPassword}
                value={state.password}
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
              <Text style={styles.textBtn}>Log in</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("Registration")}
            >
              <Text style={styles.text}>Don't have an account? Sign up</Text>
            </TouchableOpacity>
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
  title: {
    marginTop: 32,
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

export default LoginScreen;
