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

import { AppWallet } from '@meshsdk/core';
import { BlockfrostProvider } from '@meshsdk/core';
export const blockchainProvider = new BlockfrostProvider('preprodsrIncUaXn1KG93CZRnn28HNN8wrZPx5k');
export const my_wallet = new AppWallet({
    networkId: 0,
    fetcher: blockchainProvider,
    submitter: blockchainProvider,
    key: {
        type: 'mnemonic',
        words: ['energy', 'note', 'snack', 'kingdom', 'search', 'miss', 'wood', 'increase', 'around', 'light', 'pelican', 'pitch', 'found', 'pride', 'fabric', 'intact', 'sudden', 'genuine', 'ordinary', 'near', 'bread', 'zebra', 'popular', 'ignore'],
    },
});