import { Dimensions, PixelRatio } from "react-native";

const WIDTH = Dimensions.get("window").width;

const HEIGHT = Dimensions.get("window").height;

const Ratio = HEIGHT / WIDTH;
const PxRatio = PixelRatio.get();
const PxWidth = WIDTH * PxRatio;
const PxHeight = HEIGHT * PxRatio;

export { WIDTH, HEIGHT, Ratio, PxRatio, PxWidth, PxHeight };
