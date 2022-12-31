import { createContext } from "react";
import { User } from "./auth";

export const STORAGE_KEY = {
  ACCESS_ADRESS: "access_address",
  POINT: "point",
  NAME_WALLET: "name_wallet"
};
export const isBrowser = (): boolean => {
  return typeof window !== 'undefined'
}

export const nextLocalStorage = (): Storage | void => {
  if (isBrowser()) {
    return window.localStorage
  }
}