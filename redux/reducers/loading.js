import { API_START, API_END } from "../actions/types";

export default function loading(state = { isFetching: false }, action) {
  const { type } = action;
  switch (type) {
    case API_START:
      return { ...state, isFetching: true };

    case API_END:
      return { ...state, isFetching: false };

    default:
      return state;
  }
}
