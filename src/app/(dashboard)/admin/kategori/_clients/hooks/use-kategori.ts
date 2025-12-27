import {
  IGETDataCategory,
  ISearchData,
} from "@/app/(dashboard)/admin/kategori/_clients/types";
import { getCategoryProduct } from "@/app/(dashboard)/admin/kategori/_servers/services";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useKategori = () => {
  const [page, setPage] = useState<number>(1);
  const [searchData, setSearchData] = useState<ISearchData>({
    display: "",
    debounce: "",
    loading: false,
  });

  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const limit = 5;
  const {
    data: dataCategory,
    refetch: refetchGetDataCategory,
    isPending: isLoading,
  } = useQuery<IGETDataCategory>({
    queryKey: ["get-kategori"],
    queryFn: async () => {
      const res = await getCategoryProduct({
        page,
        limit,
        search: searchData?.debounce,
      });
      if (res?.error) return { data: [], totalPage: 1 };
      return res?.data;
    },
  });

  return {
    page,
    setPage,
    searchData,
    setSearchData,
    params,
    pathname,
    router,
    limit,
    dataCategory,
    refetchGetDataCategory,
    isLoading,
  };
};
