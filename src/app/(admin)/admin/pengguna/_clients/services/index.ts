'use server'

import { handleRetryForServerAction } from "@/app/_servers/services"
import { cookies } from "next/headers"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_API || ''
export const getDataAllUser = async ({ page = 1, limit = 5, search = '' }: { page: number; limit: number; search: string }) => {
    const cookieStore = await cookies()
    const token = cookieStore.get('_token')?.value


    let res = await fetch(baseUrl + '/admin/all-users' + `?page=${page}&limit=${limit}&search=${search}`, {
        method: 'GET',
        cache: 'no-store',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    if (res.status === 401) {
        res = await handleRetryForServerAction(token || '', '/user/all-users', {
            method: 'GET',
            cache: 'no-store',
        }) as Response
    }

    const result = await res.json()
    if (!res.ok) return result

    return result
}