import { GETSELECTEDSIZE, GETSELECTEDCATEGORY, GETISOPEN } from "./types";

export function getIsOpen(isOpens) {
  return { type: GETISOPEN, payload: isOpens };
}

export function getSelectedSize(size) {
  return { type: GETSELECTEDSIZE, payload: size };
}

export function getSelectedCategory(category) {
  return { type: GETSELECTEDCATEGORY, payload: category };
}
