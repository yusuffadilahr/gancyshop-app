import { useAppDispatch, useAppSelector } from "@/redux/store"
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation"

export const useAppTools = () => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const dispatch = useAppDispatch()
    const profileAdmin = useAppSelector((state) => state.globaltheme.profileAdmin)

    const params = useParams()
    return {
        router,
        pathname,
        searchParams,
        params,
        dispatch,
        profileAdmin
    }
}