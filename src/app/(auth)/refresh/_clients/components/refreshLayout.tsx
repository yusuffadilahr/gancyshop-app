'use client'

import { handleGetRefreshToken } from "@/app/(auth)/refresh/_servers/services"
import RefreshToken from "./refreshToken"
import { useQuery } from "@tanstack/react-query"
import React from "react"

export default function RefreshLayout() {
    const { data } = useQuery({
        queryKey: ['get-token'],
        queryFn: async () => {
            return await handleGetRefreshToken()
        }
    })

    return <RefreshToken newToken={data?.data || undefined} />
}