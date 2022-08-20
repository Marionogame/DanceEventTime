import { LOGIN, LOGOUT, REHYDRATE } from "../actions/types";

export default function companies(state = { companyList: [] }, action) {
  const { type, payload } = action;
  switch (type) {
    /*  case LOGIN:
      return { ...state, companyList: payload.data.companies }; */

    case REHYDRATE:
      return { ...state, companyList: payload.data.companies.companyList };

    case LOGOUT:
      return { ...state, companyList: [] };

    default:
      return state;
  }
}
