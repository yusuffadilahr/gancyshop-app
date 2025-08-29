'use server'

import { baseUrl } from "@/app/_clients/utils/axiosInstance"
import { cookies } from "next/headers"

export const handleGetRefreshToken = async () => {
    try {
        const token = await cookies()
        const dataToken = token.get('_refreshToken')?.value
        const refreshToken = await fetch(`${baseUrl}/user/refresh-token/${dataToken}`, {
            credentials: 'include',
            cache: 'no-store',
            method: 'GET'
        })

        const data = await refreshToken?.json()
        if (!refreshToken.ok) return data

        token?.set('_refreshToken', data?.data?.refreshToken, {
            httpOnly: true,
            path: '/',
            maxAge: 604800,
            expires: 7 * 24 * 60 * 60 * 1000
        })

        return data
    } catch (error) {
        console.log(error)
        return ''
    }
}
