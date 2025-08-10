'use server'

import { cookies } from "next/headers"

export const clearCookies = async () => {
    const cookie = await cookies()
    cookie.delete('_refreshToken')
    cookie.delete('_token')
    cookie.delete('_role')
}