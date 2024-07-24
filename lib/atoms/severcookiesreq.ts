"use server";

import { cookies } from "next/headers";

export async function getCookiesFromServer(cookiename: string) {
  return cookies().get(cookiename);
}
