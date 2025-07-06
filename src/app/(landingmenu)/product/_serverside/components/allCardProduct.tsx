import BodyProduct from "@/app/(landingmenu)/product/_clientside/components/bodyProduct";
import { IProductPublic } from "@/app/(landingmenu)/product/_clientside/types";
import { getAllProductPublic } from "@/app/(landingmenu)/product/_serverside/action";

export default async function AllCardProduct({ search, page, limit }: { search: string, page: number, limit: number }) {
    const products: IProductPublic[] = (await getAllProductPublic({ search, page, limit }))?.data

    return <BodyProduct products={products} />
}