import { IDataProduk } from "@/app/(admin)/admin/produk/_clientside/types";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function CardProduct({ dataProduct }: { dataProduct: IDataProduk[] | undefined }) {
    return (
        <div className="px-5 space-y-5 pt-4">
            <h1 className="font-semibold text-2xl">Produk Kami</h1>
            <div className="flex w-full h-full">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2 m-auto w-fit h-fit">
                    {dataProduct?.map((item, i) => (
                        <div key={i} className="w-fit border pb-5 relative">
                            <div className="absolute px-2 py-5 inset-0">
                                <div className="w-full flex justify-end">
                                    <h1 className={`
                                        ${item.stock < 10 ? 'bg-red-200' :
                                            item.stock === 0 ? 'bg-red-200' :
                                                'bg-green-200'} px-3 rounded-xl w-fit text-xs
                                                     py-1 font-semibold`}>
                                        {item.stock < 10 ? 'Stock Menipis' :
                                            item.stock === 0 ? 'Stock Habis' :
                                                'Masih Tersedia'}
                                    </h1>
                                </div>
                            </div>
                            <Image alt="img" className="w-[100vw]"
                                src={item.imageUrl} width={500} height={500} />
                            <div className="self-center text-center" style={{ justifySelf: 'center' }}>
                                <h1 className="font-semibold flex-wrap">{item.name}</h1>
                                <p className="text-neutral-400 flex-wrap text-sm">{item.category.categoryName}</p>
                            </div>
                            <div className="w-full justify-center flex py-5">
                                <Link href={'/product'} className="z-20">
                                    <Button variant={"outline"} className="rounded-xl">
                                        Lihat Selengkapnya
                                        <FaArrowRight /></Button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}