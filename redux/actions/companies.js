import { API_FAILURE, ADD_CONTACT, EDIT_CONTACT } from "./types";

function requestSuccess(type, data) {
  return { type, payload: { data } };
}

function requestFail(data) {
  return { type: API_FAILURE, payload: { data } };
}

export function addContact(contact) {
  return (dispatch) => {
    const { name, phone, email, birthday, rnc, cedula } = contact;
    dispatch(apiStart());
    Api.post("/addContact", {
      name,
      phone,
      email,
      birthday,
      rnc,
      cedula,
    })
      .then((response) => {
        if (response.data.success) {
          dispatch(requestSuccess(ADD_CONTACT, response.data.data));
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

export function editContact(contact) {
  return (dispatch) => {
    const { name, phone, email, birthday, rnc, cedula } = contact;
    dispatch(apiStart());
    Api.post("/updateContact", {
      name,
      phone,
      email,
      birthday,
      rnc,
      cedula,
    })
      .then((response) => {
        if (response.data.success) {
          dispatch(requestSuccess(EDIT_CONTACT, response.data.data));
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
