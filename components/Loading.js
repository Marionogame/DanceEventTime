import React from "react";
import { Text, StyleSheet, ActivityIndicator } from "react-native";
import { Dialog, Portal } from "react-native-paper";

//Constants
import { WIDTH, HEIGHT } from "../constants/Layout";
import FontScale from "../constants/FontScale";
import Theme from "../constants/Theme";

const Loading = ({ isFetching }) => {
  return (
    <Portal>
      <Dialog dismissable={false} visible={isFetching} style={styles.loadingModal}>
        <Dialog.Content style={styles.content}>
          <ActivityIndicator size={"large"} style={styles.loadingSpinner} color={Theme.black} />
          <Text style={styles.loadingText}>{"Cargando..."}</Text>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  loadingText: {
    fontSize: FontScale.medium_large,
    color: Theme.black,
    paddingHorizontal: WIDTH * 0.024,
    paddingBottom: HEIGHT * 0.014,
    textAlign: "center",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: WIDTH * 0.019,
    paddingBottom: HEIGHT * 0.011,
    paddingTop: HEIGHT * 0.011,
  },
  loadingSpinner: {
    color: Theme.blue,
    padding: WIDTH * 0.024,
  },
  loadingModal: {
    width: WIDTH * 0.4,
    backgroundColor: Theme.white,
    borderWidth: 1,
    borderRadius: WIDTH * 0.04,
    borderColor: Theme.white,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    zIndex: 2,
  },
});

export default Loading;
