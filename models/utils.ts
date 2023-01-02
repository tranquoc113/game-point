import { STORAGE_KEY } from "./constants";

export class LocalStorage {

  static get accessAdress() {
    return localStorage.getItem(STORAGE_KEY.ACCESS_ADRESS) || null;
  }

  static get accessPoint(){
      return localStorage.getItem(STORAGE_KEY.POINT) || 0;
  }

  static get accessNameWallet() {
    return localStorage.getItem(STORAGE_KEY.NAME_WALLET) || "";
  }

  static setAddress(address: string) {
    localStorage.setItem(STORAGE_KEY.ACCESS_ADRESS, address);
  }

  static setPoint(point: number) {
    localStorage.setItem(STORAGE_KEY.POINT, String(point));
  }

  static setNameWallet(name: string) {
    localStorage.setItem(STORAGE_KEY.NAME_WALLET, name);
  }

  static removeNameWallet(){
    localStorage.removeItem(STORAGE_KEY.NAME_WALLET)
  }
}

export default LocalStorage;