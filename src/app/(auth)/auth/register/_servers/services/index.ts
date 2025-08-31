'use server'

import { baseUrlApi } from "@/app/_clients/utils/axiosInstance"

export const registerAction = async (fd: FormData) => {
    try {
        const data = {
            firstName: fd.get('firstName'),
            lastName: fd.get('lastName'),
            email: fd.get('email'),
            phoneNumber: fd.get('phoneNumber'),
            password: fd.get('password'),
        }

        const res = await fetch(`${baseUrlApi}/user/register-user`, {
            cache: 'no-store',
            headers: {
                "Content-Type": 'application/json',
                'Accept': 'application/json'
            },

            method: 'POST',
            body: JSON.stringify(data)
        })

        const result = await res.json()
        if (!res.ok) throw result

        return result
    } catch (error) {
        return error
    }
}