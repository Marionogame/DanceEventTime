import React from "react";
import { Text, Platform } from "react-native";
import { datesAreSameDay, formatStandardTime, formatStandardDate, formatStandardDateTime } from "../constants/Utils";

const TimeLabel = ({ children, dateOnly = false, timeOnly = false, style }) => {
  const getTimeLabel = (time, dateOnly) => {
    const today = new Date();
    const propTime = new Date(time);
    if (timeOnly) {
      return Platform.OS === "ios" ? propTime.toLocaleTimeString("en-GB", { hour12: true, hour: "2-digit", minute: "2-digit" }) : formatStandardTime(propTime);
    } else {
      if (datesAreSameDay(today, propTime)) {
        return Platform.OS === "ios"
          ? propTime.toLocaleTimeString("en-GB", { hour12: true, hour: "2-digit", minute: "2-digit" })
          : formatStandardTime(propTime);
      } else {
        if (dateOnly) return Platform.OS === "ios" ? propTime.toLocaleDateString("en-GB", { date: "short" }) : formatStandardDate(propTime);
        return Platform.OS === "ios"
          ? propTime.toLocaleString("en-GB", { hour12: true, day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit" })
          : formatStandardDateTime(propTime);
      }
    }
  };

  return <Text style={style}>{getTimeLabel(children, dateOnly)}</Text>;
};

export default TimeLabel;
