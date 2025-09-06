"use server";

import { handleRetryForServerAction } from "@/app/_servers/services";
import { cookies } from "next/headers";

const baseUrlApi = process.env.NEXT_PUBLIC_BASE_URL_API || "";
export const getShoppingCart = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("_token")?.value;
  const url = baseUrlApi + "/cart/cart-user";

  let res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    method: "GET",
    cache: "no-store",
  });

  if (res.status === 401) {
    res = (await handleRetryForServerAction(token as string, url, {
      method: "GET",
      cache: "no-store",
    })) as Response;
  }

  const result = await res.json();
  if (!res.ok) return result;

  return result;
};
