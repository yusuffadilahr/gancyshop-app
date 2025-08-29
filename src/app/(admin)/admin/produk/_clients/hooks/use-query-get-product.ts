import { getAllProduct } from "@/app/(admin)/admin/produk/_servers/services"
import { useQuery } from "@tanstack/react-query"

export const useQueryGetProduct = ({ searchData, limit, page }: {
    searchData: string,
    limit: string,
    page: string
}) => {
    const { data: dataTable, refetch } = useQuery({
        queryKey: ['get-data-product'],
        queryFn: async () => {
            const res = await getAllProduct({
                search: searchData,
                limit,
                page
            })

            return res?.data
        },
    })
    return {
        dataTable, refetch
    }
}