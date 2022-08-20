import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Text, Modal, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { splash } from "../assets/splash.png";
//Expo
import { Divider, Button, Card, Title, Paragraph, List, Avatar } from "react-native-paper";
import { documentDirectory, readDirectoryAsync } from "expo-file-system";
import fontScale from "../constants/FontScale";
import Input from "../components/Input";
//Redux
import { connect } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// import AgoraUIKit from "agora-rn-uikit";
import { isEmpty, filter, reverse, orderBy, flatten, includes, set } from "lodash";
//Components
import corona from "../assets/corona.jpg";
import ButtonComponent from "../components/Button";
//Constants
import FontScale from "../constants/FontScale";
import Theme from "../constants/Theme";
import { WIDTH, HEIGHT } from "../constants/Layout";
const axios = require("axios");

const reportList = ({ navigation, dispatch, loginUser }) => {
  const [eventValue, setEventValue] = useState("");
  const [judgetValue, setJudgetValue] = useState("");
  const [qualification, setQualification] = useState("");
  const [groupValue, setGoupValue] = useState("");
  const [open, setOpen] = useState(false);
  const [winer, setWiner] = useState([]);
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
  const winerGroup = (data) => {
    const judgetData = filter(judgetValue, { Id_event: data.id });
    const finishValue = judgetData.map((item, index) => {
      const qualificationData = filter(qualification, { id_judge: item.id });
      const groupValueData = qualificationData.map((Item, Index) => {
        const groupData = filter(groupValue, { id: Item.id_group });
        let plus = parseInt(Item.skill) + parseInt(Item.coordination) + parseInt(Item.scenography) + parseInt(Item.creativity) + parseInt(Item.choreography);
        return {
          datos: plus,
          GroupName: groupData[0].name,
          juez: item.judgeCode,
          category: groupData[0].category,
        };
      });
      return groupValueData;
    });
    const desFinishValue = flatten(finishValue);

    const finishValueUpd = finishValue[0].map((Item, Index) => {
      const qualificationData = filter(desFinishValue, { GroupName: Item.GroupName });
      let dataNumber = 0;
      let array = [];
      for (var i = 0; i < qualificationData.length; i++) {
        array = {
          GroupName: qualificationData[i].GroupName,
          category: qualificationData[i].category,
          datos: (dataNumber = dataNumber + qualificationData[i].datos),
          juez: qualificationData[i].juez,
        };
      }
      return array;
    });
    let cont = [];
    let jsonValue = [];
    for (var i = 0; i < finishValueUpd.length; i++) {
      if (!includes(cont, finishValueUpd[i].category)) {
        cont = [...cont, finishValueUpd[i].category];
        jsonValue = [...jsonValue, { category: finishValueUpd[i].category }];
      }
    }
    const finishEvery = jsonValue.map((Item, Index) => {
      const ValueData = filter(finishValueUpd, { category: Item.category });
      const categoryFinOrder = orderBy(ValueData, ["datos"], ["desc"]);
      return categoryFinOrder[0];
    });
    setWiner(finishEvery);

    setOpen(true);
  };
  const renderListSelecionados = () => {
    if (isEmpty(eventValue)) {
      const ListSelecionados = (
        <View>
          <Divider />
          <Text style={styles.textTitle}>Cargando</Text>
          <Divider />
        </View>
      );
      return ListSelecionados;
    } else {
      const ListSelecionados = eventValue.map((item, index) => {
        const dateJson = new Date(item.finishTime);
        var dateNow = new Date();

        if (dateNow <= dateJson) {
          if (!item.activeEvent) {
            return (
              <View key={index}>
                <Divider />
                <View style={styles.textCenter}>
                  <Text style={styles.textSubtitle}>{"------------------------------------------------------"}</Text>
                </View>
                <Divider />
                <View>
                  <Card>
                    <Card.Content>
                      <View style={styles.textCenter}>
                        <Title style={styles.textSubtitle}>{item.nameEvent}</Title>
                      </View>

                      <Text style={styles.textSubtitleGroup}>{item.description}</Text>
                    </Card.Content>
                    <View style={styles.row}>
                      <View style={styles.listDate}>
                        <List.Item title="Comenzara A Las:" description={getTimeLabelTodayComplete(item.beginTime, false, false, true)} />
                      </View>

                      <View style={styles.listDate}>
                        <List.Item title="Terminara A Las:" description={getTimeLabelTodayComplete(item.finishTime, false, false, true)} />
                      </View>
                    </View>

                    {/* {winerGroup(item)} */}

                    <Button icon="chess-king" style={styles.buttonColor} onPress={() => winerGroup(item)} mode="contained">
                      ganadores
                    </Button>
                    <View style={styles.textCenter}>
                      <Title style={styles.textSubtitle}>{"---------------------------"}</Title>
                    </View>
                    <Button icon="archive" style={styles.buttonColorInactive} onPress={() => navigation.navigate("reportForm", item)} mode="contained">
                      Ver Mas Informacion
                    </Button>
                  </Card>
                </View>

                <Divider />
              </View>
            );
          }
        } else {
          return null;
        }
      });

      return ListSelecionados;
    }
  };

  const renderListSelecion = () => {
    const ListSelecion = winer.map((item, index) => {
      return (
        <View key={index}>
          <Paragraph style={styles.textSubtitle}>
            {item.category}
            {":"}
          </Paragraph>
          <Text style={styles.textSubtitleGroup}>{item.GroupName}</Text>
        </View>
      );
    });

    return ListSelecion;
  };
  useEffect(() => {
    (async () => {
      let res = await axios.get("http://desktop-prfr4ko:3000/event");
      let { data } = res.data;
      let eventData = data;

      const reversefisrtVal = reverse(eventData);
      const filterValue = filter(reversefisrtVal, { id_user: loginUser.id });
      setEventValue(filterValue);

      let responsive2 = await axios.get("http://desktop-prfr4ko:3000/judge");
      let dataJudge = responsive2.data.data;
      let dataJudget = dataJudge;

      setJudgetValue(dataJudget);
      let responsive3 = await axios.get("http://desktop-prfr4ko:3000/qualification");
      let dataJudge3 = responsive3.data.data;
      let dataQualification = dataJudge3;
      setQualification(dataQualification);

      let responsive4 = await axios.get("http://desktop-prfr4ko:3000/group");
      let dataJudge4 = responsive4.data.data;
      let dataGroup = dataJudge4;
      setGoupValue(dataGroup);
    })();
  }, []);
  const verifiUser = (item) => {
    // navigation.navigate("StreamForm", fisrtVal);
    const fisrtJudget = filter(judgetValue, { Id_event: item.id });

    const fisrtJudgetUser = filter(fisrtJudget, { judgeCode: loginUser.name });
    if (!isEmpty(fisrtJudgetUser)) {
      let dataNew = [];
      dataNew[0] = item;
      dataNew[1] = fisrtJudgetUser;
      navigation.navigate("Qualification", dataNew);
    } else {
      navigation.navigate("StreamForm", item);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* {videoCall ? <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} /> : null} */}

      <Text style={styles.textTitle}>Reportes</Text>

      <ScrollView>{renderListSelecionados()}</ScrollView>
      <View style={styles.containerExit}>
        <ButtonComponent onPress={() => navigation.navigate("Settings")}>Volver</ButtonComponent>
      </View>
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
              <Avatar.Image size={100} source={corona} />
              <Divider />
              <Text style={styles.textTitle}>-----------------</Text>
              {/* <Title>{name}</Title> */}
              <ScrollView>{renderListSelecion()}</ScrollView>
            </Card.Content>

            <Card.Actions>
              <Button onPress={() => setOpen(false)}>Salir</Button>
            </Card.Actions>
          </Card>
        </View>
      </Modal>
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
  modalStyles: {
    width: 220,
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
  listDate: {
    width: WIDTH * 0.47,
  },
  textCenter: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  textTitle: {
    fontSize: FontScale.megaLarge,
    color: Theme.blue,
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
  buttonColor: {
    color: "green",
    backgroundColor: "green",
  },

  buttonColorInactive: {
    color: "#A2160F",
    backgroundColor: "#d2b202",
  },
  containerExit: {
    marginTop: 10,
  },
});
function mapStateToProps({ user, userLogin }) {
  return { isLoggedIn: user, loginUser: userLogin };
}
export default connect(mapStateToProps)(reportList);
