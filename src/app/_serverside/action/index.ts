'use server'
import { baseUrl } from "@/utils/axiosInstance"

export const getAllDataProductPublic = async () => {
    try {
        const res = await fetch(`${baseUrl}/product/all-product`, {
            cache: 'no-store',
            method: 'GET'
        })

        if (!res.ok) throw new Error('Data tidak tersedia')
        const result = await res.json()

        return result
    } catch (error) {
        console.log(error, '<< error get')
        throw error
    }
}