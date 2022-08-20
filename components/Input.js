import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from "react-native";
import { isEmpty } from "lodash";

//Expo
import { MaterialCommunityIcons } from "@expo/vector-icons";

//Constants
import FontScale from "../constants/FontScale";
import { WIDTH } from "../constants/Layout";
import Theme from "../constants/Theme";

const Input = ({ label, placeholder, value, onChange, onClear, isPassword }) => {
  const [visible, setVisible] = useState(isPassword);
  return (
    <View>
      <View style={styles.labelContainer}>
        <Text style={styles.text}>{label}</Text>
      </View>
      <View style={styles.container}>
        <TextInput style={styles.input} placeholder={placeholder} value={value} onChangeText={onChange} secureTextEntry={visible} />
        {!isEmpty(value) && (
          <TouchableOpacity style={styles.button} onPress={onClear}>
            <MaterialCommunityIcons name={"close-circle-outline"} size={FontScale.icon_25} color={Theme.darkGray} />
          </TouchableOpacity>
        )}
        {isPassword && (
          <TouchableOpacity style={styles.button} onPress={() => setVisible(!visible)}>
            <MaterialCommunityIcons name={visible ? "eye-off" : "eye"} size={FontScale.icon_25} color={Theme.darkGray} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    paddingLeft: WIDTH * 0.048,
    paddingRight: WIDTH * 0.012,
    borderRadius: WIDTH * 0.06,
    zIndex: 0,
  },
  labelContainer: {
    alignSelf: "flex-start",
    marginLeft: WIDTH * 0.06,
    marginBottom: -WIDTH * 0.024,
    paddingHorizontal: WIDTH * 0.018,
    backgroundColor: Theme.lightGray5,
    zIndex: 1,
  },
  text: {
    color: Theme.darkGray,
    fontSize: FontScale.medium_small,
    textTransform: "capitalize",
  },
  input: {
    flex: 1,
    fontSize: FontScale.medium,
    paddingVertical: WIDTH * 0.036,
  },
  button: {
    padding: WIDTH * 0.024,
  },
});

export default Input;
