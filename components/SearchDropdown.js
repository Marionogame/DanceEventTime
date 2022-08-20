import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { map, concat, drop } from "lodash";
import { dataWheel } from "../punctureWheelData";
import { StyleSheet } from "react-native";

//Redux
import { connect } from "react-redux";
import { getSelectedCategory } from "../redux/actions/unitsCalculator";
import { getIsOpen } from "../redux/actions/unitsCalculator";

import fontScale from "../constants/FontScale";
import Theme from "../constants/Theme";
import { WIDTH } from "../constants/Layout";

const SearchDropdown = ({ arrayItems, title, dispatch, selectedCategory, isOpened }) => {
  //states
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);

  //effects
  useEffect(() => {
    setItems(arrayItems);
  }, []);

  useEffect(() => {
    if (selectedCategory == null) {
      setValue(selectedCategory);
    }
    /* */
  }, [selectedCategory]);

  return (
    <View style={styles.imputContainer}>
      <Text style={styles.h2}>{title}</Text>
      <DropDownPicker
        onChangeValue={(value) => {
          dispatch(getSelectedCategory(value));
        }}
        searchable={true}
        zIndex={3000}
        open={open}
        value={value}
        items={items}
        onOpen={() => {
          dispatch(getIsOpen(false));
        }}
        onClose={() => {
          dispatch(getIsOpen(null));
        }}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  h2: {
    fontSize: fontScale.medium_large,
    color: Theme.primary,
    fontWeight: "bold",
  },
  imputContainer: {
    marginTop: 20,
  },
});

function mapStateToProps({ unitsCalculator }) {
  return { selectedCategory: unitsCalculator.selectedCategory, isOpen: unitsCalculator.isOpened };
}
export default connect(mapStateToProps)(SearchDropdown);
