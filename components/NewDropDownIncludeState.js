import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DropDownPicker from "react-native-dropdown-picker";

//Constants
import Theme from "../constants/Theme";
import FontScale from "../constants/FontScale";
import { WIDTH } from "../constants/Layout";
import { HEIGHT } from "../constants/Layout";

const NewDropDownIncludeState = ({ label, itemsArray, setItemsArray, onChangeData, selectValue, setSelectValue, search = true }) => {
  const [open, setOpen] = useState(false);
  // const [valueDropdown, setValueDropdown] = useState("");

  /* const [items, setItems] = useState(itemsArray); */

  return (
    <View>
      <View style={styles.dropDownLabel}>
        <Text style={styles.dropDownLabelText}>{label}</Text>
      </View>
      <DropDownPicker
        style={styles.dropDownBox}
        onChangeValue={(value) => {
          onChangeData(value);
        }}
        modalProps={{
          animationType: "slide",
        }}
        modalContentContainerStyle={{
          backgroundColor: Theme.white,
        }}
        size={500}
        zIndex={500}
        categorySelectable={true}
        searchable={search}
        open={open}
        value={selectValue}
        items={itemsArray}
        setOpen={setOpen}
        setValue={setSelectValue}
        setItems={setItemsArray}
        dropDownDirection="BOTTOM"
        textStyle={{ fontSize: FontScale.medium_large, paddingLeft: WIDTH * 0.024 }}
        selectedItemLabelStyle={{
          fontWeight: "bold",
          backgroundColor: Theme.lightGray5,
        }}
        listItemLabelStyle={{ fontSize: FontScale.medium_large }}
        placeholderStyle={{ color: Theme.lightGray }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropDownLabel: {
    alignSelf: "flex-start",
    marginLeft: WIDTH * 0.06,
    marginBottom: -WIDTH * 0.1,
    paddingHorizontal: WIDTH * 0.018,
    backgroundColor: "#F4FFE8",
    zIndex: 1000,

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dropDownLabelText: {
    color: Theme.darkGray2,
    fontWeight: "bold",
    fontSize: FontScale.medium,
    zIndex: 2000,
  },
  dropDownBox: {
    borderColor: Theme.black,
    height: HEIGHT * 0.085,
    marginTop: HEIGHT * 0.04,
    marginBottom: HEIGHT * 0.01,
    borderRadius: WIDTH * 0.06,
  },
});

export default NewDropDownIncludeState;
