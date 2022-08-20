import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

//Expo
import { documentDirectory, readDirectoryAsync } from "expo-file-system";

//Redux
import { connect } from "react-redux";
import { logout } from "../redux/actions/user";

//Components
import Button from "../components/Button";

//Constants
import FontScale from "../constants/FontScale";
import Theme from "../constants/Theme";
import { WIDTH } from "../constants/Layout";

const Settings = ({ navigation, dispatch }) => {
  const handleCheckD = async () => {
    const info = await readDirectoryAsync(documentDirectory);
    console.log(info);
  };

  const handleCheck = async () => {
    const info = await readDirectoryAsync(documentDirectory + "1/");
    console.log(info);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <Button onPress={handleCheckD}>Check Document Directory</Button> */}
      <Button
        onPress={() => {
          navigation.navigate("reportList");
        }}>
        Reportes
      </Button>
      <Button onPress={handleLogout}>Cerrar Sessión</Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: WIDTH * 0.036,
    backgroundColor: Theme.lightGray4,
    justifyContent: "space-evenly",
  },
});

export default connect()(Settings);
