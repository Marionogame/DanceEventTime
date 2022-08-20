import { GET_PUBLICATION } from "../actions/types";

export default function publication(state = { hashtagList: [] }, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PUBLICATION:
      console.log("llego reducer");
      console.log(payload.data);
      return { ...state, hashtagList: payload.data };

    default:
      return state;
  }
}
