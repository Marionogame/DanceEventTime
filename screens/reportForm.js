import React, { useState, useEffect } from "react";
import { Alert, StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, Card, Title, Paragraph } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { map, filter, reject, isEmpty, reverse, orderBy } from "lodash";
const axios = require("axios");
//Components

import Button from "../components/Button";

//Constants
import FontScale from "../constants/FontScale";
import Theme from "../constants/Theme";
import { WIDTH } from "../constants/Layout";
import { HEIGHT } from "../constants/Layout";

export default function reportForm({ navigation, route }) {
  const [numberOfWheels, setNumberOfWheels] = useState("");
  const [wheelsInfo, setWheelsInfo] = useState([]);
  const [totalUnit, setTotalunit] = useState("");

  //dropDown states
  const [maxNumberOfWheels, setMaxNumberOfWheels] = useState([]);
  const [sizeArry, setSizeArry] = useState([]);
  const [selectedCategorySize, setSelectedCategorySize] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  //utils states

  const [groupData, setGroupData] = useState([
    {
      groupName: "Nombre Grupo 1",
      score: [
        {
          judgedName: "Juez1",
          coordination: 5,
          scenography: 9,
          choreography: 10,
          creativity: 5,
          average: 9,
        },
        {
          judgedName: "Juez2",
          coordination: 6,
          scenography: 10,
          choreography: 10,
          creativity: 8,
          average: 9,
        },
        {
          judgedName: "Juez3",
          coordination: 6,
          scenography: 10,
          choreography: 10,
          creativity: 8,
          average: 9,
        },
        {
          judgedName: "Juez4",
          coordination: 6,
          scenography: 10,
          choreography: 10,
          creativity: 8,
          average: 9,
        },
      ],
    },
    {
      groupName: "Grupo2",
      score: [
        {
          judgedName: "Juez1",
          coordination: 5,
          scenography: 9,
          choreography: 10,
          creativity: 5,
          average: 9,
        },
        {
          judgedName: "Juez2",
          coordination: 6,
          scenography: 10,
          choreography: 10,
          creativity: 8,
          average: 9,
        },
        {
          judgedName: "Juez3",
          coordination: 6,
          scenography: 10,
          choreography: 10,
          creativity: 8,
          average: 9,
        },
        {
          judgedName: "Juez4",
          coordination: 6,
          scenography: 10,
          choreography: 10,
          creativity: 8,
          average: 9,
        },
      ],
    },
    {
      groupName: "Grupo3",
      score: [
        {
          judgedName: "Juez1",
          coordination: 5,
          scenography: 9,
          choreography: 10,
          creativity: 10,
          average: 5,
        },
        {
          judgedName: "Juez2",
          coordination: 6,
          scenography: 10,
          choreography: 10,
          creativity: 8,
          average: 3,
        },
        {
          judgedName: "Juez3",
          coordination: 6,
          scenography: 10,
          choreography: 10,
          creativity: 8,
          average: 5,
        },
        {
          judgedName: "Juez4",
          coordination: 6,
          scenography: 10,
          choreography: 10,
          creativity: 8,
          average: 10,
        },
      ],
    },
  ]);
  useEffect(() => {
    (async () => {
      let responsive2 = await axios.get("http://desktop-prfr4ko:3000/judge");
      let dataJudge = responsive2.data.data;
      let dataJudget = dataJudge;

      // setJudgetValue(dataJudget);
      let responsive3 = await axios.get("http://desktop-prfr4ko:3000/qualification");
      let dataJudge3 = responsive3.data.data;
      let dataQualification = dataJudge3;
      // setQualification(dataQualification);

      let responsive4 = await axios.get("http://desktop-prfr4ko:3000/group");
      let dataJudge4 = responsive4.data.data;
      let dataGroup = dataJudge4;

      // setGroupValue(dataGroup);

      const groupData = filter(dataGroup, { id_event: route.params.id });

      const finalValueData = groupData.map((Item, Index) => {
        const qualificationData = filter(dataQualification, { id_group: Item.id });
        const finalqualificationData = qualificationData.map((item, index) => {
          const judgetData = filter(dataJudget, { id: item.id_judge });
          return {
            judgedName: judgetData[0].judgeCode,
            coordination: item.coordination,
            scenography: item.scenography,
            choreography: item.scenography,
            creativity: item.creativity,
            skill: item.skill,
            average: 9,
          };
        });
        return {
          category: Item.category,
          groupName: Item.name,
          score: finalqualificationData,
        };
      });

      const finalValueDataOrder = orderBy(finalValueData, ["category"], ["asc"]);
      setGroupData(finalValueDataOrder);
    })();
  }, []);
  const individual = (groupData, index) => {
    let totalScore = 0;
    const data = groupData[index].score;
    const judgedNum = data.length;

    for (let items of data) {
      totalScore +=
        parseInt(items.skill) + parseInt(items.choreography) + parseInt(items.scenography) + parseInt(items.coordination) + parseInt(items.creativity);
    }

    return totalScore / judgedNum / 5;
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
  const renderListSelecionados = () => {
    if (isEmpty(groupData)) {
      const ListSelecionados = (
        <Card style={styles.cardContainer}>
          <Card.Title title="Cargando" />
        </Card>
      );
      return ListSelecionados;
    } else {
      const ListSelecionados = groupData.map((item, index) => (
        <Card key={index} style={styles.cardContainer}>
          <Card.Title title={item.category} style={styles.cardTitle} titleStyle={styles.cardTextTitle} />
          <Card.Content>
            <Title>{item.groupName}</Title>
            <FlatList
              data={item.score}
              renderItem={({ item }) => (
                <View style={styles.WellsInfoComponent}>
                  <View style={styles.formTitleContainer}>
                    <Text style={styles.CardTitle}>{item.judgedName}</Text>
                  </View>

                  <View style={styles.midleInfo}>
                    <View style={styles.midleCenteredView}>
                      <Text style={styles.infoTitle}>Creativividad:</Text>
                      <Text style={styles.infoText}>{item.creativity}</Text>
                    </View>
                    <View style={styles.midleCenteredView}>
                      <Text style={styles.infoTitle}>Coordinación:</Text>
                      <Text style={styles.infoText}>{item.coordination}</Text>
                    </View>
                    <View style={styles.midleCenteredView}>
                      <Text style={styles.infoTitle}>Escenografia:</Text>
                      <Text style={styles.infoText}>{item.scenography}</Text>
                    </View>
                    <View style={styles.midleCenteredView}>
                      <Text style={styles.infoTitle}>Coregrafia:</Text>
                      <Text style={styles.infoText}>{item.choreography}</Text>
                    </View>
                    <View style={styles.midleCenteredView}>
                      <Text style={styles.infoTitle}>Destreza:</Text>
                      <Text style={styles.infoText}>{item.skill}</Text>
                    </View>
                    <View style={styles.midleCenteredView}>
                      <Text style={styles.infoTitlee}>Promedio:</Text>
                      <Text style={styles.infoTextt}>
                        {(parseInt(item.skill) +
                          parseInt(item.choreography) +
                          parseInt(item.scenography) +
                          parseInt(item.coordination) +
                          parseInt(item.creativity)) /
                          5}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            />
            <View style={styles.totalContent}>
              <Text style={styles.totalText}>Total</Text>
              <Text style={styles.totalTextt}>{individual(groupData, index)}</Text>
            </View>
            <Paragraph>{item.groupName}</Paragraph>
          </Card.Content>
        </Card>
      ));

      return ListSelecionados;
    }
  };

  const onPressNext = () => {
    // const groupData = filter(groupValue, { id_event: route.params.id });
    // console.log("klk", groupData);
    // const finalValueData = groupData.map((Item, Index) => {
    //   const qualificationData = filter(qualification, { id_group: Item.id });
    //   const finalqualificationData = qualificationData.map((item, index) => {
    //     const judgetData = filter(judgetValue, { id: item.id_judge });
    //     return {
    //       judgedName: judgetData[0].judgeCode,
    //       coordination: item.coordination,
    //       scenography: item.scenography,
    //       choreography: item.scenography,
    //       creativity: item.creativity,
    //       skill: item.skill,
    //       average: 9,
    //     };
    //   });
    //   return {
    //     category: Item.category,
    //     groupName: Item.name,
    //     score: finalqualificationData,
    //   };
    // });
    // const finalValueDataOrder = orderBy(finalValueData, ["category"], ["asc"]);
    // setGroupData(finalValueDataOrder);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Text style={styles.screenTitle}>{route.params.nameEvent}</Text>
          <View style={styles.eventDescription}>
            <Text style={styles.descriptionLabel}>{"Descripcion:"}</Text>

            <Text style={styles.description}>{route.params.description}</Text>
          </View>
        </View>
        <View style={styles.dataContainer}>
          <View style={styles.data}>
            <Text style={styles.dataTitle}>Inicio: </Text>
            <Text style={styles.dataInfo}>{getTimeLabelTodayComplete(route.params.beginTime, false, false, true)}</Text>
          </View>
          <View style={styles.data}>
            <Text style={styles.dataTitle}>Cierre: </Text>
            <Text style={styles.dataInfo}>{getTimeLabelTodayComplete(route.params.finishTime, false, false, true)}</Text>
          </View>
        </View>
      </View>
      <ScrollView style={styles.formContainer} nestedScrollEnabled={true}>
        <KeyboardAvoidingView>
          <View style={styles.formTitleContainer}>
            <Text style={styles.formTitle}>Grupos</Text>
          </View>

          <View style={styles.inputsContainer}>
            <View>{renderListSelecionados()}</View>

            <View style={styles.NextButton}>
              <Button
                onPress={() => {
                  navigation.navigate("reportList");
                }}>
                Volver
              </Button>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: -HEIGHT * 0.2,
  },
  headerContainer: {
    paddingTop: HEIGHT * 0.05,
    backgroundColor: Theme.white,
  },
  header: {
    paddingHorizontal: WIDTH * 0.036,
    alignItems: "center",
    paddingBottom: HEIGHT * 0.02,
    borderBottomWidth: WIDTH * 0.003,
    borderColor: Theme.lightGray3,
    marginTop: HEIGHT * 0.036,
  },
  screenTitle: {
    fontSize: FontScale.xLarge,
    color: Theme.primary,
    fontWeight: "bold",
  },
  eventDescription: {
    marginTop: HEIGHT * 0.036,
    borderTopWidth: WIDTH * 0.003,
    borderColor: Theme.lightGray3,
  },
  descriptionLabel: {
    fontSize: FontScale.medium_large,
    fontWeight: "bold",
    color: Theme.primary,
  },
  description: {
    fontSize: FontScale.medium_large,
    color: Theme.black,
  },
  cardContainer: {
    marginVertical: HEIGHT * 0.003,
    borderColor: Theme.primary,
    borderWidth: 2,
    borderRadius: WIDTH * 0.02,
    backgroundColor: Theme.white,
  },
  cardTitle: {
    backgroundColor: Theme.lightGray5,
    borderColor: Theme.lightGray4,
    borderWidth: WIDTH * 0.003,
  },
  cardTextTitle: {
    color: Theme.primary,
  },
  WellsInfoComponent: {
    borderColor: Theme.black,
    borderWidth: 1,
    height: HEIGHT * 0.3,
    width: WIDTH * 0.8,
    marginBottom: HEIGHT * 0.01,
    marginHorizontal: WIDTH * 0.02,
    backgroundColor: Theme.lightGray5,
  },
  dataContainer: {
    paddingVertical: HEIGHT * 0.01,
    paddingHorizontal: WIDTH * 0.036,
    borderBottomWidth: WIDTH * 0.003,
    borderColor: Theme.lightGray3,
  },
  data: {
    flexDirection: "row",
  },
  dataTitle: {
    fontSize: FontScale.medium,
    color: Theme.primary,
    fontWeight: "bold",
  },
  dataInfo: {
    fontSize: FontScale.medium,
    color: Theme.black,
  },
  formContainer: {
    backgroundColor: Theme.white,
  },
  midleInfo: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  midleCenteredView: {
    width: WIDTH * 0.39,

    alignItems: "center",
    paddingVertical: WIDTH * 0.004,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  infoTitle: {
    fontSize: FontScale.medium,
    fontWeight: "bold",
    justifyContent: "center",
  },
  infoText: {
    fontSize: FontScale.medium,
    fontWeight: "bold",
    color: Theme.primary,
  },
  infoTitlee: {
    fontSize: FontScale.medium,
    fontWeight: "bold",
    justifyContent: "center",
    color: Theme.black,
  },
  infoTextt: {
    fontSize: FontScale.medium_large,
    fontWeight: "bold",
    color: "#008f39",
  },

  formTitleContainer: {
    marginBottom: WIDTH * 0.036,
    borderWidth: 1,
    borderColor: Theme.lightGray2,
    alignItems: "center",
    fontSize: FontScale.xLarge,
    backgroundColor: Theme.lightGray5,
  },
  formTitle: {
    paddingHorizontal: WIDTH * 0.036,
    fontSize: FontScale.large,
    color: Theme.primary,
    fontWeight: "bold",
  },
  CardTitle: {
    paddingHorizontal: WIDTH * 0.036,
    fontSize: FontScale.medium_large,
    color: Theme.primary,
    fontWeight: "bold",
  },
  inputsContainer: {
    paddingHorizontal: WIDTH * 0.036,
    backgroundColor: Theme.white,
    flex: 3,
    justifyContent: "space-evenly",
  },
  WellsComponentContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
  },

  NextButton: {
    marginVertical: WIDTH * 0.03,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  textStyle: {
    backgroundColor: "green",
    borderRadius: 50,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  totalContent: {
    marginVertical: HEIGHT * 0.025,
    height: HEIGHT * 0.1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Theme.lightGray5,
    borderColor: Theme.primary,
    borderWidth: 2,
    borderRadius: WIDTH * 0.033,
  },
  totalText: {
    color: Theme.primary,
    fontSize: FontScale.large,
    fontWeight: "bold",
  },
  totalTextt: {
    color: "#008f39",
    fontSize: FontScale.medium_large,
    fontWeight: "bold",
  },
});
