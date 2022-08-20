import { createRef } from "react";

export const navigationRef = createRef();

function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

function goBack() {
  navigationRef.current?.goBack();
}

export default {
  navigate,
  goBack,
};
