"use server";

import { baseUrlApi } from "@/app/_clients/utils/axiosInstance";
// import { cookies } from "next/headers"

export const getAllProductPublic = async ({
  search = "",
  page = 1,
  limit = 10,
  category = "",
  tanggal = "",
  minPrice = "",
  maxPrice = "",
  minWeight = "",
  maxWeight = "",
  stock = "",
}: {
  search: string;
  page: number;
  limit: number;
  category?: string;
  tanggal?: string;
  minPrice?: string;
  maxPrice?: string;
  minWeight?: string;
  maxWeight?: string;
  stock?: string;
}) => {
  try {
    const url = `${baseUrlApi}/product/all-product`;

    const res = await fetch(
      `${url}?search=${search}&page=${page}&limit=${limit}&category=${category}&tanggalDibuat=${tanggal}&minPrice=${minPrice}&maxPrice=${maxPrice}&minWeight=${minWeight}&maxWeight=${maxWeight}&stock=${stock}`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await res.json();
    console.log(result, "<<");
    if (!res.ok) throw result

    return result;
  } catch (error) {
    if (error) return [];
  }
};
