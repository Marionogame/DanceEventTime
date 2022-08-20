import { includes } from "lodash";
import formData from "form-data";
import { lookup } from "react-native-mime-types";

//Internal
import Api from "../../api";
import { apiError } from "./api";
import {
  API_FAILURE,
  GET_MESSAGE,
  SEND_MESSAGE,
  SEND_MESSAGE_LOCAL,
  SEND_MESSAGE_FAILURE,
  SET_CURRENT_CHAT,
  RESET_CURRENT_CHAT,
  SET_REPLY,
  REMOVE_REPLY,
  REMOVE_CHAT,
  NEW_CHAT,
  SET_DELIVERED_MESSAGE,
  SET_READ_MESSAGE,
} from "./types";

//Navigation
import NavigationService from "../../navigation";

//Expo
import { documentDirectory, makeDirectoryAsync, deleteAsync, getInfoAsync, copyAsync } from "expo-file-system";

function requestSuccess(type, data = null) {
  return { type, payload: { data } };
}

function requestFail(data, type = API_FAILURE) {
  return { type, payload: { data } };
}

export function newChat(chat, onDismiss) {
  return async (dispatch) => {
    dispatch(requestSuccess(NEW_CHAT, chat));
    onDismiss();
    NavigationService.navigate("ChatScreen");
  };
}

export function removeChat(array) {
  return async (dispatch) => {
    for (const item of array) {
      if ((await getInfoAsync(documentDirectory + `${item.company.companyId}/${item.user.userId}`)).exists)
        await deleteAsync(documentDirectory + `${item.company.companyId}/${item.user.userId}`);
      dispatch(requestSuccess(REMOVE_CHAT, item.chatId));
    }
  };
}

export function setCurrent(chatId) {
  return (dispatch) => {
    dispatch(requestSuccess(SET_CURRENT_CHAT, chatId));
    NavigationService.navigate("ChatScreen");
  };
}

export function resetCurrent() {
  return (dispatch) => {
    dispatch(requestSuccess(RESET_CURRENT_CHAT));
  };
}

export function setReply(message) {
  return (dispatch) => {
    dispatch(requestSuccess(SET_REPLY, message));
  };
}

export function removeReply() {
  return (dispatch) => {
    dispatch(requestSuccess(REMOVE_REPLY));
  };
}

export function setDelivered(data) {
  return (dispatch) => {
    dispatch(requestSuccess(SET_DELIVERED_MESSAGE, data));
  };
}

export function setRead(data) {
  return (dispatch) => {
    dispatch(requestSuccess(SET_READ_MESSAGE, data));
  };
}

export function getMessage(data) {
  return async (dispatch) => {
    const info = await getInfoAsync(documentDirectory + `${data.chats.companyId}/${data.chats.userId}`);
    if (!info.exists) await makeDirectoryAsync(documentDirectory + `${data.chats.companyId}/${data.chats.userId}`);
    dispatch(requestSuccess(GET_MESSAGE, data));
  };
}

export function sendMessage(chat, message) {
  return async (dispatch) => {
    let name = "";
    let type = "";
    let file = "";
    const form = new formData();
    form.append("msg", JSON.stringify(message));
    const hasAttachment = includes(["Image", "Audio"], message.type);
    let storeMessage = message;
    if (hasAttachment) {
      const info = await getInfoAsync(documentDirectory + `${chat.company.companyId}/${chat.user.userId}`);
      if (!info.exists) await makeDirectoryAsync(documentDirectory + `${chat.company.companyId}/${chat.user.userId}`);
      const temp = message.mediaUrl.split("/");
      name = temp[temp.length - 1];
      const uri = documentDirectory + `${chat.company.companyId}/${chat.user.userId}/${name}`;
      await copyAsync({ from: message.mediaUrl, to: uri });
      type = lookup(name);
      file = {
        uri,
        name,
        type,
      };
      form.append("file", file);
      storeMessage = { ...message, mediaUrl: uri };
    }
    dispatch(requestSuccess(SEND_MESSAGE_LOCAL, storeMessage));
    Api.post("/chat/sendMessage", form)
      .then((response) => {
        if (response.data.success) {
          dispatch(requestSuccess(SEND_MESSAGE, storeMessage.messageId));
        } else {
          dispatch(requestFail(SEND_MESSAGE_FAILURE, { error: response.data.message, chatMsg: message }));
        }
      })
      .catch((error) => {
        dispatch(apiError({ error: error.message, chatMsg: message }, SEND_MESSAGE_FAILURE));
      });
  };
}
