'use client'

import { useRouter } from "next/navigation";
import * as React from "react"
import { setCookie } from "@/app/_servers/utils/setCookies";

export default function RefreshToken({ newToken }: { newToken?: { accessToken: string; refreshToken: string } }) {
    const router = useRouter()
    React.useEffect(() => {
        if (newToken) {
            setCookie({ cookieName: '_token', data: newToken?.accessToken, expires: 0.5 })
            router.back()
        }
    }, [newToken])

    return null
}