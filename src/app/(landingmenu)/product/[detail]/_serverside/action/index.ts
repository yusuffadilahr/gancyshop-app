'use server'

import { baseUrl } from "@/utils/axiosInstance"
import { optionError } from "@/utils/optionError"

export const getDataProductById = async (id: string | undefined) => {
    try {
        if (id) {
            const url = `${baseUrl}/product/single-product/${id}`
            const res = await fetch(url, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": 'application/json',
                },
                cache: 'no-store',
            })

            if (!res.ok) throw new Error('Data tidak tersedia')
            const result = await res.json()

            return result
        }

        throw new Error('Data tidak tersedia')
    } catch (error) {
        if (error) return optionError.errorGetData
    }
}