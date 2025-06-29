import { convertTimeToLocale } from "../../utils/TimeUtils/time";
export function getUTCOfLast24Hours(): string {
  const convertedToUnix = new Date(
    new Date().getTime() - 1 * 24 * 60 * 60 * 1000
  );
  const UNIX_START = Math.round(convertedToUnix.getTime() / 1000);
  const date = new Date(UNIX_START * 1000);
  const utcString = date.toISOString();
  return convertTimeToLocale(utcString);
}

export function getUTCOfLastWeek(): string {
  const convertedToUnix = new Date(
    new Date().getTime() - 7 * 24 * 60 * 60 * 1000
  );
  const UNIX_START = Math.round(convertedToUnix.getTime() / 1000);
  const date = new Date(UNIX_START * 1000);
  const utcString = date.toISOString();
  return convertTimeToLocale(utcString);
}

export function getUTCOfLastMonth(): string {
  const convertedToUnix = new Date(
    new Date().getTime() - 30 * 24 * 60 * 60 * 1000
  );
  const UNIX_START = Math.round(convertedToUnix.getTime() / 1000);
  const date = new Date(UNIX_START * 1000);
  const utcString = date.toISOString();
  return convertTimeToLocale(utcString);
}

export function getUTCOfLastYear(): string {
  const convertedToUnix = new Date(
    new Date().getTime() - 365 * 24 * 60 * 60 * 1000
  );
  const UNIX_START = Math.round(convertedToUnix.getTime() / 1000);
  const date = new Date(UNIX_START * 1000);
  const utcString = date.toISOString();
  return convertTimeToLocale(utcString);
}
export function getUTCOfNow(): string {
  const now = new Date();
  const formattedDate = now.toISOString();
  return convertTimeToLocale(formattedDate);
}

export function getUTCFromUnixStart(): string {
  const unixStart = new Date("2020-01-01");
  const unixTimestamp = Math.round(unixStart.getTime() / 1000);
  const date = new Date(unixTimestamp * 1000);
  const utcString = date.toISOString();
  return convertTimeToLocale(utcString);
}