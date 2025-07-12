import { Spinner } from "@/components/ui/spinner";
import { default as nextDynamic } from "next/dynamic";

const DynamicBodyProductPage = nextDynamic(() => import('./_clientside/components/bodyProduct'), {
    loading: () => <Spinner />
})

export default function page() {
    return <DynamicBodyProductPage />
}