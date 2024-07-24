import { atom } from "jotai";
import { getCookiesFromServer } from "./severcookiesreq";

// TODO:    rename cookies to match application

export const useratom = atom(async (get) => {
  const user = await getCookiesFromServer("tdating-user");
  return user;
});
