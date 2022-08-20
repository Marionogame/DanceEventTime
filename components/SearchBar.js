import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { isEmpty } from "lodash";

//Expo
import { MaterialCommunityIcons } from "@expo/vector-icons";

//Constants
import FontScale from "../constants/FontScale";
import { WIDTH } from "../constants/Layout";
import Theme from "../constants/Theme";

const SearchBar = ({ placeholder, value, onChangeText, onClear }) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <MaterialCommunityIcons style={styles.icon} name={"magnify"} size={FontScale.icon_25} color={Theme.darkGray} />
        <TextInput style={styles.input} placeholder={placeholder} placeholderTextColor={Theme.darkGray} value={value} />
        {!isEmpty(value) && (
          <TouchableOpacity style={styles.button} onPress={onClear}>
            <MaterialCommunityIcons name={"close-circle-outline"} size={FontScale.icon_25} color={Theme.darkGray} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    flexDirection: "row",
    backgroundColor: Theme.lightGray4,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: Theme.lightGray4,
    alignItems: "center",
  },
  icon: {
    paddingVertical: WIDTH * 0.012,
    paddingLeft: WIDTH * 0.03,
    paddingRight: WIDTH * 0.024,
  },
  input: {
    flex: 1,
    fontSize: FontScale.medium,
  },
  button: {
    paddingHorizontal: WIDTH * 0.024,
  },
});

export default SearchBar;
