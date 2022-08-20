import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { splash } from "../assets/splash.png";
//Expo
import { Divider, Button, Card, Title, Paragraph, List } from "react-native-paper";
import { documentDirectory, readDirectoryAsync } from "expo-file-system";
import fontScale from "../constants/FontScale";
import Input from "../components/Input";
//Redux
import { connect } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// import AgoraUIKit from "agora-rn-uikit";
import { isEmpty, filter, reverse } from "lodash";
//Components

import ButtonComponent from "../components/Button";
//Constants
import FontScale from "../constants/FontScale";
import Theme from "../constants/Theme";
import { WIDTH, HEIGHT } from "../constants/Layout";
const axios = require("axios");

const EventForm = ({ navigation, dispatch, loginUser }) => {
  const [eventValue, setEventValue] = useState("");
  const [judgetValue, setJudgetValue] = useState("");
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
                        <List.Item title="Comenzara A las:" description={getTimeLabelTodayComplete(item.beginTime, false, false, true)} />
                      </View>
                      <View style={styles.listDate}>
                        <List.Item title="Terminara a las:" description={getTimeLabelTodayComplete(item.finishTime, false, false, true)} />
                      </View>
                    </View>
                    <Button icon="circle-outline" style={styles.buttonColorInactive} mode="contained">
                      En Espera
                    </Button>
                  </Card>
                </View>

                <Divider />
              </View>
            );
          } else {
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
                        <List.Item title="Comenzara A las:" description={getTimeLabelTodayComplete(item.beginTime, false, false, true)} />
                      </View>
                      <View style={styles.listDate}>
                        <List.Item title="Terminara a las:" description={getTimeLabelTodayComplete(item.finishTime, false, false, true)} />
                      </View>
                    </View>
                    <Button icon="circle-slice-8" mode="contained" style={styles.buttonColor} onPress={() => verifiUser(item)}>
                      Activo
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
  useEffect(() => {
    (async () => {
      let res = await axios.get("http://desktop-prfr4ko:3000/event");
      let { data } = res.data;
      let eventData = data;

      const reversefisrtVal = reverse(eventData);
      setEventValue(reversefisrtVal);

      let responsive2 = await axios.get("http://desktop-prfr4ko:3000/judge");
      let dataJudge = responsive2.data.data;
      let dataJudget = dataJudge;
      setJudgetValue(dataJudget);
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

      <Text style={styles.textTitle}>Eventos</Text>

      <ScrollView>{renderListSelecionados()}</ScrollView>
      <View style={styles.containerExit}>
        <ButtonComponent onPress={() => navigation.navigate("SignIn")}>Volver</ButtonComponent>
      </View>
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
export default connect(mapStateToProps)(EventForm);
