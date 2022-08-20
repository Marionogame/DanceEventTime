import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { Dialog, Portal } from "react-native-paper";
import { isString } from "lodash";

//Expo
import { MaterialCommunityIcons } from "@expo/vector-icons";

//Constants
import { WIDTH, HEIGHT } from "../constants/Layout";
import FontScale from "../constants/FontScale";
import Theme from "../constants/Theme";

const NotificationDialog = ({ visible, onPress, text, isError }) => {
  return (
    <Portal>
      <Dialog onDismiss={onPress} visible={visible} style={styles.container}>
        <Dialog.Content style={styles.content}>
          <MaterialCommunityIcons
            style={styles.icon}
            name={isError ? "alert" : "check-decagram"}
            size={FontScale.icon_45}
            color={isError ? Theme.red : Theme.green}
          />
          {isString(text) && <Text style={styles.text}>{text}</Text>}
        </Dialog.Content>
        <Dialog.Actions>
          <TouchableOpacity onPress={onPress} style={[styles.button, { backgroundColor: isError ? Theme.red : Theme.green }]}>
            <Text style={styles.buttonText}>Cerrar</Text>
          </TouchableOpacity>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 2,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: WIDTH * 0.019,
    paddingBottom: HEIGHT * 0.011,
    paddingTop: HEIGHT * 0.011,
  },
  icon: {
    padding: WIDTH * 0.024,
  },
  text: {
    paddingVertical: HEIGHT * 0.007,
    fontSize: FontScale.medium,
    textAlign: "center",
  },
  button: {
    paddingVertical: HEIGHT * 0.014,
    marginVertical: 0,
    marginHorizontal: 0,
    borderRadius: 4,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: FontScale.medium,
    color: Theme.white,
  },
});

export default NotificationDialog;
