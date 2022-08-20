import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, ScrollView } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SafeAreaView } from "react-native-safe-area-context";
import { isEmpty, slice } from "lodash";
import { Button, Divider } from "react-native-paper";
// import splash from "../assets/splash.png";
//Expo
import { makeUrl } from "expo-linking";

//Redux
import { connect } from "react-redux";
import { register } from "../redux/actions/user";
import { filter, reject, orderBy } from "lodash";
//Asset
import Logo from "../assets/logo.png";
import { WIDTH, HEIGHT } from "../constants/Layout";
//Components
import CheckBox from "../components/CheckBox";
import ButtonComponent from "../components/Button";
import Input from "../components/Input";

//Constants
import FontScale from "../constants/FontScale";
import Theme from "../constants/Theme";

const CreateEvent = ({ navigation, dispatch }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState(false);
  const [sms, setSms] = useState(false);
  const [date, setDate] = useState(new Date(1598051730000));
  const [dateBegin, setDateBegin] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [modeBegin, setModeBegin] = useState("date");
  const [showBegin, setShowBegin] = useState(false);

  const [categoryData, setCategoryData] = useState([]);

  const [showDate, setShowDate] = useState("Eligir Fecha");
  const [showDateTime, setShowDateTime] = useState("Eligir hora");
  const [showDateBegin, setShowDateBegin] = useState("Eligir Fecha");
  const [showDateTimeBegin, setShowDateTimeBegin] = useState("Eligir hora");
  const [showDate1, setShowDate1] = useState("Eligir Fecha");
  const [showDateTime1, setShowDateTime1] = useState("Eligir hora");
  const [showDateBegin1, setShowDateBegin1] = useState("Eligir Fecha");
  const [showDateTimeBegin1, setShowDateTimeBegin1] = useState("Eligir hora");
  const [addCategory, setAddCategory] = useState("");

  const disabled =
    showDate === "Eligir Fecha" ||
    showDateTime === "Eligir hora" ||
    setShowDateTimeBegin === "Eligir hora" ||
    showDateBegin === "Eligir Fecha" ||
    isEmpty(name) ||
    isEmpty(description);

  const data = {
    name: name,
    category: categoryData,
    description: description,
    showDate: String(showDate1),
    showDateTime: String(showDateTime1),
    showDateBegin: String(showDateBegin1),
    showDateTimeBegin: String(showDateTimeBegin1),
  };
  useEffect(() => {
    (() => {
      let categoryDataValue = [
        { name: "Mega Crew", amount: 2, id: 1 },
        { name: "Mini Crew", amount: 2, id: 2 },
        { name: "Junior", amount: 2, id: 3 },
        { name: "Duo", amount: 2, id: 4 },
        { name: "Solo", amount: 2, id: 5 },
      ];

      setCategoryData(categoryDataValue);
    })();
  }, []);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    if (mode === "date") {
      let fecha = String(currentDate);
      const fechaCortada = fecha.slice(4, 15);
      console.log(currentDate);
      setShowDate(fechaCortada);
      setShowDate1(currentDate);
    } else {
      let time = String(currentDate);
      console.log(currentDate);
      const timeShort = time.slice(16, 25);
      setShowDateTime(timeShort);
      setShowDateTime1(currentDate);
    }
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const onChangeBegin = (event, selectedDate) => {
    const currentDate = selectedDate || dateBegin;
    setShowBegin(Platform.OS === "ios");
    setDateBegin(currentDate);
    if (modeBegin === "date") {
      let fecha = String(currentDate);
      const fechaCortada = fecha.slice(4, 15);
      setShowDateBegin(fechaCortada);
      setShowDateBegin1(currentDate);
    } else {
      let time = String(currentDate);
      const timeShort = time.slice(16, 25);
      setShowDateTimeBegin(timeShort);
      setShowDateTimeBegin1(currentDate);
    }
  };
  const showModeBegin = (currentMode) => {
    setShowBegin(true);
    setModeBegin(currentMode);
  };
  const contNumber = (name2, index) => {
    const filterValue = filter(categoryData, { id: index });
    const rejectValue = reject(categoryData, { id: index });

    let valueComplete = [];
    if (name2 === "minus") {
      if (filterValue[0].amount > 0) {
        if (filterValue[0].amount === 2) {
          if (categoryData.length !== 1) {
            const finishValue = rejectValue.map((item, index) => {
              return { name: item.name, amount: item.amount, id: index + 1 };
            });
            setCategoryData(finishValue);
          }
        } else {
          valueComplete = { name: filterValue[0].name, amount: filterValue[0].amount - 1, id: filterValue[0].id };
          const categoryFin = [...rejectValue, valueComplete];
          const categoryFinOrder = orderBy(categoryFin, ["id"], ["asc"]);

          setCategoryData(categoryFinOrder);
        }
      }
    } else {
      if (filterValue[0].amount === 0) {
        valueComplete = { name: filterValue[0].name, amount: filterValue[0].amount + 2, id: filterValue[0].id };
      } else {
        valueComplete = { name: filterValue[0].name, amount: filterValue[0].amount + 1, id: filterValue[0].id };
      }
      const categoryFin = [...rejectValue, valueComplete];
      const categoryFinOrder = orderBy(categoryFin, ["id"], ["asc"]);

      setCategoryData(categoryFinOrder);
    }
  };
  const chageDate = () => {
    showMode("date");
  };
  const chageDateTime = () => {
    showMode("time");
  };
  const chageDateBegin = () => {
    showModeBegin("date");
  };
  const chageDateTimeBegin = () => {
    showModeBegin("time");
  };

  const renderListSelecionados = () => {
    const ListSelecionados = categoryData.map((item, index) => (
      <View key={index} style={styles.rowCategory}>
        <Divider />
        <Text style={styles.textCategory}>{item.name + ":"}</Text>
        <View style={styles.rowNormal}>
          <Button
            labelStyle={item.amount === 2 ? { fontSize: HEIGHT * 0.054, color: "#FF0000" } : { fontSize: HEIGHT * 0.054 }}
            onPress={() => {
              contNumber("minus", index + 1);
            }}
            icon="minus-circle"
          />

          <Text style={styles.textCategoryNumber}>{String(item.amount)}</Text>
          <Button
            labelStyle={{ fontSize: HEIGHT * 0.054 }}
            onPress={() => {
              contNumber("plus", index + 1);
            }}
            icon="plus-circle"
          />
        </View>
      </View>
    ));

    return ListSelecionados;
  };
  const addData = () => {
    const addData = [...categoryData, { name: addCategory, amount: 2, id: categoryData.length + 1 }];

    setCategoryData(addData);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <KeyboardAvoidingView style={styles.inputsContainer}>
          <Text style={styles.textTitle}>Crear Evento </Text>
          <Input
            label={"Nombre"}
            placeholder={"Nombre"}
            value={name}
            onChange={setName}
            style={styles.inputDesing}
            onClear={() => {
              setName("");
            }}
          />
          <Input
            label={"Descripción"}
            placeholder={"Descripción"}
            value={description}
            onChange={setDescription}
            style={styles.inputDesing}
            onClear={() => {
              setDescription("");
            }}
          />
          <Divider />
          <Text style={styles.textSubtitle}>Enviar Notificacion del evento:</Text>
          <View style={styles.row}>
            <CheckBox selected={email} onPress={() => setEmail(!email)}>
              <View style={styles.label}>
                <Divider />
                <Text style={styles.text}>Via correo electronico </Text>
              </View>
            </CheckBox>
          </View>

          <View style={styles.row}>
            <CheckBox selected={sms} onPress={() => setSms(!sms)}>
              <View style={styles.label}>
                <Text style={styles.text}>Via SMS (Mensaje corto de texto) </Text>
              </View>
            </CheckBox>
          </View>
          <Text style={styles.textSubtitle}>Eligir Fecha de Inicio de evento:</Text>
          <View style={styles.row}>
            <CheckBox selected={showDate === "Eligir Fecha" ? false : true} onPress={chageDate}>
              <View style={styles.label}>
                <Text style={styles.text}>{showDate}</Text>
              </View>
            </CheckBox>
          </View>
          <View style={styles.row}>
            <CheckBox selected={showDateTime === "Eligir hora" ? false : true} onPress={chageDateTime}>
              <View style={styles.label}>
                <Text style={styles.text}>{showDateTime}</Text>
              </View>
            </CheckBox>
          </View>

          <Text style={styles.textSubtitle}>Eligir Fecha de termino de evento:</Text>
          <View style={styles.row}>
            <CheckBox selected={showDateBegin === "Eligir Fecha" ? false : true} onPress={chageDateBegin}>
              <View style={styles.label}>
                <Text style={styles.text}>{showDateBegin}</Text>
              </View>
            </CheckBox>
          </View>
          <View style={styles.row}>
            <CheckBox selected={showDateTimeBegin === "Eligir hora" ? false : true} onPress={chageDateTimeBegin}>
              <View style={styles.label}>
                <Text style={styles.text}>{showDateTimeBegin}</Text>
              </View>
            </CheckBox>
          </View>

          <Text style={styles.textSubtitle}>Elija categorías y cantidad de evento:</Text>
          {renderListSelecionados()}
          <View style={styles.row}>
            <View style={styles.containerInput}>
              <Input
                label={"Agregar Categoría"}
                placeholder={"Agregar"}
                value={addCategory}
                onChange={setAddCategory}
                style={styles.inputDesing}
                onClear={() => {
                  setAddCategory("");
                }}
              />
            </View>
            <Button
              labelStyle={{ fontSize: HEIGHT * 0.065, color: "#2CAF1E" }}
              onPress={() => {
                addData();
              }}
              icon="plus-circle"
            />
          </View>
          {show && <DateTimePicker testID="dateTimePicker" value={date} mode={mode} is24Hour={true} display="default" onChange={onChange} />}
          {showBegin && <DateTimePicker testID="dateTimePicker" value={date} mode={modeBegin} is24Hour={true} display="default" onChange={onChangeBegin} />}
        </KeyboardAvoidingView>
        <View style={styles.buttonsContainer}>
          <ButtonComponent
            disabled={disabled}
            onPress={() => {
              navigation.navigate("CreateEventGroup", data);
            }}>
            Siguiente
          </ButtonComponent>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: WIDTH * 0.058,
    backgroundColor: "#F4FFE8",
  },

  inputsContainer: {
    flex: 3,
    justifyContent: "space-evenly",
  },
  buttonsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  logo: {
    height: FontScale.icon_192,
    width: FontScale.icon_192,
    resizeMode: "contain",
  },
  titleText: {
    fontSize: FontScale.xLarge,
    fontWeight: "700",
  },
  label: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  containerInput: {
    width: WIDTH * 0.66,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  rowCategory: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: FontScale.medium_small,
  },
  hyperLink: {
    fontSize: FontScale.medium_small,
    color: Theme.blue,
  },
  inputDesing: {
    marginBottom: HEIGHT * 0.024,
    height: HEIGHT * 0.014,
  },
  contentContainer: {
    paddingVertical: 20,
  },
  textTitle: {
    fontSize: FontScale.megaLarge,
    color: Theme.blue,
  },
  textSubtitle: {
    fontSize: FontScale.medium_large,
    color: Theme.blue,
  },
  rowNormal: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textCategory: {
    fontSize: FontScale.superLarge,
    marginBottom: 5,
    width: WIDTH * 0.46,
  },
  textCategoryNumber: {
    fontSize: FontScale.megaLarge,
    marginRight: 12,
  },
});

export default connect()(CreateEvent);
