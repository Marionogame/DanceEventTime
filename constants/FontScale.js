import { RFPercentage } from "react-native-responsive-fontsize";
import { WIDTH } from "./Layout";

function WPercentage(percent) {
  const widthPercent = (percent * WIDTH) / 100;
  return Math.round(widthPercent);
}

const fontScale = {
  xSmall: WPercentage(3),
  small: WPercentage(3.5),
  medium_small: WPercentage(4),
  medium: WPercentage(4.5),
  medium_large: WPercentage(5),
  large: WPercentage(5.5),
  xLarge: WPercentage(7),
  superLarge: WPercentage(8.5),
  megaLarge: WPercentage(10),
  ultraLarge: WPercentage(12),
  huge: WPercentage(13.5),
  superHuge: WPercentage(15),
  megaHuge: WPercentage(17.5),
  ultraHuge: WPercentage(20),
  icon_15: RFPercentage(1.75),
  icon_20: RFPercentage(2.5),
  icon_25: RFPercentage(3.25),
  icon_30: RFPercentage(4),
  icon_35: RFPercentage(4.75),
  icon_40: RFPercentage(5.5),
  icon_45: RFPercentage(6.25),
  icon_48: RFPercentage(6.5),
  icon_50: RFPercentage(7),
  icon_64: RFPercentage(8.75),
  icon_80: RFPercentage(10.75),
  icon_96: RFPercentage(13),
  icon_128: RFPercentage(17),
  icon_160: RFPercentage(21.5),
  icon_192: RFPercentage(26),
  icon_224: RFPercentage(30.5),
  icon_256: RFPercentage(35),
  icon_288: RFPercentage(39),
  icon_320: RFPercentage(43.5),
};

export default fontScale;
