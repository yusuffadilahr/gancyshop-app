'use client'

import { setCookie } from "@/app/_serverside/utils/setCookies"
import { useRouter } from "next/navigation"
import * as React from "react"

export default function Page() {
    const router = useRouter()

    React.useEffect(() => {
        alert('ini refresh')
        setCookie({ data: 'hayyya', cookieName: '_token', expires: (3 / 1440) })
        router.back()
    }, [])

    return <>halaman</>
}