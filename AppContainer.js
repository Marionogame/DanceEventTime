import React, { useEffect, useRef } from "react";
import { AppState, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Redux
import { connect } from "react-redux";
import { rehydrate } from "./redux/actions/user";
import { dismissMessage } from "./redux/actions/messages";

//Expo

import Constants from "expo-constants";
import * as Notifications from "expo-notifications";

//Navigation
import { NavigationContainer } from "@react-navigation/native";
import { HomeTabs, AuthStack, NewGrupos } from "./navigation/navigation";
import { navigationRef } from "./navigation";

//Components
import Loading from "./components/Loading";
import NotificationDialog from "./components/NotificationDialog";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: false,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

Notifications.setBadgeCountAsync(0);

const AppContainer = ({ dispatch, isLoggedIn, message, isFetching }) => {
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    registerForPushNotificationsAsync();
    AppState.addEventListener("change", handleAppStateChange);
    (async () => {
      await dispatch(rehydrate());
    })();
    return () => {
      AppState.removeEventListener("change", handleAppStateChange);
    };
  }, []);

  const handleAppStateChange = async (nextAppState) => {
    if (appState.current.match(/inactive|background/) && nextAppState === "active") {
      await dispatch(rehydrate());
    }
    appState.current = nextAppState;
  };

  const registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      await AsyncStorage.setItem("device", token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
  };

  const onDismiss = () => {
    dispatch(dismissMessage());
  };

  return (
    <>
      <Loading isFetching={isFetching} />
      <NotificationDialog visible={message.visible} isError={message.isError} text={message.text} onPress={onDismiss} />
      <NavigationContainer ref={navigationRef}>{isLoggedIn ? HomeTabs() : AuthStack()}</NavigationContainer>
    </>
  );
};

function mapStateToProps({ loading, message, user }) {
  return { isFetching: loading.isFetching, message, isLoggedIn: user.isLoggedIn };
}

export default connect(mapStateToProps)(AppContainer);
