import { ChangeEvent, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import { checkCharacterValue } from "@/app/_clients/utils/sanitizeInput";
import { ISearchData } from "../types";
import { ReadonlyURLSearchParams } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface IHelperKategoriHooks {
  setSearchData: React.Dispatch<React.SetStateAction<ISearchData>>;
  params: ReadonlyURLSearchParams;
  page: number;
  limit: number;
  searchData: ISearchData;
  pathname: string;
  router: AppRouterInstance;
  refetchGetDataCategory: () => void;
}

export const useHelperKategori = ({
  setSearchData,
  params,
  page,
  limit,
  searchData,
  pathname,
  router,
  refetchGetDataCategory,
}: IHelperKategoriHooks) => {
  const debounce = useDebouncedCallback((val) => {
    setSearchData((prev) => ({ ...prev, debounce: val, loading: false }));
  }, 800);

  useEffect(() => {
    const currentParams = new URLSearchParams(params.toString());
    if (page) {
      currentParams.set("page", page.toString());
    } else {
      currentParams.delete("page");
    }

    if (limit) {
      currentParams.set("limit", limit.toString());
    } else {
      currentParams.delete("limit");
    }

    if (searchData.debounce) {
      currentParams.set("search", searchData.debounce.toString());
    } else {
      currentParams.delete("search");
    }

    const currentPath = `${pathname}?${currentParams.toString()}`;
    router.replace(currentPath);
    refetchGetDataCategory();
  }, [page, limit, searchData.debounce]);

  const handleChangeInputSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (!checkCharacterValue(value) && value.length > 1) return;

    setSearchData((prev) => ({
      ...prev,
      loading: true,
      display: value,
    }));

    debounce(value);
  };

  return { handleChangeInputSearch, debounce };
};
