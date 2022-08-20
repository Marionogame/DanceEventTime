import { LOGIN_USER } from "../actions/types";

export default function LoginUser(state = { login_user: [] }, action) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_USER:
      console.log("llego reducer");
      console.log(payload.data);
      const data = payload.data;
      return (login_user = data);

    default:
      return state;
  }
}
