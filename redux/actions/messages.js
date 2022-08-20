import { DISMISS_MESSAGE } from "./types";

function requestSuccess(type, data = null) {
  return { type, payload: { data } };
}

export function dismissMessage() {
  return (dispatch) => {
    dispatch(requestSuccess(DISMISS_MESSAGE));
  };
}
