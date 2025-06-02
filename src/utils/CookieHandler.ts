// @ts-ignore
import CryptoJS from "crypto-js";
const SECRET = "vzCDrMA7xLS8Xzyk";

export const cookieCreator = (cookieName: string, cookieValue: any) => {
  let encryptedCookieValue: any = CryptoJS.AES.encrypt(
    cookieValue.toString(CryptoJS.enc.Utf8),
    SECRET + cookieName
  );
  document.cookie = cookieName + " = " + encryptedCookieValue;
};

export const getCookie = (name: string) => {
  let match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match
    ? CryptoJS.AES.decrypt(match[2], SECRET + name).toString(CryptoJS.enc.Utf8)
    : "";
};

export const removeCookie = (cookieName: string) => {
  document.cookie = `${cookieName}=; Max-Age=0;secure";}`;
};
