import React from "react";
import { View, Text, StyleSheet } from "react-native";

//Constants
import { WIDTH, HEIGHT } from "../constants/Layout";
import FontScale from "../constants/FontScale";
import Theme from "../constants/Theme";

const Tag = ({ children, containerStyle, textStyle }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.text, textStyle]}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: Theme.black,
    paddingVertical: HEIGHT * 0.007,
    paddingHorizontal: WIDTH * 0.024,
    borderRadius: WIDTH,
  },
  text: {
    fontSize: FontScale.small,
    fontWeight: "400",
  },
});

export default Tag;
