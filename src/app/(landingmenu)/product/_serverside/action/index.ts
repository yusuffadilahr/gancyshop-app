'use server'

import { baseUrl } from "@/utils/axiosInstance"
// import { cookies } from "next/headers"

export const getAllProductPublic = async ({
    search = '',
    page = 1,
    limit = 10,
    category = ''
}: {
    search: string
    page: number,
    limit: number,
    category?: string
}) => {
    try {
        const url = `${baseUrl}/product/all-product`

        const res = await fetch(`${url}?search=${search}&page=${page}&limit=${limit}&category=${category}`, {
            method: 'GET',
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const result = await res.json()
        if (!res.ok) throw new Error('Gagal mendapatkan data')

        return result
    } catch (error) {
        if (error) return []
    }
}
