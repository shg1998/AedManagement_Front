//@ts-ignore
import jalaali from "jalaali-js";
// @ts-ignore
import moment from "jalali-moment";

export const getCurrentDateTime = (): string => {
  const currentDate = new Date();
  const timezoneOffset = 210; // Offset in minutes (+3:30 hours = 210 minutes)
  const adjustedTime = new Date(currentDate.getTime() + timezoneOffset * 60000);
  const isoString = adjustedTime.toISOString();

  const formattedDateTime = isoString.slice(0, 16);
  // let formattedDateTime = "2023-01-01T00:00";
  // if (currentDate !== null && currentDate !== undefined)
  //   formattedDateTime = currentDate.toISOString().replace("Z", "");
  return formattedDateTime;
};

export const getCurrentTime = (): string => {
  const currentTime = new Date();
  const hours = currentTime.getHours().toString().padStart(2, "0");
  const minutes = currentTime.getMinutes().toString().padStart(2, "0");
  const formattedTime = `${hours}:${minutes}`;
  return formattedTime;
};
export const convertToISOString = (inputDateTime: any): string => {
  const timezoneOffset = inputDateTime.getTimezoneOffset();
  inputDateTime.setMinutes(inputDateTime.getMinutes() - timezoneOffset);

  const isoString = inputDateTime.toISOString();

  return isoString;
};
export const convertTimeToLocale = (inputDateTime: string): string => {
  if (inputDateTime !== "") {
    const timezoneOffset = 210; // Offset in minutes (+3:30 hours = 210 minutes)

    const utcDateTime = new Date(inputDateTime);
    const adjustedTime = new Date(
        utcDateTime?.getTime() + timezoneOffset * 60000
    );

    const isoString = convertToISOString(adjustedTime);
    const formattedDateTime = isoString?.slice(0, 16);
    return formattedDateTime;
  } else {
    return "";
  }
};

export const convertDateToDesiredResult = (dateTime: Date) => {
  const year = dateTime.getFullYear();
  const month = String(dateTime.getMonth() + 1).padStart(2, '0');
  const day = String(dateTime.getDate()).padStart(2, '0');
  const hours = String(dateTime.getHours()).padStart(2, '0');
  const minutes = String(dateTime.getMinutes()).padStart(2, '0');
  const seconds = String(dateTime.getSeconds()).padStart(2, '0');
  const milliseconds = String(dateTime.getMilliseconds()).padStart(3, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
}

export const currentTimeToUTC = (originalTime: string): string => {
  // Convert to UTC
  const utcTime = new Date(originalTime);

  // Format the adjusted time in the desired format
  const adjustedTime = utcTime?.toISOString();
  return adjustedTime;
};


export const getJalaliDate = (
  gregorianDate: any,
  separator: string = "/"
): string => {
  try {
    if (typeof gregorianDate === "string") {
      return moment(gregorianDate, "YYYY/MM/DD")
        .locale("fa")
        .format(`YYYY${separator}MM${separator}DD`);
    }
    try {
      const jalali = jalaali.toJalaali(gregorianDate);
      return jalali.jy + separator + jalali.jm + separator + jalali.jd;
    } catch (e) {
      return "";
    }
  } catch (e) {
    return gregorianDate;
  }
};

export const getJalaliTime = (gregorianDate: any) => {
  try {
    if (typeof gregorianDate === "string") {
      return moment(gregorianDate, "YYYY/MM/DD  hh:mm:ss")
        .locale("fa")
        .format(`hh:mm:ss YYYY/MM/DD`);
    }
    try {
      const jalali = jalaali.toJalaali(gregorianDate);
      return jalali.jy + "/" + jalali.jm + "/" + jalali.jd;
    } catch (e) {
      return "";
    }
  } catch (e) {
    return gregorianDate;
  }
};
export const getJalaliDateTime = (
  gregorianDate: any,
  separator: string = "/"
): string => {
  const localeTime = convertTimeToLocale(gregorianDate);
  try {
    if (typeof localeTime === "string") {
      return moment(localeTime, "YYYY/MM/DD  HH:mm:ss")
        .locale("fa")
        .format(`YYYY${separator}MM${separator}DD HH:mm:ss`);
    }
    try {
      const jalali = jalaali.toJalaali(localeTime);
      return jalali.jy + separator + jalali.jm + separator + jalali.jd;
    } catch (e) {
      return "";
    }
  } catch (e) {
    return localeTime;
  }
};

export const getJalaliDateTime2 = (
  localeTime: any,
  separator: string = "/"
): string => {
  try {
    if (typeof localeTime === "string") {
      return moment(localeTime, "YYYY/MM/DD  HH:mm:ss")
        .locale("fa")
        .format(`HH:mm:ss  YYYY${separator}MM${separator}DD`);
    }
    try {
      const jalali = jalaali.toJalaali(localeTime);
      return jalali.jy + separator + jalali.jm + separator + jalali.jd;
    } catch (e) {
      return "";
    }
  } catch (e) {
    return localeTime;
  }
};
