import React, { useState, useRef } from "react";
import { View, StyleSheet, TouchableOpacity, Modal, Platform, StatusBar } from "react-native";

//Expo
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Camera } from "expo-camera";

//Constants
import { HEIGHT, WIDTH } from "../constants/Layout";
import FontScale from "../constants/FontScale";
import Theme from "../constants/Theme";
import { compressImage } from "../constants/Utils";

const CameraModal = ({ visible, onDismiss, onPictureTaken }) => {
  const [isReady, setReady] = useState(false);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [zoom, setZoom] = useState(0);

  const camera = useRef(null);

  const toggleFlash = () => {
    if (flashMode === Camera.Constants.FlashMode.off) {
      setFlashMode(Camera.Constants.FlashMode.on);
    } else if (flashMode === Camera.Constants.FlashMode.on) {
      setFlashMode(Camera.Constants.FlashMode.auto);
    } else if (flashMode === Camera.Constants.FlashMode.auto) {
      setFlashMode(Camera.Constants.FlashMode.off);
    }
  };

  const toggleCameraType = () => {
    if (cameraType === Camera.Constants.Type.back) {
      setCameraType(Camera.Constants.Type.front);
    } else {
      setCameraType(Camera.Constants.Type.back);
    }
  };

  const handlePicture = async () => {
    const photoData = await camera.current.takePictureAsync();
    const compressedImage = await compressImage(photoData.uri);
    onPictureTaken(compressedImage);
  };

  let flash = "";
  if (flashMode === Camera.Constants.FlashMode.on) {
    flash = "flash";
  } else if (flashMode === Camera.Constants.FlashMode.auto) {
    flash = "flash-auto";
  } else {
    flash = "flash-off";
  }

  return (
    <Modal visible={visible} onRequestClose={onDismiss} animationType={"slide"}>
      {Platform.OS === "ios" && <StatusBar barStyle="default" hidden={true} />}
      <View style={styles.container}>
        <Camera
          style={styles.camera}
          ref={camera}
          type={cameraType}
          flashMode={flashMode}
          zoom={zoom}
          onCameraReady={() => {
            setReady(true);
          }}
        />
        <View style={styles.topContainer}>
          <TouchableOpacity onPress={onDismiss}>
            <MaterialCommunityIcons name={"close"} size={FontScale.icon_35} color={Theme.white} />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleFlash}>
            <MaterialCommunityIcons name={flash} size={FontScale.icon_35} color={flashMode === Camera.Constants.FlashMode.off ? Theme.white : Theme.yellow} />
          </TouchableOpacity>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.invisible}>
            <MaterialCommunityIcons name={"camera-switch"} size={FontScale.icon_35} color={Theme.white} />
          </View>
          <TouchableOpacity onPress={handlePicture} disabled={!isReady}>
            <View style={styles.captureBtn} />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleCameraType}>
            <MaterialCommunityIcons name={"camera-switch"} size={FontScale.icon_35} color={Theme.white} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    height: HEIGHT,
    width: WIDTH,
    flex: 1,
    justifyContent: "space-between",
  },
  camera: {
    height: HEIGHT,
    width: WIDTH,
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: WIDTH * 0.036,
    paddingHorizontal: WIDTH * 0.048,
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: WIDTH * 0.036,
    paddingHorizontal: WIDTH * 0.048,
  },
  captureBtn: {
    width: HEIGHT * 0.07,
    height: HEIGHT * 0.07,
    borderWidth: 3,
    borderRadius: HEIGHT * 0.035,
    borderColor: Theme.white,
    alignItems: "center",
    justifyContent: "center",
  },
  invisible: {
    opacity: 0,
  },
});

export default CameraModal;
