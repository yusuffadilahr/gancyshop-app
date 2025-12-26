"use server";

import { baseUrlApi } from "@/app/_clients/utils/axiosInstance";
import { handleRetryForServerAction } from "@/app/_servers/services";
import { cookies } from "next/headers";

export const getAllProduct = async ({
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

export const updateIsActiveProduct = async (
  fd: FormData,
  idProduct: string
) => {
  try {
    const data = { isActive: fd.get("isActive") };

    const token = (await cookies()).get("_token")?.value;

    const url = `${baseUrlApi}/admin`;
    let res = await fetch(`${url}/update-is-active/${idProduct}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },

      body: JSON.stringify(data),
      cache: "no-store",
      method: "PATCH",
    });

    if (res.status === 401) {
      res = (await handleRetryForServerAction(
        token as string,
        `${url}/update-is-active/${idProduct}`,
        {
          body: JSON.stringify(data),
          cache: "no-store",
          method: "PATCH",
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

export const handleGetDataCategoryMotor = async () => {
  try {
    const token = (await cookies()).get("_token")?.value;
    let res = await fetch(`${baseUrlApi}/category/all-category-motorcycle`, {
      headers: { Authorization: `Bearer ${token}` },
      method: "GET",
      cache: "no-store",
    });

    if (res.status === 401) {
      res = (await handleRetryForServerAction(
        token as string,
        `${baseUrlApi}/category/all-category-motorcycle`,
        {
          method: "GET",
          cache: "no-store",
        }
      )) as Response;
    }

    const result = await res.json();
    if (!res.status) throw result;

    return result;
  } catch (error) {
    return error;
  }
};

export const handleGetDataCategoryByCategoryMotor = async (
  categoryMotorId: string
) => {
  try {
    const token = (await cookies()).get("_token")?.value;
    let res = await fetch(
      `${baseUrlApi}/category/all-category/${categoryMotorId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        method: "GET",
        cache: "no-store",
      }
    );

    if (res.status === 401) {
      res = (await handleRetryForServerAction(
        token as string,
        `${baseUrlApi}/category/all-category/${categoryMotorId}`,
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
    return error;
  }
};

export const deleteDataProductById = async (idProduct: string) => {
  try {
    const token = (await cookies()).get("_token")?.value;
    let res = await fetch(`${baseUrlApi}/admin/delete-product/${idProduct}`, {
      headers: { Authorization: `Bearer ${token}` },
      method: "PATCH",
      cache: "no-store",
      body: JSON.stringify({}),
    });

    if (res.status === 401) {
      res = (await handleRetryForServerAction(
        token as string,
        `${baseUrlApi}/admin/delete-product/${idProduct}`,
        {
          method: "PATCH",
          cache: "no-store",
          body: JSON.stringify({}),
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
