import { getAllProduct } from "@/app/(dashboard)/admin/produk/_servers/services"
import { useQuery } from "@tanstack/react-query"

export const useQueryGetProduct = ({ searchData, limit, page }: {
    searchData: string,
    limit: string,
    page: string
}) => {
    const { data: dataTable, refetch, isLoading: isLoadingGetData } = useQuery({
        queryKey: ['get-data-product'],
        queryFn: async () => {
            const res = await getAllProduct({
                search: searchData,
                limit,
                page
            })

            if (res.error) throw res
            return res?.data
        },
    })
    return {
        dataTable, refetch, isLoadingGetData
    }
}