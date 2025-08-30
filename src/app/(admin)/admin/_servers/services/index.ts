'use server'

import { baseUrlApi } from "@/app/_clients/utils/axiosInstance";
import { handleRetryForServerAction } from "@/app/_servers/services";

export const handleGetDataProfileAdmin = async (token: string) => {
    try {
        let res = await fetch(`${baseUrlApi}/user/detail-user`, {
            cache: 'no-store',
            headers: { Authorization: `Bearer ${token}` }
        });

        if (res.status === 401) {
            res = await handleRetryForServerAction(token, `${baseUrlApi}/user/detail-user`, {
                method: 'GET',
                cache: 'no-store'
            }) as Response
        }

        const result = await res.json()
        if (!res.ok) throw result;

        return result
    } catch (error) {
        console.log(error)
        return {}
    }
}