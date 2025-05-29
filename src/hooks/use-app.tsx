import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation"

export const useAppTools = () => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const params = useParams()
    return {
        router,
        pathname,
        searchParams,
        params
    }
}