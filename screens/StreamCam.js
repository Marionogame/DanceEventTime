import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Text, ImageBackground, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
//Expo
import Fondo from "../assets/Fondo.png";
//Redux
import TitleLogo from "../assets/Title.png";
import { connect } from "react-redux";
import { Video } from "expo-av";
// import AgoraUIKit from "agora-rn-uikit";
import { Avatar } from "react-native-paper";
//Components
import Button from "../components/Button";
import ButtonComponent from "../components/Button";
import { chunk, filter, isEmpty } from "lodash";
import { Buffer } from "buffer";
//Constants
import { Camera } from "expo-camera";
import FontScale from "../constants/FontScale";
import Theme from "../constants/Theme";
import { WIDTH, HEIGHT } from "../constants/Layout";
import Axios from "axios";

const StreamCam = ({ navigation, dispatch, route }) => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [publicationData, setPublicationData] = useState([]);
  const [showData, setShowData] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const handleExit = async () => {
    const NombreImagen = {
      activeEvent: true,
    };

    if (showData) {
      const NombreImagen = {
        activeEvent: false,
      };
      await Axios.put(`http://desktop-prfr4ko:3000/event/${route.params.id}`, NombreImagen)
        .then((response) => response.data)
        .catch((error) => {
          console.log(error);
          throw error.response.data;
        });

      setShowData(false);
    } else {
      const NombreImagen = {
        activeEvent: true,
      };
      await Axios.put(`http://desktop-prfr4ko:3000/event/${route.params.id}`, NombreImagen)
        .then((response) => response.data)
        .catch((error) => {
          console.log(error);
          throw error.response.data;
        });

      setShowData(true);
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={Fondo} style={{ width: "100%", height: "100%" }}>
        <Text style={styles.textTitle}>{route.params.nameEvent}</Text>

        {showData ? (
          <Video
            ref={video}
            style={styles.video}
            source={{
              uri: "http://demo.unified-streaming.com/video/tears-of-steel/tears-of-steel.ism/.m3u8",
            }}
            useNativeControls
            resizeMode="contain"
            isLooping
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
        ) : null}
        <View style={styles.textCenter}>
          <Button
            style={styles.buttons}
            onPress={() => {
              handleExit();
            }}>
            {!showData ? "Comenzar Streaming" : " Detener streaming"}
          </Button>

          <Text style={styles.textSubtitle}>{"------------------------------------------------------------------------"}</Text>

          <Button
            onPress={() => {
              navigation.navigate("Publication");
            }}>
            Volver
          </Button>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#F4FFE8",
    justifyContent: "space-evenly",
  },
  rowCategory: {
    width: 380,
    justifyContent: "space-around",
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
  },
  textTitle: {
    fontSize: FontScale.megaLarge,
    color: Theme.blue,
    backgroundColor: Theme.darkGray5,
    textAlign: "center",
    marginTop: 30,
  },
  textCenter: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  textSubtitle: {
    fontSize: FontScale.medium_large,
    color: Theme.blue,
  },
  imageSize: {
    justifyContent: "center",

    alignItems: "center",
  },
  logo: {
    height: FontScale.icon_192,
    width: FontScale.icon_224,
    resizeMode: "contain",
  },
  video: {
    alignSelf: "center",
    width: 380,
    height: 260,
  },
  buttons: {
    marginTop: 30,
  },
  buttonsCont: {
    marginTop: 15,
  },
  textSubtitle: {
    fontSize: FontScale.medium_large,
    color: Theme.blue,
  },
  textSubtitleGroup: {
    fontSize: FontScale.medium_small,
    color: Theme.black,
  },
  buttonMargin: {
    marginTop: 15,
  },
});

export default connect()(StreamCam);
