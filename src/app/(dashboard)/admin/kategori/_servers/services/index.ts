"use server";

import { baseUrlApi } from "@/app/_clients/utils/axiosInstance";
import { handleRetryForServerAction } from "@/app/_servers/services";
import { cookies } from "next/headers";

export const getCategoryProduct = async ({
  page = 1,
  limit = 5,
  search = "",
}: {
  page: number;
  limit: number;
  search: string;
}) => {
  try {
    const token = (await cookies()).get("_token")?.value || "";

    let res = await fetch(
      `${baseUrlApi}/admin/all-categorys?page=${page}&limit=${limit}&search=${search}`,
      {
        cache: "no-store",
        headers: { Authorization: `Bearer ${token}` },

        method: "GET",
      }
    );

    if (res.status === 401) {
      res = (await handleRetryForServerAction(
        token,
        `${baseUrlApi}/admin/all-categorys`,
        {
          cache: "no-store",
          method: "GET",
        }
      )) as Response;
    }

    const result = await res.json();

    if (!res.ok) throw result;

    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const createCategoryAction = async (fd: FormData) => {
  try {
    const data = {
      idCategoryMotor: fd.get("idCategoryMotor"),
      dataMotorOptional: fd.get("motorCycleName"),
      releaseYearOptional: fd.get("releaseYear"),
      categoryName: fd.get("categoryName"),
    };

    const token = (await cookies()).get("_token")?.value || "";
    let res = await fetch(`${baseUrlApi}/admin/create-category`, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },

      method: "POST",
      body: JSON.stringify(data),
    });

    if (res.status === 401) {
      res = (await handleRetryForServerAction(
        token,
        `${baseUrlApi}/admin/create-category`,
        {
          cache: "no-store",
          method: "POST",
          body: JSON.stringify(data),
        }
      )) as Response;
    }

    const result = await res.json();
    if (!res.ok) throw result;

    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateCategory = async (fd: FormData) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("_token")?.value;

    const data = {
      categoryId: fd.get("categoryId")
        ? Number(fd.get("categoryId"))
        : undefined,

      categoryMotorcycleId: fd.get("categoryMotorcycleId")
        ? Number(fd.get("categoryMotorcycleId"))
        : undefined,

      categoryName: fd.get("categoryName"),
    };

    const url = `${baseUrlApi}/admin/update-category`;
    let res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },

      method: "PATCH",
      body: JSON.stringify(data),
    });

    if (res.status === 401) {
      res = (await handleRetryForServerAction(token as string, url, {
        body: JSON.stringify(data),
        method: "PATCH",
      })) as Response;
    }

    const result = await res.json();
    if (!res.ok) throw result;

    return result;
  } catch (error) {
    return error;
  }
};

export const deleteCategoryById = async (id: number) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore?.get("_token")?.value;
    const url = `${baseUrlApi}/admin/delete-category/${id}`;

    let res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },

      method: "DELETE",
    });

    if (res.status === 401) {
      res = (await handleRetryForServerAction(token || "", url, {
        method: "DELETE",
      })) as Response;
    }

    const result = await res.json();
    if (!res.ok) throw result;

    return result;
  } catch (error) {
    return error;
  }
};
