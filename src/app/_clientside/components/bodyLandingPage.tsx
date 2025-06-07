'use client';
import { IDataProduk } from "@/app/(admin)/admin/produk/_clientside/types";
import CardSection from "@/app/_clientside/components/cardSection";
import CarouselSection from "@/app/_clientside/components/carouselSection";
import { getAllDataProductPublic } from "@/app/_serverside/action";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { Spinner } from "@/components/ui/spinner";
import CardPlatform from "@/app/_clientside/components/cardPlatform";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function BodyLanding() {

    const { data: dataProduct, isPending } = useQuery<IDataProduk[], Error>({
        queryKey: ['data-products'],
        queryFn: async () => {
            const res = await getAllDataProductPublic()
            return res.data
        }
    })

    React.useEffect(() => {
        console.log('Welcome, Diddy!')
    }, [])

    return (
        <div className="pb-20 px-4 min-h-screen h-fit space-y-4">
            <CarouselSection />
            <div className="px-5 space-y-5 pt-6">
                <div className="flex w-full justify-between items-center">
                    <h1 className="font-semibold text-2xl">Kategori</h1>
                    <Link href={'/'} className="text-sm">Lihat semua</Link>
                </div>
                <Carousel
                    opts={{
                        align: "start",
                    }}
                    className="w-full max-w-[100vw]">
                    <CarouselContent>
                        {Array.from({ length: 20 }).map((_, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/12 ">
                                <Card>
                                    <CardContent className="w-full min-h-20 flex justify-center items-center">
                                        <span className="text-3xl font-semibold">{index + 1}</span>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>

            {dataProduct?.length === 0 && isPending ? (
                <div className="w-full justify-center items-center">
                    <Spinner />
                </div>
            ) : !!dataProduct && dataProduct.length > 0 ? (
                <CardSection dataProduct={dataProduct} />
            ) : dataProduct?.length === 0 ? '' : (
                <div className="w-full justify-center items-center">
                    <Spinner />
                </div>
            )}

            <CardPlatform />

        </div>
    );
}