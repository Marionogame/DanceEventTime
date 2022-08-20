import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Text, TextInput, TouchableHighlight } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { splash } from "../assets/splash.png";
//Expo
// import RenderDinamic from "../components/renderDinamic";
import { Divider } from "react-native-paper";
//Redux

import { connect } from "react-redux";
//Components
import { filter, reject, orderBy, slice, split, isEmpty } from "lodash";
import ButtonComponent from "../components/Button";
import { map, stubTrue } from "lodash";
import Axios from "axios";
import DropDownPicker from "react-native-dropdown-picker";
import { Button } from "react-native-paper";
const axios = require("axios");
import NewDropDownIncludeState from "../components/NewDropDownIncludeState";
//Constants
import FontScale from "../constants/FontScale";
import Theme from "../constants/Theme";
import { WIDTH, HEIGHT } from "../constants/Layout";
const CreateEventGroup = ({ navigation, dispatch, route, loginUser }) => {
  const [state, setState] = useState({});
  const [value, setValue] = useState([]);

  const [juez, setJuez] = useState("");
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState([]);

  const [qualificationNumbers, setQualificationNumbers] = useState([]);
  const onChange = (text, data, category, index) => {
    setState((prev) => ({
      ...prev,
      [data]: text,
      ["title" + index]: category,
    }));
  };
  const onChangeUser = (text, data) => {
    console.log(data, text);
    setState((prev) => ({
      ...prev,
      [data]: text,
    }));
  };
  const contNumber = (Index) => {
    const rejectValue = reject(userData, { id: Index });
    const finishValue = rejectValue.map((item, index) => {
      return { name: item.name, id: index + 1 };
    });

    setUserData(finishValue);
  };

  useEffect(() => {
    (async () => {
      let res = await axios.get("http://desktop-prfr4ko:3000/user");
      let { data } = res.data;
      let valueData = data;
      const userDataValidacion = valueData.map((item, index) => {
        return { key: index, label: item.name, value: item.name };
      });
      setValue(route.params.category);
      setQualificationNumbers(userDataValidacion);
    })();
  }, []);

  const renderInput = (number, name2, Index) => {
    let dataView = [];
    for (var i = 0; i < number; i++) {
      dataView = [...dataView, { id: i }];
    }
    const ListSelecionados = dataView.map((item, index) => (
      <View key={index}>
        <Text style={styles.textSubtitleGroup}>{"Siguiente grupo"}</Text>
        <TextInput
          label={"Nombre"}
          placeholder={"Nombre"}
          value={state["name" + index + "-" + Index]}
          name={"category" + index}
          onChangeText={(text) => onChange(text, "name" + index + "-" + Index, name2, index)}
          style={styles.inputDesing}
          onClear={() => {
            setName("");
          }}
        />
        <TextInput
          label={"Email"}
          placeholder={"Email"}
          value={state["mail" + index + "-" + Index]}
          name={"category" + index}
          onChangeText={(text) => onChange(text, "mail" + index + "-" + Index, name2, index)}
          style={styles.inputDesing}
          onClear={() => {
            setName("");
          }}
        />
      </View>
    ));

    return ListSelecionados;
  };
  const onChangeData = (name) => {
    // const rejectValue = reject(userData, { id: index });
    if (!isEmpty(name)) {
      const valueUpd = { name: name, id: userData.length + 1 };
      const categoryFin = [...userData, valueUpd];

      // const categoryFinOrder = orderBy(categoryFin, ["id"], ["asc"]);
      setUserData(categoryFin);
      setJuez("");
    }
  };
  const renderListSelecionados = () => {
    const ListSelecionados = value.map((item, index) => (
      <View key={index}>
        <Text style={styles.textSubtitle}>{item.name}</Text>
        {renderInput(item.amount, item.name, index)}
      </View>
    ));

    return ListSelecionados;
  };
  const ListUser = () => {
    const ListSelecionados = userData.map((item, index) => (
      <View key={index}>
        <View style={styles.rowNormal}>
          <Text style={styles.textCategory}>{item.name + ":"}</Text>

          <Button
            labelStyle={{ fontSize: HEIGHT * 0.054, margin: 0 }}
            onPress={() => {
              contNumber(index + 1);
            }}
            icon="minus-circle"
          />
        </View>
      </View>
    ));

    return ListSelecionados;
  };
  const handleSave = async () => {
    let fechaShowDate = route.params.showDate;
    fechaShowDate = fechaShowDate.slice(0, 15);
    let fechaShowDateTime = route.params.showDateTime;
    fechaShowDateTime = fechaShowDateTime.slice(15);

    let fechaShowDateBegin = route.params.showDateBegin;
    fechaShowDateBegin = fechaShowDateBegin.slice(0, 15);
    let fechaShowDateTimeBegin = route.params.showDateTimeBegin;
    fechaShowDateTimeBegin = fechaShowDateTimeBegin.slice(15);

    let fisrtDate = fechaShowDate + fechaShowDateTime;

    let secondDate = fechaShowDateBegin + fechaShowDateTimeBegin;
    fisrtDate = new Date(fisrtDate);
    secondDate = new Date(secondDate);

    try {
      var result = "";
      var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < 7; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }

      await Axios({
        method: "POST",
        url: "http://desktop-prfr4ko:3000/event",
        data: {
          nameEvent: route.params.name,
          id_user: loginUser.id,
          description: route.params.description,
          finishTime: secondDate,
          beginTime: fisrtDate,
          phone: 1234567897,
          eventCode: result,
        },
      }).then((res) => console.log(res.data));
    } catch (error) {
      console.log("(Error registrar event)", error);
    }

    let res = await axios.get("http://desktop-prfr4ko:3000/event");
    let { data } = res.data;
    let eventData = data;
    value.map((item, Index) => {
      let dataView = [];
      for (var i = 0; i < item.amount; i++) {
        dataView = [...dataView, { id: i }];
      }
      dataView.map(async (Item, index) => {
        try {
          await Axios({
            method: "POST",
            url: "http://desktop-prfr4ko:3000/group",
            data: {
              name: state["name" + index + "-" + Index],
              category: item.name,
              id_event: eventData[eventData.length - 1].id,
              email: state["mail" + index + "-" + Index],
              phone: 1234567897,
            },
          }).then((res) => console.log(res.data));
        } catch (error) {
          console.log("(Error registrar ususario)", error);
        }
      });
    });

    let responsive = await axios.get("http://desktop-prfr4ko:3000/user");
    let dataUser = responsive.data.data;
    let userDataPhp = dataUser;

    userData.map(async (item, index) => {
      const filterValue = filter(userDataPhp, { name: item.name });
      console.log(filterValue);
      try {
        await Axios({
          method: "POST",
          url: "http://desktop-prfr4ko:3000/judge",
          data: {
            judgeCode: item.name,
            Id_event: eventData[eventData.length - 1].id,
            id_user: filterValue[0].id,
          },
        }).then((res) => console.log(res.data));
      } catch (error) {
        console.log("(Error registrar event)", error);
      }
    });

    navigation.navigate("HistoryEvent", result);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textTitle}>Crear Evento </Text>
      <ScrollView>
        {renderListSelecionados()}
        {/* <RenderDinamic data={route.params} /> */}

        <Text style={styles.textTitle}>Ingresar Jueces</Text>
        {ListUser()}
        <NewDropDownIncludeState
          search={true}
          onChangeData={onChangeData}
          label={"Juez" + 1}
          selectValue={juez}
          setSelectValue={setJuez}
          itemsArray={qualificationNumbers}
          setItemsArray={setQualificationNumbers}
        />
        <Divider />
        <ButtonComponent
          style={styles.buttonMargin}
          // disabled={disabled}
          onPress={() => {
            handleSave();
          }}>
          Guardar
        </ButtonComponent>
      </ScrollView>
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
  textCategory: {
    fontSize: FontScale.superLarge,
    marginBottom: 5,
    width: WIDTH * 0.46,
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
  rowNormal: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "red",
  },
  buttonMargin: {
    marginTop: 15,
  },
  dropDownLabel: {
    alignSelf: "flex-start",
    marginLeft: WIDTH * 0.06,
    marginBottom: -WIDTH * 0.1,
    paddingHorizontal: WIDTH * 0.018,
    backgroundColor: "#F4FFE8",
    zIndex: 1000,

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dropDownLabelText: {
    color: Theme.darkGray2,
    fontWeight: "bold",
    fontSize: FontScale.medium,
    zIndex: 2000,
  },
  dropDownBox: {
    borderColor: Theme.black,
    height: HEIGHT * 0.085,
    marginTop: HEIGHT * 0.04,
    marginBottom: HEIGHT * 0.01,
    borderRadius: WIDTH * 0.06,
  },
  sizeWidth: {
    width: WIDTH * 0.8,
  },
});
function mapStateToProps({ userLogin }) {
  return {
    loginUser: userLogin,
  };
}
export default connect(mapStateToProps)(CreateEventGroup);
