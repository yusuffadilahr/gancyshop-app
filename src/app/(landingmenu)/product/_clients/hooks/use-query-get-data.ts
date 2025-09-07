import { ICategoryProduct, IProductPublic, IValueOnChange } from "@/app/(landingmenu)/product/_clients/types";
import { useQuery } from "@tanstack/react-query"
import { getAllProductPublic } from "@/app/(landingmenu)/product/_servers/services"
import axios from "axios"
import { baseUrlApi } from "@/app/_clients/utils/axiosInstance"

interface IQueryGetDataHooks {
    valueOnChange: IValueOnChange
    page: number;
    limit: number;
    datePicker?: Date;
}

export const useQueryGetData = ({
    valueOnChange,
    page,
    limit,
    datePicker
}: IQueryGetDataHooks) => {
    const { data: dataGetProduct, refetch,
        isLoading: isLoadingGetProduct } = useQuery<{ totalPage: number; data: IProductPublic[] }>({
            queryKey: ['get-all-product', valueOnChange?.searchProduct, page, limit, valueOnChange?.kategoriId],
            queryFn: async () => {
                const dataArgs = {
                    search: valueOnChange?.searchProduct || '',
                    page: page || 1,
                    limit: limit || 8,
                    category: valueOnChange?.kategoriId && valueOnChange?.kategoriId !== 'all' ? valueOnChange?.kategoriId : '',
                    tanggal: datePicker?.toLocaleDateString() || '',
                    minPrice: (valueOnChange?.minPrice && valueOnChange?.minPrice !== '0') ? valueOnChange?.minPrice : '',
                    maxPrice: (valueOnChange?.maxPrice && valueOnChange?.maxPrice !== '0') ? valueOnChange?.maxPrice : '',
                    minWeight: (valueOnChange?.minWeight && valueOnChange?.minWeight !== '0') ? valueOnChange?.minWeight : '',
                    maxWeight: (valueOnChange?.maxWeight && valueOnChange?.maxWeight !== '0') ? valueOnChange?.maxWeight : '',
                    stock: (valueOnChange?.stock && valueOnChange?.stock !== 'all') ? valueOnChange?.stock : '',
                }

                const response = await getAllProductPublic(dataArgs)

                const dataProduct = response?.data?.data || []
                const result = {
                    totalPage: response?.data?.totalPage || 1,
                    data: dataProduct
                };

                return result
            }
        })

    const { data: dataCategory,
        isLoading: isLoadingGetCategory } = useQuery<ICategoryProduct[]>({
            queryKey: ['get-data-category'],
            queryFn: async () => {
                const response = await axios.get(`${baseUrlApi}/category/all-category-product`, {
                    headers: {
                        "Accept": 'application/json',
                        'Content-Type': 'application/json',
                        'Cache-Control': 'no-store'
                    }
                })

                return response?.data?.data
            }
        })

    return {
        dataGetProduct, refetch, isLoadingGetProduct,
        dataCategory, isLoadingGetCategory
    }
}
