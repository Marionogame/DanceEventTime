import React from "react";
import { StyleSheet, View } from "react-native";
import { Checkbox, RadioButton } from "react-native-paper";

//Constants
import Theme from "../constants/Theme";

const CheckBox = ({ children, selected, onPress, radio = false }) => {
  const status = selected ? "checked" : "unchecked";
  if (radio) {
    return (
      <View style={styles.row}>
        <RadioButton.Android status={status} color={Theme.blue} onPress={onPress} />
        {children}
      </View>
    );
  }

  return (
    <View style={styles.row}>
      <Checkbox.Android status={status} color={Theme.blue} onPress={onPress} />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default CheckBox;
