import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ImageBackground, Image, Modal, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
//Expo
import imageReloj from "../assets/imageReloj.jpg";
import Fondo from "../assets/Fondo.png";
//Redux
import TitleLogo from "../assets/Title.png";
import { connect } from "react-redux";
import { Video } from "expo-av";
// import AgoraUIKit from "agora-rn-uikit";

import { Avatar, Card, Title, Paragraph, Divider } from "react-native-paper";

//Components
import Button from "../components/Button";
import ButtonComponent from "../components/Button";
import { chunk, filter, isEmpty } from "lodash";
import { Buffer } from "buffer";
//Constants

import FontScale from "../constants/FontScale";
import Theme from "../constants/Theme";
import { WIDTH, HEIGHT } from "../constants/Layout";
const axios = require("axios");

const StreamForm = ({ navigation, dispatch, route }) => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [publicationData, setPublicationData] = useState([]);
  const [name, setName] = useState("");
  const [institution, setInstitution] = useState("");
  const [occupation, setOccupation] = useState("");
  const [description, setDescription] = useState("");
  const [dataImage, setdataImage] = useState("");
  const [open, setOpen] = useState(false);
  const handleExit = () => {
    navigation.navigate("SignIn");
  };
  useEffect(() => {
    (async () => {
      let res = await axios.get("http://desktop-prfr4ko:3000/user");
      let { data } = res.data;
      let userData = data;

      let responsive = await axios.get("http://desktop-prfr4ko:3000/judge");
      let dataJudge = responsive.data.data;

      const JudgeCorrrect = filter(dataJudge, { Id_event: route.params.id });
      let contData = [];
      userData.map(async (item, index) => {
        for (var i = 0; i < JudgeCorrrect.length; i++) {
          if (JudgeCorrrect[i].id_user === item.id) {
            contData = [...contData, item];
          }
        }
      });

      let DataPublication = [];

      // console.log(contData);
      for (var i = 0; i < contData.length; i++) {
        let newImg = await ApiImage(contData[i]);
        DataPublication = [
          ...DataPublication,
          {
            description: contData[i].description,
            email: contData[i].email,
            id: contData[i].id,
            image: newImg,
            institution: contData[i].institution,
            name: contData[i].name,
            occupation: contData[i].occupation,
            password: contData[i].password,
            phone: contData[i].phone,
          },
        ];
        // console.log("texto", DataPublication);
      }

      setPublicationData(DataPublication);
    })();
  }, []);
  const ApiImage = async (userData) => {
    let URL = `http://desktop-prfr4ko:3000/todoi/${userData.image}`;
    // var aFileParts = ['<a id="a"><b id="b">hey!</b></a>'];
    // var data = new Blob(aFileParts, { type: "text/html" });
    let res = await axios.get(URL, { responseType: "arraybuffer" });
    let raw = Buffer.from(res.data).toString("base64");
    return "data:" + res.headers["content-type"] + ";base64," + raw;
  };
  const renderListSelecionados = () => {
    if (isEmpty(publicationData)) {
      return <Text>{"Cargando..."}</Text>;
    } else {
      const divicion = publicationData.length * 0.5;

      const num = Math.round(divicion);
      const updAvatar = chunk(publicationData, num);

      const ListSelecionados1 = updAvatar[0].map((item, index) => (
        <TouchableOpacity onPress={() => modalOpen(item)}>
          <Avatar.Image size={100} source={{ uri: item.image }} />

          <Paragraph style={styles.textSubtitleColor}>{item.name}</Paragraph>
        </TouchableOpacity>
      ));
      let ListSelecionados2 = [];
      if (publicationData.length !== 1) {
        ListSelecionados2 = updAvatar[1].map((item, index) => (
          <TouchableOpacity onPress={() => modalOpen(item)}>
            <Avatar.Image size={100} source={{ uri: item.image }} />

            <Paragraph style={styles.textSubtitleColor}>{item.name}</Paragraph>
          </TouchableOpacity>
        ));
      }

      return (
        <View>
          <View style={styles.rowCategory}>{ListSelecionados1}</View>
          {publicationData.length !== 1 && <View style={styles.rowCategory}>{ListSelecionados2}</View>}
        </View>
      );
    }
  };
  const modalOpen = (item) => {
    setName(item.name);
    setInstitution(item.institution);
    setOccupation(item.occupation);
    setDescription(item.description);
    setdataImage(item.image);
    setOpen(true);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={Fondo} style={{ width: "100%", height: "100%" }}>
        <View style={styles.titleStylesContainer}>
          <Text style={styles.textTitleName}>{route.params.nameEvent}</Text>
        </View>

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

        <View style={styles.buttons}>
          <Button onPress={() => navigation.goBack()}>Salir</Button>
        </View>
        <Text style={styles.textTitle}>Jueces</Text>
        <View>{renderListSelecionados()}</View>

        <Modal
          animationType="fade"
          transparent={true}
          visible={open}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}>
          <View style={styles.cardStylesContainer}>
            <Card style={styles.modalStyles}>
              <Card.Content style={styles.cardStyles}>
                <Avatar.Image size={100} source={{ uri: dataImage }} />
                <Divider />
                <Title>{name}</Title>
                <Paragraph style={styles.textSubtitle}>Institución </Paragraph>
                <Text style={styles.textSubtitleGroup}>{institution}</Text>
                <Paragraph style={styles.textSubtitle}>Ocupación</Paragraph>
                <Text style={styles.textSubtitleGroup}>{occupation}</Text>
                <Paragraph style={styles.textSubtitle}>Descripción</Paragraph>
                <Text style={styles.textSubtitleGroup}>{description}</Text>
              </Card.Content>

              <Card.Actions>
                <Button onPress={() => setOpen(false)}>Cancel</Button>
              </Card.Actions>
            </Card>
          </View>
        </Modal>
        <Modal animationType="fade" transparent={true} visible={false}>
          <View>
            <Card style={styles.modalStyles2}>
              <Title style={styles.textSubtitle}>{"TIEMPO AGOTADO"}</Title>
              <Card.Cover source={imageReloj} />
              <Card.Content style={styles.cardStyles}>
                <Divider />

                <Paragraph style={styles.textSubtitleGroup}>
                  El tiempo de invitado ha terminado, registrarse para poder ver nuestro streaming si limite de tiempo o vuelva mas tarde dentro de 2 horas.
                </Paragraph>
              </Card.Content>

              <Card.Actions>
                <Button onPress={() => navigation.navigate("SignIn")}>Volver</Button>
              </Card.Actions>
            </Card>
          </View>
        </Modal>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: HEIGHT * 1,

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
  cardStyles: {
    justifyContent: "space-around",
    flexDirection: "column",
    marginTop: 10,
    alignItems: "center",
  },
  textSubtitleGroup: {
    fontSize: FontScale.medium_small,
    color: Theme.black,
  },
  textTitle: {
    fontSize: FontScale.megaLarge,
    color: Theme.blue,
    backgroundColor: Theme.darkGray5,
    textAlign: "center",
    marginTop: 30,
  },
  textSubtitleColor: {
    fontSize: FontScale.medium_large,
    color: Theme.white,
  },
  textTitleName: {
    fontSize: FontScale.megaLarge,
    color: Theme.blue,
    backgroundColor: Theme.darkGray5,
    textAlign: "center",
    marginTop: 5,
    width: WIDTH * 1,
  },
  modalStyles: {
    width: 220,
  },
  modalStyles2: {
    height: HEIGHT * 1,
  },
  cardStylesContainer: {
    justifyContent: "center",
    flexDirection: "column",
    marginTop: 10,
    alignItems: "center",
  },
  titleStylesContainer: {
    justifyContent: "center",
    flexDirection: "column",

    alignItems: "center",
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

  textSubtitle: {
    fontSize: FontScale.medium_large,
    color: Theme.blue,
  },
  textSubtitleGroup: {
    fontSize: FontScale.medium_small,
    color: Theme.black,
  },
  textSubtitleGroup: {
    fontSize: FontScale.medium_small,
    color: Theme.black,
  },
  buttonMargin: {
    marginTop: 15,
  },
});

export default connect()(StreamForm);
