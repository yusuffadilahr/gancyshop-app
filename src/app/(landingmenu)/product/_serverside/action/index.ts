'use server'

import { baseUrl } from "@/utils/axiosInstance"
import { cookies } from "next/headers"

export const getAllProductPublic = async ({
    search = '',
    page = 1,
    limit = 10
}: {
    search: string
    page: number,
    limit: number
}) => {
    try {
        const token = (await cookies()).get('_token')?.value
        const url = `${baseUrl}/product/all-product`

        const res = await fetch(`${url}?search=${search}&page=${page}&limit=${limit}`, {
            method: 'GET',
            cache: 'no-store',
            headers: {
                'Authorization': `Bearer ${token}`,
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