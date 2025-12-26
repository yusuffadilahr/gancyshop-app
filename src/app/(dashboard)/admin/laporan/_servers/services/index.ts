"use server";

import { baseUrlApi } from "@/app/_clients/utils/axiosInstance";
import { handleRetryForServerAction } from "@/app/_servers/services";
import { cookies } from "next/headers";

export const getProductData = async ({
  search = "",
  page = "1",
  limit = "10",
}) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("_token")?.value;

    let res = await fetch(
      `${baseUrlApi}/admin/all-products?search=${search}&page=${page}&limit=${limit}`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    if (res.status === 401) {
      res = (await handleRetryForServerAction(
        token as string,
        `${baseUrlApi}/admin/all-products?search=${search}&page=${page}&limit=${limit}`,
        {
          method: "GET",
          cache: "no-store",
          credentials: "include",
        }
      )) as Response;
    }

    if (!res.ok) return [];
    const result = await res.json();

    return result;
  } catch (error) {
    console.error(error);
    return [];
  }
};
