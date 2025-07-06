import { Spinner } from "@/components/ui/spinner";
import { default as nextDynamic } from "next/dynamic";

const DynamicAllProduct = nextDynamic(() => import('./_serverside/components/allCardProduct'), {
    loading: () => <Spinner />
})

export default async function page({ searchParams }: { searchParams?: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const dataParams = await searchParams
    const page = dataParams?.page
    const limit = dataParams?.limit
    const search = dataParams?.search

    return <DynamicAllProduct page={Number(page) || 1} limit={Number(limit) || 10}
        search={search as string || ""} />
}