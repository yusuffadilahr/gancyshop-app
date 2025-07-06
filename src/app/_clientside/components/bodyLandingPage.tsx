'use client'

import CarouselSection from "@/app/_clientside/components/carouselSection";
import * as React from "react";
import CardPlatform from "@/app/_clientside/components/cardPlatform";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function BodyLanding({ cardProductServer }: { cardProductServer?: React.ReactNode }) {

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
            <React.Fragment>{cardProductServer}</React.Fragment>
            <CardPlatform />

        </div>
    );
}