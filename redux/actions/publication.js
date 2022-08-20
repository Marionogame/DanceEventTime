import { API_FAILURE, GET_PUBLICATION } from "./types";
import Api from "../../api";
import { apiStart, apiEnd, apiError } from "./api";
function requestSuccess(type, data) {
  return { type, payload: { data } };
}
function requestFail(data) {
  return { type: API_FAILURE, payload: { data } };
}
// export const publicationDatoSuccess = createAction("publicationDatoSuccess");
export function getPublication() {
  return (dispatch) => {
    dispatch(apiStart());
    Api.get("/publication")
      .then((response) => {
        if (response.data.success) {
          dispatch(requestSuccess(GET_PUBLICATION, response.data.data));
          dispatch(apiEnd());
        } else {
          dispatch(apiEnd());
          dispatch(requestFail(response.data.message));
        }
      })
      .catch((error) => {
        dispatch(apiEnd());
        dispatch(apiError(error));
      });
  };
}
export function getPublsication() {
  console.log("llegamo al reducers");
  return (dispatch) => {
    dispatch(apiStart());
    console.log("llego reducer");
    Api.get("/publication")
      .then((response) => {
        if (response.data.success) {
          console.log("todoCorrecto");
          dispatch(requestSuccess(GET_PUBLICATION, response.data.data));
          dispatch(apiEnd());
        } else {
          console.log("todoMal", response.data.message);
          dispatch(apiEnd());
          dispatch(requestFail(response.data.message));
        }
      })
      .catch((error) => {
        dispatch(apiEnd());
        dispatch(apiError(error));
      });
  };
}
