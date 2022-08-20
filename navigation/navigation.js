import React from "react";

//Expo
import { MaterialCommunityIcons } from "@expo/vector-icons";

//Navigation
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
const SettingsStack = createStackNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

//AuthScreens
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import ForgotPassword from "../screens/ForgotPassword";
import ResetPassword from "../screens/ResetPassword";
import Validate from "../screens/Validate";

//TabScreens
import StreamForm from "../screens/StreamForm";
import StreamCam from "../screens/StreamCam";
import Qualification from "../screens/Qualification";
import OrderForm from "../screens/OrderForm";
import UnitCalculator from "../screens/UnitCalculator";
import Settings from "../screens/Settings";
import CreateEvent from "../screens/CreateEvent";
import CreateEventGroup from "../screens/CreateEventGroup";
import CreatePublication from "../screens/CreatePublication";
import EventCode from "../screens/EventCode";
import EventForm from "../screens/EventForm";
import reportForm from "../screens/reportForm";
import reportList from "../screens/reportList";

//Constants
import FontScale from "../constants/FontScale";
import Theme from "../constants/Theme";

const SettingsStackContainer = () => {
  return (
    <SettingsStack.Navigator
      screenOptions={() => ({
        headerStyle: { backgroundColor: Theme.lightGray5, borderBottomColor: Theme.lightGray, borderBottomWidth: 0.25 },
        headerTitleStyle: { fontSize: FontScale.medium },
        headerTitleAlign: "center",
      })}>
      <SettingsStack.Screen name={"Settings"} component={Settings} options={{ headerTitle: "Ajustes" }} />
      <SettingsStack.Screen name={"CreatePublication"} component={CreatePublication} options={{ headerTitle: "crear publicacion" }} />

      <SettingsStack.Screen name={"reportList"} component={reportList} options={{ headerTitle: "reportList" }} />
    </SettingsStack.Navigator>
  );
};

export const HomeTabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: { backgroundColor: Theme.lightGray5, borderTopColor: Theme.lightGray, borderTopWidth: 0.25 },
        activeTintColor: Theme.blue,
        inactiveTintColor: Theme.gray,
        labelStyle: { fontSize: FontScale.small },
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case "Publication":
              iconName = focused ? "account-box-multiple" : "account-box-multiple-outline";
              break;
            case "CreatePublication":
              iconName = focused ? "mdiHomeCircle" : "mdiHomeCircle-outline";
              break;
            case "HistoryEvent":
              iconName = focused ? "archive" : "archive";
              break;
            case "Settings":
              iconName = focused ? "cog" : "cog-outline";
              break;
            case "newEvento":
              iconName = focused ? "newspaper-plus" : "newspaper-plus";
              break;
            case "CreateEventGroup":
              iconName = focused ? "cog" : "cog-outline";
              break;
            case "StreamCam":
              iconName = focused ? "cog" : "cog-outline";
              break;
          }
          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name={"Publication"} component={publication} options={{ headerTitle: "Formulario" }} />
      <Tab.Screen name={"HistoryEvent"} component={UnitCalculator} options={{ headerTitle: "Eventos" }} />

      <Tab.Screen name={"newEvento"} component={eventCreate} options={{ headerTitle: "Crear Evento" }} />

      <Tab.Screen name={"Settings"} component={SettingsStackContainer} />
    </Tab.Navigator>
  );
};
export const eventCreate = () => {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}>
      <Stack.Screen name={"newEvento"} component={CreateEvent} />
      <Stack.Screen name={"CreateEventGroup"} component={CreateEventGroup} />
      <Stack.Screen name={"EventCode"} component={EventCode} />
    </Stack.Navigator>
  );
};

export const publication = () => {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}>
      <Stack.Screen name={"Publication"} component={OrderForm} />
      <Stack.Screen name={"Qualification"} component={Qualification} />
      <Stack.Screen name={"StreamForm"} component={StreamForm} />
      <Stack.Screen name={"CreatePublication"} component={CreatePublication} />
      <Stack.Screen name={"StreamCam"} component={StreamCam} />
      <Stack.Screen name={"EventForm"} component={EventForm} />
      <Stack.Screen name={"reportForm"} component={reportForm} options={{ headerTitle: "reportForm" }} />
      <Stack.Screen name={"reportList"} component={reportList} options={{ headerTitle: "reportList" }} />
    </Stack.Navigator>
  );
};

export const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}>
      <Stack.Screen name={"SignIn"} component={SignIn} />
      <Stack.Screen name={"SignUp"} component={SignUp} />
      <Stack.Screen name={"ForgotPassword"} component={ForgotPassword} />
      <Stack.Screen name={"ResetPassword"} component={ResetPassword} />
      <Stack.Screen name={"Validate"} component={Validate} />
      <Stack.Screen name={"Publication"} component={OrderForm} />
      <Stack.Screen name={"Qualification"} component={Qualification} />
      <Stack.Screen name={"StreamForm"} component={StreamForm} />
      <Stack.Screen name={"EventForm"} component={EventForm} />
    </Stack.Navigator>
  );
};
