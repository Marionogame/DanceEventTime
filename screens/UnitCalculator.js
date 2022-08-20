import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { splash } from "../assets/splash.png";
//Expo

import { documentDirectory, readDirectoryAsync } from "expo-file-system";
import fontScale from "../constants/FontScale";
import Input from "../components/Input";
//Redux
import { connect } from "react-redux";

// import AgoraUIKit from "agora-rn-uikit";
import { isEmpty, filter, reverse } from "lodash";
//Components
import { Divider, Button, Card, Title, List } from "react-native-paper";

import ButtonComponent from "../components/Button";
//Constants
import FontScale from "../constants/FontScale";
import Theme from "../constants/Theme";
import { WIDTH, HEIGHT } from "../constants/Layout";
const axios = require("axios");

const HistoryEvent = ({ navigation, dispatch, loginUser }) => {
  const [eventValue, setEventValue] = useState("");

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
          <Text style={styles.textTitle}>Cargando...</Text>
          <Divider />
        </View>
      );
      return ListSelecionados;
    } else {
      const ListSelecionados = eventValue.map((item, index) => (
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
              <Button
                icon="arrow-right-drop-circle"
                onPress={() => {
                  navigation.navigate("StreamCam", item);
                }}
                style={styles.buttonColor}
                mode="contained">
                Iniciar
              </Button>
            </Card>
          </View>

          <Divider />
        </View>
      ));

      return ListSelecionados;
    }
  };
  useEffect(() => {
    (async () => {
      let res = await axios.get("http://desktop-prfr4ko:3000/event");
      let { data } = res.data;
      let eventData = data;

      const fisrtVal = filter(eventData, { id_user: loginUser.id });
      const reversefisrtVal = reverse(fisrtVal);
      setEventValue(reversefisrtVal);
    })();
  }, [eventValue]);

  return (
    <SafeAreaView style={styles.container}>
      {/* {videoCall ? <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} /> : null} */}
      <Text style={styles.textTitle}>Evento Guardados </Text>
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
  row: {
    flex: 1,
    flexDirection: "row",
  },
  buttonColor: {
    color: "green",
    backgroundColor: "green",
  },
  textTitle: {
    fontSize: FontScale.megaLarge,
    color: Theme.blue,
  },
  listDate: {
    width: WIDTH * 0.47,
  },
  textSubtitle: {
    fontSize: FontScale.medium_large,
    color: Theme.blue,
  },
  textSubtitleGroup: {
    fontSize: FontScale.medium_small,
    color: Theme.black,
  },
  textCenter: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
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
function mapStateToProps({ user, userLogin }) {
  return { isLoggedIn: user, loginUser: userLogin };
}
export default connect(mapStateToProps)(HistoryEvent);
