'use server'

import { baseUrl } from "@/utils/axiosInstance"
import { cookies } from "next/headers"

export const loginAction = async (fd: FormData) => {
    const data = {
        email: fd.get('email'),
        password: fd.get('password')
    }

    const res = await fetch(`${baseUrl}/user/login-user`, {
        cache: 'no-store',
        headers: {
            "Content-Type": 'application/json',
            'Accept': 'application/json'
        },

        method: 'POST',
        body: JSON.stringify(data)
    })

    const result = await res.json()
    if (!res.ok) return result

    const cookieStore = await cookies()
    cookieStore.set('_refreshToken', result?.data?.refreshToken, {
        httpOnly: true,
        path: '/',
        maxAge: 604800,
        expires: 7 * 24 * 60 * 60 * 1000
    })


    return result
}