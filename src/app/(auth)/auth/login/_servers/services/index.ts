'use server'

import { baseUrlApi } from "@/app/_clients/utils/axiosInstance"
// import { cookies } from "next/headers"

// in server action gabisa buat login karena credentials seperti set cookie dari server/be
// tidak bisa include ke browser client
export const loginAction = async (fd: FormData) => {
    const data = {
        email: fd.get('email'),
        password: fd.get('password')
    }

    const res = await fetch(`${baseUrlApi}/user/login-user`, {
        cache: 'no-store',
        headers: {
            "Content-Type": 'application/json',
            'Accept': 'application/json',
        },

        method: 'POST',
        body: JSON.stringify(data),
        credentials: 'include'
    })

    const result = await res.json()
    if (!res.ok) return result

    return result
}