'use server'

import { baseUrl } from "@/app/_clients/utils/axiosInstance"
import { cookies } from "next/headers"

export const getCategoryProduct = async () => {
    try {
        const token = (await cookies()).get('_token')?.value

        const res = await fetch(`${baseUrl}/category/all-categorys`, {
            cache: 'no-store',
            headers: {
                'Authorization': `Bearer ${token}`
            },

            method: 'GET'
        })

        const result = await res.json()
        console.log(result, '<<')
        if (!res.ok) return result


        return result
    } catch (error) {
        console.log(error)
        return error
    }
}

export const createCategoryAction = async (fd: FormData) => {
    try {
        const data = {
            idCategoryMotor: fd.get('idCategoryMotor'),
            dataMotorOptional: fd.get('motorCycleName'),
            releaseYearOptional: fd.get('releaseYear'),
            categoryName: fd.get('categoryName')
        }

        const token = (await cookies()).get('_token')?.value

        const res = await fetch(`${baseUrl}/category/create-category`, {
            cache: 'no-store',
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            },

            method: 'POST',
            body: JSON.stringify(data)
        })

        if (!res.ok) throw new Error('Ada kesalahan saat proses membuat data')
        const result = await res.json()

        return result
    } catch (error) {
        console.log(error)
        throw error
    }
}