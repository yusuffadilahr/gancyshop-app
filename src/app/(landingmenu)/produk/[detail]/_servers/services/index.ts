"use server";

import { baseUrlApi } from "@/app/_clients/utils/axiosInstance";
import { optionError } from "@/app/_clients/utils/optionError";
import { handleRetryForServerAction } from "@/app/_servers/services";
import { cookies } from "next/headers";

export const getDataProductById = async (id: string | undefined) => {
  try {
    if (!id) throw new Error("Data tidak tersedia");
    const cookieStore = await cookies();
    const token = cookieStore.get("_token")?.value;

    const url = `${baseUrlApi}/product/single-product/${id}`;
    let res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
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
    if (!res.ok) return optionError.errorGetData;

    return result;
  } catch (error) {
    console.log(error);
    return optionError.errorGetData;
  }
};

export const addToCart = async (fd: FormData) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("_token")?.value;
    const data = {
      productId: fd.get("productId"),
      quantity: fd.get("quantity"),
      price: fd.get("price"),
    };

    let res = await fetch(baseUrlApi + "/cart/add-to-cart", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      cache: "no-store",
      body: JSON.stringify(data),
    });

    if (res.status === 401) {
      res = (await handleRetryForServerAction(
        token as string,
        baseUrlApi + "/cart/add-to-cart",
        {
          method: "POST",
          cache: "no-store",
          body: JSON.stringify(data),
        }
      )) as Response;
    }

    const result = await res.json();
    if (!res.ok) throw result;

    return result;
  } catch (error) {
    return error;
  }
};
