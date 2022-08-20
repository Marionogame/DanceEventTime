import {
  LOGIN,
  SEND_MESSAGE_LOCAL,
  SEND_MESSAGE,
  GET_MESSAGE,
  REMOVE_CHAT,
  RESET_CURRENT_CHAT,
  GET_REMAINING_MESSAGES,
  SET_DELIVERED_MESSAGE,
  SET_READ_MESSAGE,
  LOGIN_USER,
} from "../actions/types";
import { documentDirectory, writeAsStringAsync } from "expo-file-system";
import { includes } from "lodash";

const persist = (store) => (next) => (action) => {
  let result = next(action);
  let actions = [
    LOGIN,
    SEND_MESSAGE_LOCAL,
    SEND_MESSAGE,
    GET_MESSAGE,
    REMOVE_CHAT,
    RESET_CURRENT_CHAT,
    GET_REMAINING_MESSAGES,
    SET_DELIVERED_MESSAGE,
    SET_READ_MESSAGE,
    LOGIN_USER,
  ];
  if (includes(actions, action.type)) {
    const savedUserStore = `${store.getState().user.userId}store.json`;
    writeAsStringAsync(documentDirectory + savedUserStore, JSON.stringify(store.getState()));
  }

  return result;
};

export default persist;
