import { IDataProduk } from "@/app/(admin)/admin/produk/_clients/types";
import CardProduct from "@/components/core/cardProduct";
import Link from "next/link";

export default function SectionProduct({ dataProduct }: { dataProduct: IDataProduk[] | undefined }) {
    return (
        <div className="px-2 md:px-5 space-y-5 pt-4">
            <h1 className="font-semibold text-2xl">Produk Kami</h1>
            <div className="flex w-full h-full">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2 w-full h-fit">
                    {dataProduct?.map((item, idx) => (
                        <Link key={idx} href='/product'>
                            <CardProduct categoryName={item?.category?.categoryName}
                                imageAlt="Product" imageUrl={item?.imageUrl || ''}
                                productCreatedAt={item?.createdAt || ''}
                                productIsActive={item?.isActive} productName={item?.name}
                                productPrice={item?.price} productStock={item?.stock}
                                productWeight={item?.weightGram}

                                customButton={<div />} />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}