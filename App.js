import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

//Expo
import { StatusBar } from "expo-status-bar";
import AppLoading from "expo-app-loading";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import { MaterialCommunityIcons } from "@expo/vector-icons";

//Redux
import { Provider } from "react-redux";
import store from "./redux";

//Paper
import { Provider as PaperProvider } from "react-native-paper";

//App
import AppContainer from "./AppContainer";

const App = () => {
  const [isReady, setReady] = useState(false);

  const loadResourcesAsync = async () => {
    await Promise.all([
      Asset.loadAsync([require("./assets/icon.png"), require("./assets/logo.png")]),
      Font.loadAsync({
        ...MaterialCommunityIcons.font,
      }),
    ]);
  };

  const handleLoadingError = () => {
    setReady(false);
  };

  const handleFinishLoading = () => {
    setReady(true);
  };

  if (!isReady) {
    return <AppLoading startAsync={loadResourcesAsync} onFinish={handleFinishLoading} onError={handleLoadingError} />;
  } else {
    return (
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <Provider store={store}>
          <PaperProvider>
            <AppContainer />
          </PaperProvider>
        </Provider>
      </SafeAreaProvider>
    );
  }
};

export default App;
