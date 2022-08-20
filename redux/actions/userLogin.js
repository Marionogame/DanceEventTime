import { LOGIN_USER, LOGIN } from "./types";

function requestSuccess(type, data) {
  return { type, payload: { data } };
}

var usuario = [];

export const userLogin = (datosLoginUser) => async (dispatch) => {
  try {
    usuario = datosLoginUser;
    dispatch(requestSuccess(LOGIN_USER, usuario));
    dispatch(requestSuccess(LOGIN, null));
  } catch (error) {
    console.log("(Error action buscadorImagenBlob)");
  }
};

// export const type = "LOGIN_USER";
// const userLogin = (data) => {
//   return {
//     type,
//     payload: text,
//   };
// };
// export default userLogin;

// export function userLogdin(data) {
//   // return async (dispatch) => {
//   return dispatch(requestSuccess(LOGIN_USER, data));
//   // dispatch(requestSuccess(LOGIN, null));
//   // dispatch(apiStart());
//   // const device = await AsyncStorage.getItem("device");
//   // if (device) {
//   //   Api.post("/user/login", {
//   //     userName: username,
//   //     password,
//   //     expoToken: device,
//   //   })
//   //     .then(async (response) => {
//   //       if (response.data.success) {
//   //         if (selected) {
//   //           const credentials = { username, password, selected };
//   //           await AsyncStorage.setItem("credentials", JSON.stringify(credentials));
//   //         } else {
//   //           await AsyncStorage.removeItem("credentials");
//   //         }
//   //         const { user, token, companies } = response.data.data;
//   //         if (user.type === "user") {
//   //           for (const company of companies) {
//   //             const info = await getInfoAsync(documentDirectory + `${company.companyId}`);
//   //             if (!info.exists) await makeDirectoryAsync(documentDirectory + `${company.companyId}`);
//   //           }
//   //         }
//   //         await AsyncStorage.setItem("loggedUser", String(user.userId));
//   //         await dispatch(rehydrate(false));
//   //         Api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//   //         Api.defaults.headers.common["userId"] = user.userId;
//   //         dispatch(requestSuccess(LOGIN, response.data.data));
//   //         navigation.navigate("Chats");
//   //         socketInit(token, dispatch);
//   //         dispatch(apiEnd());
//   //       } else {
//   //         dispatch(apiEnd());
//   //         dispatch(requestFail(response.data.message));
//   //       }
//   //     })
//   //     .catch((error) => {
//   //       dispatch(apiEnd());
//   //       dispatch(apiError(error));
//   //     });
//   // } else {
//   //   dispatch(apiEnd());
//   //   dispatch(requestFail("Error Initializing Device"));
//   // }
//   // };
// }
