'use client'

import { useRouter } from "next/navigation";
import * as React from "react"
import { setCookie } from "@/app/_serverside/utils/setCookies";

export default function RefreshToken({ newToken }: { newToken?: { accessToken: string; refreshToken: string } }) {
    const router = useRouter()
    React.useEffect(() => {
        if (!newToken) return

        setCookie({ cookieName: '_token', data: newToken?.accessToken, expires: 15 / (60 * 24) })
        router.back()
    }, [])

    return null
}