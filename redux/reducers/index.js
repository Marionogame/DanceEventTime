import { combineReducers } from "redux";

//Reducers
import loading from "./loading";
import message from "./message";
import user from "./user";
import companies from "./companies";
import chat from "./chat";
import unitsCalculator from "./unitsCalculator";
import publication from "./publication";
import userLogin from "./userLogin";
export default combineReducers({
  loading,
  message,
  user,
  companies,
  chat,
  unitsCalculator,
  publication,
  userLogin,
});
