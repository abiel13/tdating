"use server";

import { cookies } from "next/headers";

export async function getCookies(name: string) {
  const saved = cookies().get(name);

  return saved;
}
