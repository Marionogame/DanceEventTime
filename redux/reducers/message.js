import { API_FAILURE, DISMISS_MESSAGE, API_ERROR, SEND_MESSAGE_FAILURE, DISPLAY_MESSAGE } from "../actions/types";

export default function error(state = { isError: false, text: "", visible: false }, action) {
  const { type, payload } = action;
  switch (type) {
    case API_FAILURE:
      return {
        ...state,
        isError: true,
        text: payload.data,
        visible: true,
      };

    case API_ERROR:
      return {
        ...state,
        isError: true,
        text: payload.data,
        visible: true,
      };

    case SEND_MESSAGE_FAILURE:
      return {
        ...state,
        isError: true,
        text: payload.data.error,
        visible: true,
      };

    case DISMISS_MESSAGE:
      return { ...state, isError: false, text: "", visible: false };

    case DISPLAY_MESSAGE:
      return { ...state, isError: false, text: "", visible: true };

    default:
      return state;
  }
}
