import { GETSELECTEDCATEGORY, GETSELECTEDSIZE, GETISOPEN } from "../actions/types";

export default function UnitsCalculatorSelecteds(
  state = {
    selectedCategory: null,
    selectedSize: null,
    isOpened: null,
  },
  action
) {
  const { type, payload } = action;
  switch (type) {
    case GETSELECTEDSIZE:
      return {
        ...state,
        selectedSize: payload,
      };
    case GETSELECTEDCATEGORY:
      return {
        ...state,
        selectedCategory: payload,
      };
    case GETISOPEN:
      return {
        ...state,
        isOpened: payload,
      };
    default:
      return state;
  }
}
