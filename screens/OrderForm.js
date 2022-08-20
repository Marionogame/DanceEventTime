import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView, Modal, Divider } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { splash } from "../assets/splash.png";
//Expo
import { Buffer } from "buffer";
import { Button, Card, Title, Paragraph, Searchbar } from "react-native-paper";
import { documentDirectory, readDirectoryAsync } from "expo-file-system";
import fontScale from "../constants/FontScale";
const axios = require("axios");
//Redux
import { connect } from "react-redux";
//Components
// import Button from "../components/Button";
import { isEmpty, filter, reverse } from "lodash";
//Constants
import FontScale from "../constants/FontScale";
import Theme from "../constants/Theme";
import { map } from "lodash";
import { WIDTH, HEIGHT } from "../constants/Layout";

const OrderForm = ({ navigation, dispatch, loginUser }) => {
  const [publicationData, setPublicationData] = useState("");
  const [codeEvent, setCodeEvent] = useState("");
  const [eventValue, setEventValue] = useState("");
  const [judgetValue, setJudgetValue] = useState("");
  const [errorSearch, setErrorSearch] = useState(false);
  const [open, setOpen] = useState(false);
  const [valueOpen, setValueOpen] = useState(false);
  useEffect(() => {
    (async () => {
      let responsive = await axios.get("http://desktop-prfr4ko:3000/event");
      let dataEvent = responsive.data.data;
      let eventData = dataEvent;
      let responsive2 = await axios.get("http://desktop-prfr4ko:3000/judge");
      let dataJudge = responsive2.data.data;
      let dataJudget = dataJudge;
      setJudgetValue(dataJudget);
      setEventValue(eventData);
      let res = await axios.get("http://desktop-prfr4ko:3000/publication");
      let { data } = res.data;
      let userData = data;

      let responsive3 = await axios.get("http://desktop-prfr4ko:3000/user");
      let dataJudge3 = responsive3.data.data;
      let dataUserData = dataJudge3;

      let DataPublication = [];
      for (var i = 0; i < userData.length; i++) {
        const newImg = await ApiImage(userData[i]);
        const filterValue = filter(dataUserData, { id: userData[i].id_user });

        DataPublication = [
          ...DataPublication,
          {
            text: userData[i].Text,
            id: userData[i].id,
            id_user: filterValue[0].name,
            image: newImg,
            title: userData[i].title,
            subTitle: userData[i].subTitle,
            dateBegin: userData[i].createdAt,
            id_user_id: filterValue[0].id,
          },
        ];
      }
      const reversefisrtVal = reverse(DataPublication);
      setPublicationData(reversefisrtVal);
    })();
  }, [publicationData]);
  const verifiUser = () => {
    const fisrtVal = filter(eventValue, { eventCode: codeEvent });
    if (!isEmpty(fisrtVal)) {
      // navigation.navigate("StreamForm", fisrtVal);
      const fisrtJudget = filter(judgetValue, { Id_event: fisrtVal[0].id });
      const fisrtJudgetUser = filter(fisrtJudget, { judgeCode: loginUser.name });
      if (!isEmpty(fisrtJudgetUser)) {
        navigation.navigate("Qualification");
      } else {
        navigation.navigate("StreamForm", fisrtVal);
      }
    } else {
      setErrorSearch(true);
    }
  };
  const verifiModal = (item) => {
    setOpen(true);
    setValueOpen(item);
  };
  const getTimeLabelTodayComplete = (time, dateOnly = false, hourOnly = false, both = false) => {
    const propTime = new Date(time);
    if (hourOnly)
      return propTime.toLocaleString("en-GB", {
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
      });
    else if (dateOnly) {
      return propTime.toLocaleDateString("en-GB", { date: "short" });
    } else {
      if (both)
        return propTime.toLocaleString("en-GB", {
          hour12: true,
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        });
      return propTime.toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      });
    }
  };
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
      const ListSelecionados = (
        <Card style={styles.cardContainer}>
          <Card.Title title="Cargando" />
        </Card>
      );
      return ListSelecionados;
    } else {
      const ListSelecionados = publicationData.map((item, index) => (
        <Card key={index} style={styles.cardContainer}>
          {item.id_user_id === loginUser.id ? (
            <View style={styles.rowNormal}>
              <Title style={styles.textTitleT}>{item.title} </Title>
              <Button
                labelStyle={item.amount === 2 ? { fontSize: HEIGHT * 0.024, color: "#DF0A0A" } : { fontSize: HEIGHT * 0.054 }}
                onPress={() => {
                  verifiModal(item);
                }}
                icon="minus-circle"
              />
            </View>
          ) : (
            <Title style={styles.textTitleT}>{item.title} </Title>
          )}
          <Card.Cover source={{ uri: item.image }} />
          <Card.Content>
            <Title style={styles.textTitle}>{item.subTitle}</Title>

            <Paragraph>{item.text}</Paragraph>
          </Card.Content>
          <View style={styles.rowC}>
            <Paragraph style={styles.textTitle}>{"----------------------------------------------------------------------------"}</Paragraph>
          </View>
          <View style={styles.row}>
            <Paragraph>{item.id_user}</Paragraph>

            <Paragraph>{getTimeLabelTodayComplete(item.dateBegin, false, false, true)}</Paragraph>
          </View>
        </Card>
      ));

      return ListSelecionados;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button icon="arrow-right-circle-outline" mode="contained" onPress={() => navigation.navigate("EventForm")}>
        Eventos
      </Button>
      {errorSearch ? (
        <View style={styles.errorContent}>
          <Text style={styles.errorMessage}>{"Codigo no Existe"}</Text>
        </View>
      ) : null}
      <Button
        icon="plus-circle"
        style={styles.buttonAction}
        onPress={() => {
          navigation.navigate("CreatePublication");
        }}>
        Agregar publicaciones de los usuario
      </Button>
      <Modal animationType="fade" transparent={true} visible={open}>
        <View style={styles.cardStylesContainer}>
          <Card style={styles.modalStyles}>
            <Card.Content style={styles.cardStyles}>
              <Title>{"Estas seguro que desea eliminar la publicacion"}</Title>
            </Card.Content>

            <Card.Actions>
              <Button onPress={() => setOpen(false)}>Cancelar</Button>
              <Button onPress={() => setOpen(false)}>Guardar</Button>
            </Card.Actions>
          </Card>
        </View>
      </Modal>
      <ScrollView>{renderListSelecionados()}</ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: WIDTH * 0.036,
    backgroundColor: "#F4FFE8",
    justifyContent: "space-evenly",
  },
  modalStyles: {
    width: 220,
  },
  cardStyles: {
    justifyContent: "space-around",
    flexDirection: "column",
    marginTop: 10,
    alignItems: "center",
  },
  cardStylesContainer: {
    justifyContent: "center",
    flexDirection: "column",
    marginTop: 10,
    alignItems: "center",
  },
  cardContainer: {
    marginBottom: HEIGHT * 0.029,
  },
  rowNormal: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textTitle: {
    color: Theme.blue,
  },
  textTitleT: {
    color: Theme.blue,
    padding: 5,
  },
  cardAction: {
    display: "flex",
    justifyContent: "flex-end",
  },
  containerSearchBar: {
    height: HEIGHT * 0.056,
    display: "flex",
    marginBottom: HEIGHT * 0.024,
  },
  errorContent: {
    marginLeft: WIDTH * 0.025,
    marginBottom: HEIGHT * 0.025,
  },
  errorMessage: {
    color: Theme.red,
    fontWeight: "bold",
    fontSize: FontScale.small,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
  },
  rowC: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
});
function mapStateToProps({ user, userLogin }) {
  return { isLoggedIn: user, loginUser: userLogin };
}
export default connect(mapStateToProps)(OrderForm);
