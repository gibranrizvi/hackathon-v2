import { atom } from "recoil";

export const usersAtom = atom({
  key: "usersState",
  default: [],
});
