'use server'

import { baseUrl } from "@/app/_clients/utils/axiosInstance"
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
        const url = `${baseUrl}/admin/all-products`

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

        const url = `${baseUrl}/admin`
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

export const handleGetDataCategoryMotor = async () => {
    try {
        const token = (await cookies()).get('_token')?.value
        const res = await fetch(`${baseUrl}/category/all-category-motorcycle`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            method: 'GET',
            cache: 'no-store',
        })

        if (!res.status) throw new Error('Data tidak tersedia')
        const result = await res.json()

        return result
    } catch (error) {
        throw error
    }
}

export const handleGetDataCategoryByCategoryMotor = async (categoryMotorId: string) => {
    try {
        const token = (await cookies()).get('_token')?.value
        const res = await fetch(`${baseUrl}/category/all-category/${categoryMotorId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            method: 'GET',
            cache: 'no-store'
        })

        if (!res.ok) throw new Error('Data tidak tersedia')
        const result = await res.json()

        return result
    } catch (error) {
        throw error
    }
}

export const deleteDataProductById = async (idProduct: string) => {
    try {
        const token = (await cookies()).get('_token')?.value
        const res = await fetch(`${baseUrl}/admin/delete-product/${idProduct}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            method: 'PATCH',
            cache: 'no-store',
            body: JSON.stringify({})
        })

        if (!res.ok) throw new Error('Data tidak tersedia')
        const result = await res.json()

        return result
    } catch (error) {
        throw error
    }
}