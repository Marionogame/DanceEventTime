import { Image } from "react-native";
import * as ImageManipulator from "expo-image-manipulator";
import { PxHeight } from "./Layout";

function formatDuration(millis) {
  const totalSeconds = millis / 1000;
  const seconds = Math.floor((totalSeconds % 3600) % 60);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const hours = Math.floor(totalSeconds / 3600);

  const padWithZero = (number) => {
    const string = number.toString();
    if (number < 10) {
      return "0" + string;
    }
    return string;
  };
  if (hours >= 1) {
    return hours + ":" + padWithZero(minutes) + ":" + padWithZero(seconds);
  }
  return minutes + ":" + padWithZero(seconds);
}

function guidGenerator() {
  const S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
}

function phoneFormat(string) {
  const cleanString = string.replace(/[^\d]/g, "");
  if (cleanString.length === 10) {
    return cleanString.replace(/(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
  } else if (cleanString.length === 11) {
    return cleanString.replace(/(\d{3})(\d{2})(\d{2})(\d{4})/, "($1)$2 $3 $4");
  }
  return string;
}

function datesAreSameDay(first, second) {
  return first.getFullYear() === second.getFullYear() && first.getMonth() === second.getMonth() && first.getDate() === second.getDate();
}

function getTimeStamp() {
  return new Date().getTime();
}

function getInitials(string) {
  const names = string.split(" ");
  let initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
}

function capitalize(s) {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function formatStandardTime(date) {
  let time = date.toLocaleTimeString();
  time = time.split(":");

  const hours = Number(time[0]);
  const minutes = Number(time[1]);

  let timeValue;

  if (hours > 0 && hours <= 12) {
    timeValue = "" + hours;
  } else if (hours > 12) {
    timeValue = "" + (hours - 12);
  } else if (hours == 0) {
    timeValue = "12";
  }

  timeValue += minutes < 10 ? ":0" + minutes : ":" + minutes;
  timeValue += hours >= 12 ? " pm" : " am";
  return timeValue;
}

function formatStandardDate(date) {
  let xDate = date.toLocaleDateString();
  xDate = xDate.split("/");

  const month = Number(xDate[0]);
  const days = Number(xDate[1]);
  const year = Number(xDate[2]);

  let dateValue = days + "/" + month + "/" + year;

  return dateValue;
}

function formatStandardDateTime(date) {
  let xDate = date.toLocaleDateString();
  xDate = xDate.split("/");
  let time = date.toLocaleTimeString();
  time = time.split(":");

  const month = Number(xDate[0]);
  const days = Number(xDate[1]);
  const year = Number(xDate[2]);
  const hours = Number(time[0]);
  const minutes = Number(time[1]);

  let dateValue = days + "/" + month + "/" + year;
  let timeValue;

  if (hours > 0 && hours <= 12) {
    timeValue = "" + hours;
  } else if (hours > 12) {
    timeValue = "" + (hours - 12);
  } else if (hours == 0) {
    timeValue = "12";
  }
  timeValue += minutes < 10 ? ":0" + minutes : ":" + minutes;
  timeValue += hours >= 12 ? " pm" : " am";

  let dateTimeValue = dateValue + ", " + timeValue;

  return dateTimeValue;
}

function createMessage(type, message, mediaUrl, reply, current, userId) {
  return {
    messageId: guidGenerator(),
    chatId: current.chatId,
    timeStamp: getTimeStamp(),
    type,
    message,
    mediaUrl,
    replyId: reply ? reply.messageId : null,
    to: current.company.agent.userId,
    companyId: current.company.companyId,
    userId,
    sendByClient: true,
    statusCode: 0,
  };
}

async function compressImage(imageUrl) {
  let { width, height } = await new Promise((resolve, reject) => {
    Image.getSize(
      imageUrl,
      (width, height) => {
        resolve({ width, height });
      },
      () => {
        reject({ width: 0, height: 0 });
      }
    );
  });
  const isPortrait = height >= width;
  console.log("isPortrait", isPortrait);
  console.log("_width", width);
  console.log("_height", height);
  const newImage = await ImageManipulator.manipulateAsync(imageUrl, [isPortrait ? { resize: { height: PxHeight } } : { resize: { width: PxHeight } }], {
    compress: 0.6,
  });
  return newImage.uri;
}

export {
  formatDuration,
  guidGenerator,
  phoneFormat,
  getTimeStamp,
  getInitials,
  capitalize,
  datesAreSameDay,
  formatStandardTime,
  formatStandardDate,
  formatStandardDateTime,
  createMessage,
  compressImage,
};
