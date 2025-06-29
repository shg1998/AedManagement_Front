import { Typography } from "@mui/material";
import CVSSScore from "../../components/CVSSScore/CVSSScore";
import { isEqual } from "lodash";
import EventSeverity from "../../components/EventSeverity/EventSeverity";
import axios from "axios";
export const convertObjectToIdList = (data: any[]) => {
  if (data?.length > 0) {
    if (data[0].id) {
      let res: any[] = [];
      data?.forEach((d) => {
        res.push(d.id);
      });
      return res;
    } else return data;
  }
  return [];
};

export const getBoldContent = (item: any) => {
  return <Typography sx={{ fontWeight: "bold" }}>{item}</Typography>;
};

export const showScore = (score: number) => {
  return <CVSSScore score={score} />;
};
export const showSeverity = (severity: string, title?: string) => {
  return <EventSeverity severity={severity} title={title} />;
};

export const getLabelImportanceTitle = (
  importanceVal: any,
  nameVal: string
) => {
  switch (importanceVal) {
    case 1:
      return showSeverity("low", nameVal);
    case 2:
      return showSeverity("medium", nameVal);
    case 3:
      return showSeverity("high", nameVal);
    default:
      return "";
  }
};

export const convertToCamelCase = (inputString: string) => {
  return inputString?.replace(/-([a-z])/g, function (match, group1) {
    return group1.toUpperCase();
  });
};

export const replaceEmptyStringWithNull = (obj: any) => {
  for (let key in obj) {
    if (typeof obj[key] === "string" && obj[key] === "") {
      obj[key] = null;
    } else if (typeof obj[key] === "object" && obj[key] !== null) {
      replaceEmptyStringWithNull(obj[key]); // Recursively handle nested objects
    }
  }

  return obj;
};
export const areObjectsEquivalent = (obj1: any, obj2: any) => {
  if (obj1 === obj2) {
    return true;
  }

  if (
    typeof obj1 !== "object" ||
    typeof obj2 !== "object" ||
    obj1 === null ||
    obj2 === null
  ) {
    return false;
  }

  const keys1 = Object.keys(obj1)?.sort();
  const keys2 = Object.keys(obj2)?.sort();

  if (keys1?.length !== keys2?.length) {
    return false;
  }

  for (let i = 0; i < keys1?.length; i++) {
    const key = keys1[i];

    if (key !== keys2[i]) {
      return false;
    }

    if (key === "permissions") {
      const sortedPermissions1 = obj1[key].sort((a: any, b: any) =>
        JSON.stringify(a).localeCompare(JSON.stringify(b))
      );
      const sortedPermissions2 = obj2[key].sort((a: any, b: any) =>
        JSON.stringify(a).localeCompare(JSON.stringify(b))
      );

      if (!areObjectsEquivalent(sortedPermissions1, sortedPermissions2)) {
        return false;
      }
    } else {
      if (!areObjectsEquivalent(obj1[key], obj2[key])) {
        return false;
      }
    }
  }

  return true;
};
export const checkArrayTypes = (array_types: []): string => {
  return array_types ? returnSubstringMsg(array_types.join(" , ")) : "-";
};

export const seprateThousandPrice = (price: number) => {
  return price.toLocaleString("en-US");
};

export const checkOnlyEnglishWords = /^[~`!@#$%^&*()_+=[\]\{}|;':",.\/<>?a-zA-Z\s0-9-]+$/;

export const returnSubstringMsg = (text:any) => {
  return text.length > 19 ? (checkOnlyEnglishWords.test(text) ? ('...' + text.substring(0,19)) : text.substring(0,19) + '...') : text
}

export function formatNumber(num: number): string {
  const numStr = num.toString();
  return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export  function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "…";
}

export const getStatus = (stat: string): string | undefined => {
  switch (stat) {
    case 'Pass':
      return 'success';
    case 'Fail':
      return 'error';
    case 'Disconnected':
      return 'warning';
    case 'NoWifi':
      return 'noWifi';
  }
}