'use server'

import { baseUrl } from "@/utils/axiosInstance";

export const handleGetDataProfileAdmin = async (token: string) => {
    try {
        const res = await fetch(`${baseUrl}/user/detail-user`, {
            cache: 'no-store',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const result = await res.json()
        if (!res.ok) throw new Error('Gagal mengambil data')

        return result
    } catch (error) {
        console.log(error)
        return {}
    }
}