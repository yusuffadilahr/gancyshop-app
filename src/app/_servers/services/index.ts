"use server";

import { baseUrlApi } from "@/app/_clients/utils/axiosInstance";
import { cookies } from "next/headers";

export const getAllDataProductPublic = async () => {
  try {
    const res = await fetch(`${baseUrlApi}/product/all-product`, {
      cache: "no-store",
      method: "GET",
    });

    if (!res.ok) throw new Error("Data tidak tersedia");
    const result = await res.json();

    return result;
  } catch (error) {
    console.log(error, "<< error get");
    return [];
  }
};

export const getAllDataProductBySearch = async (searchData: string) => {
  try {
    const res = await fetch(
      `${baseUrlApi}/product/all-product?search=${searchData || ""}`,
      {
        cache: "no-store",
        method: "GET",
      }
    );

    if (!res.ok) throw new Error("Data tidak tersedia");
    const result = await res.json();

    return result;
  } catch (error) {
    throw error;
  }
};

export const handleRefreshToken = async (): Promise<string | null> => {
  const tokenStore = await cookies();
  const tokenRefresh = tokenStore.get("_refreshToken")?.value;

  if (!tokenRefresh) return null;

  const resp = await fetch(`${baseUrlApi}/auth/refresh`, {
    method: "GET",
    headers: { Cookie: tokenStore.toString() },
    cache: "no-store",
    credentials: "include",
  });

  if (!resp.ok) return null;
  const data = await resp.json();

  return data?.data.accessToken;
};

export const handleRetryForServerAction = async (
  token: string,
  url: string,
  options: RequestInit
) => {
  const cookieStore = await cookies();
  const newToken = await handleRefreshToken();
  if (!newToken) return [];

  token = newToken;
  cookieStore.set({
    name: "_token",
    value: newToken,
    path: "/",
    maxAge: 60 * 60 * 24,
    sameSite: "lax",
  });

  const res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${newToken}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return res;
};

export const handleGetProfile = async (token: string) => {
  try {
    let res = await fetch(`${baseUrlApi}/user/detail-user`, {
      cache: "no-store",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 401) {
      res = (await handleRetryForServerAction(
        token,
        `${baseUrlApi}/user/detail-user`,
        {
          method: "GET",
          cache: "no-store",
        }
      )) as Response;
    }

    const result = await res.json();
    if (!res.ok) throw result;

    return result;
  } catch (error) {
    console.log(error);
    return {};
  }
};
