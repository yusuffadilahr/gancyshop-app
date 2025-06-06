'use server'

import { baseUrl } from "@/utils/axiosInstance"

export const loginAction = async (fd: FormData) => {
    try {
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
        if (!res.ok) throw new Error(result?.message || 'Login gagal')

        return result

    } catch (error) {
        throw error
    }
}