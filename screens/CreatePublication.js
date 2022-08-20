import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { splash } from "../assets/splash.png";
//Expo
import * as ImagePicker from "expo-image-picker";
import empty from "../assets/empty.png";
import { getPublication } from "../redux/actions/publication";
import fontScale from "../constants/FontScale";
import Input from "../components/Input";
//Redux
import Axios from "axios";
import { connect } from "react-redux";
//Components
import Button from "../components/Button";
import { isEmpty, split } from "lodash";
//Constants
import FontScale from "../constants/FontScale";
import Theme from "../constants/Theme";
import { WIDTH, HEIGHT } from "../constants/Layout";

const CreatePublication = ({ navigation, dispatch, loginUser }) => {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [comment, setComment] = useState("");
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

    if (!result.cancelled) {
      setFile(result);
      setImage(result.uri);
    }
  };

  const handleSaved = async () => {
    // var bodyFormData = new FormData();
    // bodyFormData.append("file", file);
    // axios.post("http://desktop-prfr4ko:3000/image", bodyFormData, {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // });

    if (disabled) {
      try {
        console.log("entro");
        await Axios({
          method: "POST",
          url: "http://desktop-prfr4ko:3000/publication",
          data: {
            image: "IMG_20150818_115502.jpg",
            id_user: loginUser.id,
            Text: comment,
            title: title,
            Text: comment,
            subTitle: subTitle,
            like: 0,
          },
        }).then((res) => console.log(res.data));
      } catch (error) {
        console.log("(Error registrar ususario)", error);
      }
      navigation.navigate("Publication");
    }
  };
  const disabled = !isEmpty(title) || !isEmpty(subTitle) || !isEmpty(comment);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textTitle}>Crear Publicacion</Text>
      <Input
        label={"Título"}
        placeholder={"Título"}
        value={title}
        onChange={setTitle}
        onClear={() => {
          setTitle("");
        }}
      />
      <View style={{ alignItems: "center" }}>
        <Button onPress={() => pickImage()} style={styles.backColorButtom}>
          Seleccione la imagen
        </Button>
        {image === null ? <Image source={empty} style={{ width: 150, height: 150 }} /> : <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>

      <Input
        label={"Subtítulo"}
        placeholder={"Subtítulo"}
        value={subTitle}
        onChange={setSubTitle}
        onClear={() => {
          setSubTitle("");
        }}
      />
      <Input
        label={"Comentario"}
        style={styles.imageTitle}
        placeholder={"Comentario"}
        value={comment}
        onChange={setComment}
        onClear={() => {
          setComment("");
        }}
      />
      <Button style={styles.imageTitle} onPress={() => navigation.navigate("Publication")}>
        Cancelar
      </Button>
      <Button style={styles.imageTitle} onPress={() => handleSaved()}>
        Guardar
      </Button>
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

  textTitle: {
    fontSize: FontScale.megaLarge,
    color: Theme.blue,
  },
  textSubtitle: {
    fontSize: FontScale.medium_large,
    color: Theme.blue,
  },
  imageTitle: {
    marginBottom: HEIGHT * 8.024,
    marginTop: 8,
  },
  backColorButtom: {
    backgroundColor: "#3EB97F",
  },
});
function mapStateToProps({ userLogin }) {
  return {
    loginUser: userLogin,
  };
}

export default connect(mapStateToProps)(CreatePublication);
