import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, KeyboardAvoidingView, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Redux
import { connect } from "react-redux";
import { userLogin } from "../redux/actions/userLogin";
const axios = require("axios");
//Asset
import Logo from "../assets/logo.png";
//Components
import CheckBox from "../components/CheckBox";
import ButtonContainer from "../components/Button";
import Input from "../components/Input";
import { Searchbar } from "react-native-paper";
//Constants
import FontScale from "../constants/FontScale";
import Theme from "../constants/Theme";
import { map, includes, filter, isEmpty } from "lodash";
import { WIDTH, HEIGHT } from "../constants/Layout";
import { Button } from "react-native-paper";
const SignIn = ({ navigation, dispatch }) => {
  const [selected, setSelected] = useState(false);
  const [username, setUsername] = useState("mario");
  const [password, setPassword] = useState("1234");

  const [eventValue, setEventValue] = useState("");
  const [errorSearch, setErrorSearch] = useState(false);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      let res = await axios.get("http://desktop-prfr4ko:3000/event");
      let { data } = res.data;
      let eventData = data;

      setEventValue(eventData);
      const storage = await AsyncStorage.getItem("credentials");
      if (storage) {
        const credentials = JSON.parse(storage);
        return credentials;
      } else {
        return null;
      }
    })().then((credentials) => {
      if (isMounted) {
        setUsername(credentials ? credentials.username : "");
        setPassword(credentials ? credentials.password : "");
        setSelected(credentials ? credentials.selected : "");
      }
    });
    return () => (isMounted = false);
  }, []);

  const handleSignIn = async () => {
    let res = await axios.get("http://desktop-prfr4ko:3000/user");
    let { data } = res.data;
    let valueData = [];
    let loginValue = map(data, (item) => {
      if (item.name === username && item.password === password) {
        valueData = item;
        setErrorSearch(false);
        return true;
      } else {
        setErrorSearch(true);
        return false;
      }
    });
    console.log(loginValue);
    if (includes(loginValue, true)) {
      await dispatch(userLogin(valueData));
    }
  };
  const checkJudge = () => {
    navigation.navigate("EventForm");
    // const fisrtVal = filter(eventValue, { eventCode: codeEvent });
    // if (!isEmpty(fisrtVal)) {
    //   navigation.navigate("StreamForm", fisrtVal);
    // } else {
    //   setErrorSearch(true);
    //   console.log("tamo lindo ");
    // }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={Logo} style={styles.logo} />
      </View>
      {errorSearch ? (
        <View style={styles.errorContent}>
          <Text style={styles.errorMessage}>{"Usuario Incorrecto"}</Text>
        </View>
      ) : null}
      <KeyboardAvoidingView style={styles.inputsContainer}>
        <Input
          label={"Usuario"}
          placeholder={"Email / Teléfono"}
          value={username}
          onChange={(text) => setUsername(text)}
          onClear={() => {
            setUsername("");
          }}
        />

        <Input
          label={"Contraseña"}
          placeholder={"Contraseña"}
          value={password}
          onChange={(text) => setPassword(text)}
          onClear={() => {
            setPassword("");
          }}
          isPassword={true}
        />
        <View style={styles.row}>
          <CheckBox selected={selected} onPress={() => setSelected(!selected)}>
            <Text style={styles.text}>Recordarme</Text>
          </CheckBox>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ForgotPassword");
            }}>
            <Text style={styles.hyperLink}>¿Olvidaste tu Contraseña?</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      <View style={styles.buttonsContainer}>
        <ButtonContainer onPress={() => handleSignIn()}>Iniciar Sessión</ButtonContainer>

        <Button icon="arrow-right-circle-outline" mode="contained" onPress={() => checkJudge()}>
          Entrar Como Invitado
        </Button>

        <View style={styles.textRow}>
          <Text style={styles.text}>¿No Tienes Cuenta?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}>
            <Text style={styles.hyperLink}> Regístrate</Text>
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
    flex: 1,
    justifyContent: "space-evenly",
  },
  buttonsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  logo: {
    height: FontScale.icon_288,
    width: FontScale.icon_288,
    resizeMode: "contain",
  },
  titleText: {
    fontSize: FontScale.xLarge,
    fontWeight: "700",
  },
  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: FontScale.medium_small,
  },
  hyperLink: {
    fontSize: FontScale.medium_small,
    color: Theme.blue,
  },
  containerSearchBar: {
    width: "100%",
    height: HEIGHT * 0.056,
    display: "flex",
    marginBottom: HEIGHT * 0.024,
  },
  errorContent: {
    marginLeft: WIDTH * 0.025,
    marginBottom: HEIGHT * 0.025,
  },
  errorMessage: {
    color: Theme.red,
    fontWeight: "bold",
    fontSize: FontScale.small,
  },
});

export default connect()(SignIn);
