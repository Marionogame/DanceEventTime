import React, { useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

//Redux
import { connect } from "react-redux";
import { validate } from "../redux/actions/user";

//Asset
import Logo from "../assets/logo.png";

//Components
import Button from "../components/Button";

//Constants
import FontScale from "../constants/FontScale";
import Theme from "../constants/Theme";
import { WIDTH } from "../constants/Layout";

const Validate = ({ navigation, dispatch }) => {
  // useEffect(() => {
  //   (async () => {
  //     await dispatch(validate(navigation.state.params.token));
  //   })();
  // }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={Logo} style={styles.logo} />
      </View>
      <View style={styles.inputsContainer}>
        <View>
          <Text>{"Email"}</Text>
          <Button>
            <Text>{"Reenviar"}</Text>
          </Button>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.textRow}>
          <TouchableOpacity
            onPress={() => {
              navigation.replace("SignIn");
            }}>
            <Text style={styles.hyperLink}>Volver al Inicio</Text>
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
    height: FontScale.icon_192,
    width: FontScale.icon_192,
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
});

export default connect()(Validate);
