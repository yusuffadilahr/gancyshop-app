'use server'

import { cookies } from "next/headers"

export const getAllProduct = async ({
    search = '',
    page = '1',
    limit = '10'
}: {
    search: string
    page: string,
    limit: string
}) => {
    try {
        const token = (await cookies()).get('_token')?.value
        const url = 'http://localhost:8000/api/admin/all-products'

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

export const updateIsActiveProduct = async (fd: FormData, idProduct: string) => {
    try {
        const data = {
            isActive: fd.get('isActive')
        }

        const token = (await cookies()).get('_token')?.value

        const url = 'http://localhost:8000/api/admin'
        const res = await fetch(`${url}/update-is-active/${idProduct}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            },

            body: JSON.stringify(data),
            cache: 'no-store',
            method: 'PATCH'
        })

        const result = await res.json()
        if (!res.ok) throw new Error('Gagal memperbaharui produk')
        
        return result

    } catch (error) {
        throw error
    }
}