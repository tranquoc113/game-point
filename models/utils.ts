import { STORAGE_KEY } from "./constants";

export class LocalStorage {

  static get accessAdress() {
    return localStorage.getItem(STORAGE_KEY.ACCESS_ADRESS) || null;
  }

  static get accessPoint() {
    return localStorage.getItem(STORAGE_KEY.POINT) || 0;
  }

  static setAddress(address: string) {
    localStorage.setItem(STORAGE_KEY.ACCESS_ADRESS, address);
  }

  static setPoint(point: number) {
    localStorage.setItem(STORAGE_KEY.POINT, String(point));
  }
}

export default LocalStorage;