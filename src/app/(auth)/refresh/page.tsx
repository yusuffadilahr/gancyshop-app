import { Spinner } from "@/components/ui/spinner"
import dynamic from "next/dynamic"

const DynamicBodyRefreshLayout = dynamic(() => import('./_clients/components/refreshLayout'), {
    loading: () => <Spinner />
})
export default async function Page() {
    return (
        <DynamicBodyRefreshLayout />
    )
}   