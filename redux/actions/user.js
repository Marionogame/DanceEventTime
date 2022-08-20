import AsyncStorage from "@react-native-async-storage/async-storage";

//Internal
import Api from "../../api";
import { apiStart, apiEnd, apiError } from "./api";
/* import { socketInit, socketClose } from "../../socket"; */
import { LOGIN, API_FAILURE, LOGOUT, REHYDRATE, GET_REMAINING_MESSAGES } from "./types";
import navigation from "../../navigation";
import { reduce, isEmpty } from "lodash";

//Expo
import { documentDirectory, getInfoAsync, readAsStringAsync, makeDirectoryAsync, deleteAsync } from "expo-file-system";

function requestSuccess(type, data = null) {
  return { type, payload: { data } };
}

function requestFail(message) {
  return { type: API_FAILURE, payload: { data: message } };
}

export function register(linkingURL, name, phone, email, password) {
  return async (dispatch) => {
    const device = await AsyncStorage.getItem("device");
    if (device) {
      dispatch(apiStart());
      const user = { name, phone, email, password, type: "user", expoToken: device };
      Api.post("/user/register", {
        linkingURL,
        user,
      })
        .then((response) => {
          if (response.data.success) {
            dispatch(apiEnd());
            navigation.navigate("Validate");
          } else {
            dispatch(apiEnd());
            dispatch(requestFail(response.data.message));
          }
        })
        .catch((error) => {
          dispatch(apiEnd());
          dispatch(apiError(error));
        });
    } else {
      dispatch(requestFail("No Expo Token Detected"));
    }
  };
}

export function validate(token) {
  return async (dispatch) => {
    // dispatch(apiStart());
    // Api.post("/user/confirmAccount", {
    //   token,
    // })
    //   .then(async (response) => {
    //     if (response.data.success) {
    //       const { user, token, companies } = response.data.data;
    //       if (user.type === "user") {
    //         for (const company of companies) {
    //           const info = await getInfoAsync(documentDirectory + `${company.companyId}`);
    //           if (!info.exists) await makeDirectoryAsync(documentDirectory + `${company.companyId}`);
    //         }
    //       }
    //       Api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    //       Api.defaults.headers.common["userId"] = user.userId;
    //       dispatch(requestSuccess(LOGIN, response.data.data));
    //       await AsyncStorage.setItem("loggedUser", String(user.userId));
    //       dispatch(apiEnd());
    //     } else {
    //       dispatch(apiEnd());
    //       dispatch(requestFail(response.data.message));
    //     }
    //   })
    //   .catch((error) => {
    //     dispatch(apiEnd());
    //     dispatch(apiError(error));
    //   });
  };
}

export function login(username, password, selected) {
  return async (dispatch) => {
    dispatch(requestSuccess(LOGIN, null));
    // dispatch(apiStart());
    // const device = await AsyncStorage.getItem("device");
    // if (device) {
    //   Api.post("/user/login", {
    //     userName: username,
    //     password,
    //     expoToken: device,
    //   })
    //     .then(async (response) => {
    //       if (response.data.success) {
    //         if (selected) {
    //           const credentials = { username, password, selected };
    //           await AsyncStorage.setItem("credentials", JSON.stringify(credentials));
    //         } else {
    //           await AsyncStorage.removeItem("credentials");
    //         }
    //         const { user, token, companies } = response.data.data;
    //         if (user.type === "user") {
    //           for (const company of companies) {
    //             const info = await getInfoAsync(documentDirectory + `${company.companyId}`);
    //             if (!info.exists) await makeDirectoryAsync(documentDirectory + `${company.companyId}`);
    //           }
    //         }
    //         await AsyncStorage.setItem("loggedUser", String(user.userId));
    //         await dispatch(rehydrate(false));
    //         Api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    //         Api.defaults.headers.common["userId"] = user.userId;
    //         dispatch(requestSuccess(LOGIN, response.data.data));
    //         navigation.navigate("Chats");
    //         socketInit(token, dispatch);
    //         dispatch(apiEnd());
    //       } else {
    //         dispatch(apiEnd());
    //         dispatch(requestFail(response.data.message));
    //       }
    //     })
    //     .catch((error) => {
    //       dispatch(apiEnd());
    //       dispatch(apiError(error));
    //     });
    // } else {
    //   dispatch(apiEnd());
    //   dispatch(requestFail("Error Initializing Device"));
    // }
  };
}

export function logout() {
  return async (dispatch) => {
    await AsyncStorage.removeItem("loggedUser");
    dispatch(requestSuccess(LOGOUT));
    /* socketClose(); */
    Api.post("/user/logout").catch((error) => {
      dispatch(apiError(error));
    });
  };
}

export function rehydrate(connect = true, reset = false) {
  return async (dispatch) => {
    if (reset) {
      // await deleteAsync(documentDirectory + "3store.json");
      // await deleteAsync(documentDirectory + "nullstore.json");
      // await deleteAsync(documentDirectory + "1");
      dispatch(logout());
    } else {
      const loggedUser = await AsyncStorage.getItem("loggedUser");
      if (loggedUser) {
        let store = null;
        try {
          store = await readAsStringAsync(documentDirectory + `${loggedUser}store.json`);
        } catch (e) {}
        if (store) {
          const parsedStore = JSON.parse(store);
          dispatch(requestSuccess(REHYDRATE, parsedStore));
          /* socketClose(); */
          if (connect) {
            Api.defaults.headers.common["Authorization"] = `Bearer ${parsedStore.user.token}`;
            Api.defaults.headers.common["userId"] = parsedStore.user.userId;
            /* socketInit(parsedStore.user.token, dispatch); */
          }
          //Fetch Remaining Messages
          if (!isEmpty(parsedStore.chat.messages)) {
            const time = reduce(parsedStore.chat.messages, (max, current) => (max.timeStamp > current.timeStamp ? max.timeStamp : current.timeStamp));
            Api.get(`/chat/lostChatsMessages/${time}`)
              .then((response) => {
                if (response.data.success) {
                  dispatch(requestSuccess(GET_REMAINING_MESSAGES, response.data.data));
                } else {
                  dispatch(requestFail(response.data.message));
                }
              })
              .catch((error) => {
                console.log(error);
                dispatch(apiError(error));
              });
          }
        }
      }
    }
  };
}

export function forgotPassword(linkingURL, email) {
  return (dispatch) => {
    dispatch(apiStart());
    Api.post("/user/forgotPassword", {
      linkingURL,
      email,
    })
      .then((response) => {
        if (response.data.success) {
          dispatch(apiEnd());
          NavigationService.goBack();
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

export function resetPassword(token, password) {
  return (dispatch) => {
    dispatch(apiStart());
    Api.post("/user/resetPassword", {
      token,
      passWord: password,
    })
      .then((response) => {
        if (response.data.success) {
          dispatch(apiEnd());
          NavigationService.goBack();
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
