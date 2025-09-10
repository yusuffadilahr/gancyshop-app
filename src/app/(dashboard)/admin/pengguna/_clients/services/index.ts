"use server";

import { baseUrlApi } from "@/app/_clients/utils/axiosInstance";
import { handleRetryForServerAction } from "@/app/_servers/services";
import { cookies } from "next/headers";

export const getDataAllUser = async ({
  page = 1,
  limit = 5,
  search = "",
}: {
  page: number;
  limit: number;
  search: string;
}) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("_token")?.value;

  let res = await fetch(
    baseUrlApi +
      "/admin/all-users" +
      `?page=${page}&limit=${limit}&search=${search}`,
    {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (res.status === 401) {
    res = (await handleRetryForServerAction(token || "", "/user/all-users", {
      method: "GET",
      cache: "no-store",
    })) as Response;
  }

  const result = await res.json();
  if (!res.ok) return result;

  return result;
};

export const deleteDataUser = async (id: number) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("_token")?.value;

    let res = await fetch(baseUrlApi + "/admin/delete-user/" + id, {
      method: "DELETE",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 401) {
      res = (await handleRetryForServerAction(
        token as string,
        "/admin/delete-user/" + id,
        {
          method: "DELETE",
          cache: "no-store",
        }
      )) as Response;
    }

    const result = await res.json();
    if (!res.ok) throw result;

    return result;
  } catch (err) {
    return err;
  }
};
