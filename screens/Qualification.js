import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";

//Components
import Button from "../components/Button";
import DropDownPicker from "react-native-dropdown-picker";
import NewDropDown from "../components/NewDropDownMario";
import { chunk, filter, isEmpty } from "lodash";
//Constants
import FontScale from "../constants/FontScale";
import Theme from "../constants/Theme";
import { WIDTH } from "../constants/Layout";
import { HEIGHT } from "../constants/Layout";
const axios = require("axios");
DropDownPicker.setListMode("MODAL");
import Axios from "axios";
const Qualification = ({ navigation, dispatch, route, loginUser }) => {
  //states........................................
  //form data
  const [skills, setSkills] = useState("");
  const [coordination, setCoordination] = useState("");
  const [scenography, setScenography] = useState("");
  const [choreography, setChoreography] = useState("");
  const [creativity, setCreativity] = useState("");
  const [average, setAverage] = useState(0);
  const [publicationData, setPublicationData] = useState([]);
  const [changeData, setChangeData] = useState(0);
  const [saveData, setSaveData] = useState([]);
  const [qualificationNumbers, setQualificationNumbers] = useState([
    { key: 0, label: "0", value: 0 },
    { key: 1, label: "1", value: 1 },
    { key: 2, label: "2", value: 2 },
    { key: 3, label: "3", value: 3 },
    { key: 4, label: "4", value: 4 },
    { key: 5, label: "5", value: 5 },
    { key: 6, label: "6", value: 6 },
    { key: 7, label: "7", value: 7 },
    { key: 8, label: "8", value: 8 },
    { key: 9, label: "9", value: 9 },
    { key: 10, label: "10", value: 10 },
  ]);
  const changeGroup = async () => {
    if (changeData === publicationData.length - 1) {
      let dataAdd = [
        ...saveData,
        {
          group: publicationData[changeData].name,
          id_group: publicationData[changeData].id,
          skill: skills,
          coordination: coordination,
          scenography: scenography,
          choreography: choreography,
          creativity: creativity,
          average: average,
        },
      ];

      dataAdd.map(async (item, index) => {
        try {
          await Axios({
            method: "POST",
            url: "http://desktop-prfr4ko:3000/qualification",
            data: {
              skill: item.skill,
              coordination: item.coordination,
              scenography: item.scenography,
              choreography: item.choreography,
              creativity: item.creativity,
              id_group: item.id_group,
              id_judge: route.params[1][0].id,
            },
          }).then((res) => console.log(res.data));
        } catch (error) {
          console.log("(Error registrar ususario)", error);
        }
      });

      navigation.navigate("Publication");
    } else {
      let dataAdd = [
        ...saveData,
        {
          group: publicationData[changeData].name,
          id_group: publicationData[changeData].id,
          skill: skills,
          coordination: coordination,
          scenography: scenography,
          choreography: choreography,
          creativity: creativity,
          average: average,
        },
      ];

      setSaveData(dataAdd);
      setSkills("");
      setCoordination("");
      setScenography("");
      setChoreography("");
      setCreativity("");
      setAverage(0);
      setChangeData(changeData + 1);
    }
  };
  useEffect(() => {
    (async () => {
      let res = await axios.get("http://desktop-prfr4ko:3000/group");
      let { data } = res.data;
      let groupDat = data;

      const JudgeCorrrect = filter(groupDat, { id_event: route.params[0].id });
      setChangeData(0);
      setPublicationData(JudgeCorrrect);
    })();
  }, []);
  //Effect......................................................
  useEffect(() => {
    let total = skills + coordination + choreography + scenography + creativity;
    if (total > 0) {
      setAverage(total / 5);
    }
  }, [skills, coordination, choreography, scenography, creativity]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.screenTitle}>{route.params[0].nameEvent}</Text>

        <Text style={styles.companyName}>
          {"Calificado por: "}
          {loginUser.name}
        </Text>
      </View>
      <View style={styles.formContainer}>
        <KeyboardAvoidingView>
          <View style={styles.inputsContainer}>
            <View style={styles.header}>
              <Text style={styles.companyNameIN}>
                {isEmpty(publicationData) ? "esperando" : publicationData[changeData].category + ":  " + publicationData[changeData].name}
              </Text>
            </View>
            <NewDropDown
              search={false}
              label={"Destreza"}
              itemsArray={qualificationNumbers}
              setItemsArray={setQualificationNumbers}
              selectValue={skills}
              setSelectValue={setSkills}
            />
            <NewDropDown
              search={false}
              label={"Coordinación"}
              itemsArray={qualificationNumbers}
              setItemsArray={setQualificationNumbers}
              selectValue={coordination}
              setSelectValue={setCoordination}
            />
            <NewDropDown
              search={false}
              label={"Escenografia"}
              itemsArray={qualificationNumbers}
              setItemsArray={setQualificationNumbers}
              selectValue={scenography}
              setSelectValue={setScenography}
            />
            <NewDropDown
              search={false}
              label={"Coreografia"}
              itemsArray={qualificationNumbers}
              setItemsArray={setQualificationNumbers}
              selectValue={choreography}
              setSelectValue={setChoreography}
            />
            <NewDropDown
              search={false}
              label={"Creatividad"}
              itemsArray={qualificationNumbers}
              setItemsArray={setQualificationNumbers}
              selectValue={creativity}
              setSelectValue={setCreativity}
            />
            <View style={styles.totalContent}>
              <Text style={styles.totalText}>Promedio</Text>
              <Text style={styles.totalText}>{average}</Text>
            </View>
            <View style={styles.buttonStyle}>
              <Button
                onPress={() => {
                  changeGroup();
                }}>
                Calificar
              </Button>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FE4A49",
  },

  header: {
    paddingHorizontal: WIDTH * 0.036,
    alignItems: "center",
    marginBottom: HEIGHT * 0.01,
  },
  screenTitle: {
    fontSize: FontScale.superLarge,
    color: "#F4F4F8",

    fontWeight: "bold",
    borderBottomWidth: 2,
    borderColor: "#F4F4F8",
  },
  companyName: {
    fontSize: FontScale.large,
    color: "#F4F4F8",
  },
  companyNameIN: {
    fontWeight: "bold",
    borderBottomWidth: 2,
    borderColor: "#F4F4F8",
    fontSize: FontScale.large,
    color: "black",
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: "black",
  },
  dataContainer: {
    paddingVertical: HEIGHT * 0.01,
    paddingHorizontal: WIDTH * 0.036,
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
    backgroundColor: "#F4FFE8",
    paddingHorizontal: WIDTH * 0.036,

    flex: 3,
  },

  inputsContainer: {
    paddingTop: HEIGHT * 0.02,
    justifyContent: "space-evenly",
    backgroundColor: "#F4FFE8",
    height: HEIGHT * 0.9,
  },

  buttonStyle: {
    marginBottom: HEIGHT * 0.1,
    marginTop: HEIGHT * 0.02,
  },

  totalContent: {
    marginTop: HEIGHT * 0.012,
    height: HEIGHT * 0.13,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Theme.lightGray5,
    borderColor: Theme.primary,
    borderWidth: 2,
    borderRadius: WIDTH * 0.033,
  },
  totalText: {
    fontSize: FontScale.xLarge,
    fontWeight: "bold",
  },
});
function mapStateToProps({ user, userLogin }) {
  return { isLoggedIn: user, loginUser: userLogin };
}
export default connect(mapStateToProps)(Qualification);
