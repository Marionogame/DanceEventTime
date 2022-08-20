import React, { useState } from "react";
import { StyleSheet, Text, View, KeyboardAvoidingView, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

//Navigation
import { StackActions } from "@react-navigation/native";

//Asset
import Logo from "../assets/logo.png";

//Components
import Button from "../components/Button";
import Input from "../components/Input";

//Constants
import FontScale from "../constants/FontScale";
import Theme from "../constants/Theme";
import { WIDTH } from "../constants/Layout";

const ResetPassword = ({ navigation }) => {
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={Logo} style={styles.logo} />
      </View>
      <KeyboardAvoidingView style={styles.inputsContainer}>
        <Text style={styles.text}>Ingrese una nueva contraseña</Text>
        <Input
          label={"Contraseña"}
          placeholder={"Contraseña"}
          value={password}
          isPassword={true}
          onChange={(text) => setPassword(text)}
          onClear={() => {
            setPassword("");
          }}
        />
      </KeyboardAvoidingView>
      <View style={styles.buttonsContainer}>
        <Button>Restablecer Contraseña</Button>
        <View style={styles.textRow}>
          <TouchableOpacity
            onPress={() => {
              navigation.dispatch(StackActions.popToTop());
            }}>
            <Text style={styles.hyperLink}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: WIDTH * 0.048,
    backgroundColor: Theme.lightGray5,
  },
  logoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputsContainer: {
    flex: 1.5,
    justifyContent: "space-evenly",
  },
  buttonsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  logo: {
    height: FontScale.icon_192,
    width: FontScale.icon_192,
    resizeMode: "contain",
  },
  textRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: FontScale.medium_small,
    textAlign: "center",
  },
  hyperLink: {
    fontSize: FontScale.medium_small,
    color: Theme.blue,
  },
});

export default ResetPassword;
