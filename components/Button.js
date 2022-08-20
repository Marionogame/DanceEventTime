import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

//Constants
import FontScale from "../constants/FontScale";
import { WIDTH } from "../constants/Layout";
import Theme from "../constants/Theme";

const Button = ({ children, onPress, disabled }) => {
  return (
    <TouchableOpacity style={[styles.container, { opacity: disabled ? 0.25 : 1 }]} onPress={onPress} disabled={disabled}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: Theme.primary,
    paddingVertical: WIDTH * 0.03,
    paddingHorizontal: WIDTH * 0.048,
    borderRadius: WIDTH * 0.06,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: FontScale.medium_large,
    color: Theme.white,
    textTransform: "capitalize",
  },
});

export default Button;
