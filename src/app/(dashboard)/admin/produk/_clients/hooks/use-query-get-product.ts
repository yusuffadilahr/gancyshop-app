import { getAllProduct } from "@/app/(dashboard)/admin/produk/_servers/services";
import { useQuery } from "@tanstack/react-query";

interface IQueryGetProductHooks {
  searchData: string;
  limit: string;
  page: string;
}

export const useQueryGetProduct = ({
  searchData,
  limit,
  page,
}: IQueryGetProductHooks) => {
  const {
    data: dataTable,
    refetch,
    isLoading: isLoadingGetData,
  } = useQuery({
    queryKey: ["get-data-product"],
    queryFn: async () => {
      const res = await getAllProduct({
        search: searchData,
        limit,
        page,
      });

      if (res?.error) throw res;
      return res?.data;
    },
  });
  return {
    dataTable,
    refetch,
    isLoadingGetData,
  };
};
