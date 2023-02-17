import { atom } from "recoil";

export const dropdownState = atom<boolean>({
  key: "dropdownState",
  default: false
});
