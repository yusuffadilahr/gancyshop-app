'use server'

import { baseUrlApi } from "@/app/_clients/utils/axiosInstance"
import { handleRetryForServerAction } from "@/app/_servers/services"
import { cookies } from "next/headers"

export const getCategoryProduct = async ({ page = 1, limit = 5, search = '' }: { page: number; limit: number, search: string }) => {
    try {
        const token = (await cookies()).get('_token')?.value || ''
        console.log(search);

        let res = await fetch(`${baseUrlApi}/category/all-categorys?page=${page}&limit=${limit}&search=${search}`, {
            cache: 'no-store',
            headers: { 'Authorization': `Bearer ${token}` },

            method: 'GET'
        })

        if (res.status === 401) {
            res = await handleRetryForServerAction(token,
                `${baseUrlApi}/category/all-categorys`,
                {
                    cache: 'no-store',
                    method: 'GET'
                }
            ) as Response
        }

        const result = await res.json()
        if (!res.ok) throw result

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

        const token = (await cookies()).get('_token')?.value || ''
        let res = await fetch(`${baseUrlApi}/category/create-category`, {
            cache: 'no-store',
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            },

            method: 'POST',
            body: JSON.stringify(data)
        })

        if (res.status === 401) {
            console.log('trigger');

            res = await handleRetryForServerAction(token,
                `${baseUrlApi}/category/create-category`,
                {
                    cache: 'no-store',
                    method: 'POST',
                    body: JSON.stringify(data)
                }
            ) as Response
        }

        const result = await res.json()
        if (!res.ok) throw result

        return result
    } catch (error) {
        console.log(error)
        return error
    }
}