import { LOGIN, LOGOUT, REHYDRATE } from "../actions/types";

export default function user(
  state = {
    isLoggedIn: false,
    userId: null,
    name: "",
    phone: "",
    email: "",
    token: null,
  },
  action
) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        // userId: payload.data.user.userId,
        // name: payload.data.user.name,
        // phone: payload.data.user.phone,
        // email: payload.data.user.email,
        // token: payload.data.token,
      };

    case REHYDRATE:
      return {
        ...state,
        isLoggedIn: payload.data.user.isLoggedIn,
        userId: payload.data.user.userId,
        name: payload.data.user.name,
        phone: payload.data.user.phone,
        email: payload.data.user.email,
        token: payload.data.user.token,
      };

    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        userId: null,
        name: "",
        phone: "",
        email: "",
        token: null,
      };

    default:
      return state;
  }
}
