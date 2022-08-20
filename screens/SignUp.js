import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, KeyboardAvoidingView, Image, TouchableOpacity, DatePickerIOS } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { isEmpty } from "lodash";
import * as ImagePicker from "expo-image-picker";
import emptyUser from "../assets/emptyUser.png";
import { Avatar } from "react-native-paper";

//Expo
import { makeUrl } from "expo-linking";

//Redux
import { connect } from "react-redux";
import { register } from "../redux/actions/user";

//Asset
import Logo from "../assets/logo.png";

//Components
import CheckBox from "../components/CheckBox";
import Button from "../components/Button";
import Input from "../components/Input";

//Constants
import FontScale from "../constants/FontScale";
import Theme from "../constants/Theme";
import { WIDTH, HEIGHT } from "../constants/Layout";
import { ScrollView } from "react-native-gesture-handler";
import Axios from "axios";
const SignUp = ({ navigation, dispatch }) => {
  const [terms, setTerms] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [institution, setInstitution] = useState("");
  const [occupation, setOccupation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const handleRegister = async () => {
    try {
      await Axios({
        method: "POST",
        url: "http://desktop-prfr4ko:3000/user",
        data: {
          name: name,
          institution: institution,
          password: password,
          occupation: occupation,
          description: description,
          email: email,
          phone: phone,
          image: "IMG_20150815_171632.png",
        },
      }).then((res) => console.log(res.data));
    } catch (error) {
      console.log("(Error registrar ususario)", error);
    }
    navigation.navigate("SignIn");
  };

  const disabled =
    !terms || isEmpty(name) || isEmpty(email) || isEmpty(occupation) || isEmpty(description) || isEmpty(phone) || isEmpty(password) || isEmpty(institution);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.logoContainer}>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity onPress={() => pickImage()}>
              {image === null ? <Avatar.Image source={emptyUser} size={150} /> : <Avatar.Image source={{ uri: image }} size={150} />}
            </TouchableOpacity>
          </View>
        </View>

        <KeyboardAvoidingView style={styles.inputsContainer}>
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
            label={"Institución"}
            placeholder={"Institución"}
            value={institution}
            onChange={setInstitution}
            style={styles.inputDesing}
            onClear={() => {
              setDescription("");
            }}
          />
          <Input
            label={"Email"}
            placeholder={"Email"}
            value={email}
            style={styles.inputDesing}
            onChange={setEmail}
            onClear={() => {
              setEmail("");
            }}
          />
          <Input
            label={"Teléfono"}
            placeholder={"Teléfono"}
            value={phone}
            style={styles.inputDesing}
            onChange={setPhone}
            onClear={() => {
              setPhone("");
            }}
          />
          <Input
            label={"Contraseña"}
            placeholder={"Contraseña"}
            value={password}
            onChange={setPassword}
            style={styles.inputDesing}
            onClear={() => {
              setPassword("");
            }}
            isPassword={true}
          />
          <Input
            label={"Occupation"}
            placeholder={"Occupation"}
            value={occupation}
            style={styles.inputDesing}
            onChange={setOccupation}
            onClear={() => {
              setOccupation("");
            }}
          />
          <Input
            label={"Description"}
            placeholder={"Description"}
            value={description}
            onChange={setDescription}
            style={styles.inputDesing}
            onClear={() => {
              setDescription("");
            }}
          />

          <View style={styles.row}>
            <CheckBox selected={terms} onPress={() => setTerms(!terms)}>
              <View style={styles.label}>
                <Text style={styles.text}>
                  Estoy de acuerdo con los
                  <Text style={styles.hyperLink}> Términos y Condiciones</Text> y<Text style={styles.hyperLink}> Política de Privacidad.</Text>
                </Text>
              </View>
            </CheckBox>
          </View>
        </KeyboardAvoidingView>
        <View style={styles.buttonsContainer}>
          <Button onPress={handleRegister} disabled={disabled}>
            Regístrate
          </Button>
          <View style={styles.textRow}>
            <Text style={styles.text}>¿Tienes Cuenta?</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Text style={styles.hyperLink}> Inicia Sessión</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: WIDTH * 0.058,
    backgroundColor: Theme.lightGray5,
  },
  logoContainer: {
    flex: 1.5,
    alignItems: "center",
    justifyContent: "center",
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
  row: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
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
});

export default connect()(SignUp);
