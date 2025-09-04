'use client';
import CarouselSection from "@/app/_clients/components/carouselSection";
import * as React from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Spinner } from "@/components/ui/spinner";

const DynamicCardPlatform = dynamic(() => import('./sectionCardPlatform'), {
    loading: () => <Spinner />,
    ssr: false
})

export default function BodyLanding({ sectionProductServer }: { sectionProductServer?: React.ReactNode }) {
    React.useEffect(() => {
        console.log('Welcome, Diddy!')
    }, [])

    return (
        <div className="pb-20 md:px-4 min-h-screen h-fit space-y-4">
            <CarouselSection />
            <div className="px-2 md:px-5 space-y-5 pt-6">
                <div className="flex w-full justify-between items-center">
                    <h1 className="font-semibold text-2xl">Kategori</h1>
                    <Link href={'/'} className="text-sm">Lihat semua</Link>
                </div>
                <Carousel opts={{ align: "start" }} className="w-full max-w-[100vw]">
                    <CarouselContent>
                        {Array.from({ length: 6 }).map((_, index) => (
                            <CarouselItem key={index} className="basis-1/2 md:basis-1/3 lg:basis-1/6">
                                <Card className="flex w-full flex-col justify-center items-center">
                                    <div className="flex w-full items-center justify-center rounded-xl">
                                        <Image width={500} alt="kategori" height={500}
                                            src='/no-data.png' className="w-full object-cover rounded-t-xl" />
                                    </div>
                                    <div className="flex w-full items-center justify-center rounded-xl">
                                        <h1>tess</h1>
                                    </div>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
            <React.Fragment>{sectionProductServer}</React.Fragment>
            <DynamicCardPlatform />

        </div>
    );
}