import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

//Expo
import { documentDirectory, readDirectoryAsync } from "expo-file-system";

//Redux
import { connect } from "react-redux";
import { logout } from "../redux/actions/user";

//Components
import Button2 from "../components/Button";
import { Button } from "react-native-paper";
//Constants
import FontScale from "../constants/FontScale";
import Theme from "../constants/Theme";
import { WIDTH } from "../constants/Layout";

const EventCode = ({ navigation, dispatch, route }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textTitle}>{"Tu codigo de Evento"}</Text>
      {console.log(route.params)}
      <Button style={styles.buttonCode} mode="outlined" onPress={() => console.log("Pressed")}>
        {route.params}
      </Button>
      <Button2
        onPress={() => {
          navigation.navigate("HistoryEvent");
        }}>
        {"Continuar"}
      </Button2>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: WIDTH * 0.036,
    backgroundColor: Theme.lightGray4,
    justifyContent: "center",
    alignItems: "center",
  },
  textTitle: {
    fontSize: FontScale.megaLarge,
    color: Theme.blue,
  },
  buttonCode: {
    fontSize: FontScale.megaLarge,
    marginBottom: 20,
    marginTop: 20,
  },
});

export default connect()(EventCode);
