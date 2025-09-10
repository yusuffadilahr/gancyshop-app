"use server";

import { cookies } from "next/headers";

export const clearCookies = async () => {
  const cookieStore = await cookies();

  cookieStore.delete({
    name: "_refreshToken",
    domain:
      process.env.NODE_ENV === "production" ? ".gancy.my.id" : "localhost",
  });

  cookieStore.delete({ name: "_token" });
  cookieStore.delete({ name: "_loggedIn" });
  cookieStore.delete({ name: "_rl" });
};
