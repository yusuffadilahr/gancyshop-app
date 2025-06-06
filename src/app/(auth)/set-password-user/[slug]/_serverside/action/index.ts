'use server'

import { baseUrl } from "@/utils/axiosInstance"

export const setPasswordAction = async (fd: FormData, tokenRequest: string) => {
    try {
        const data = { password: fd.get('password') }

        const res = await fetch(`${baseUrl}/user/set-password-user`, {
            headers: {
                'Authorization': `Bearer ${tokenRequest}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },

            cache: 'no-store',
            method: 'POST',
            body: JSON.stringify(data)
        })

        const result = await res.json()
        if (!res.ok) throw new Error(result?.message || 'Ubah Password Gagal')

        return result
    } catch (error) {
        throw error
    }
}