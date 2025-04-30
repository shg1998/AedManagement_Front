// @ts-ignore
import CryptoJS from "crypto-js";
const SECRET = "vzCDrMA7xLS8Xzyk";

export const setItemSecure = (key: string, value: any): void => {
  let encrypted: any = CryptoJS.AES.encrypt(
    value.toString(CryptoJS.enc.Utf8),
    SECRET + key
  );
  localStorage.setItem(key, encrypted);
};

export const getItemSecure = (key: string): string | null => {
  const data = localStorage.getItem(key);
  if (data != null)
    return CryptoJS.AES.decrypt(data, SECRET + key).toString(CryptoJS.enc.Utf8);
  return data;
};

export const deleteItemSecure = (key: string): void => {
  localStorage.removeItem(key);
};