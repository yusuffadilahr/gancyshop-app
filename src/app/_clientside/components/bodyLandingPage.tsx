'use client'

import CarouselSection from "@/app/_clientside/components/carouselSection";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { FaArrowRight } from "react-icons/fa";

export default function BodyLanding() {
    const arrayCardStatic = [
        { img: '/body.jpg', title: 'Nama' },
        { img: '/body-beat.jpg', title: 'Nama' },
        { img: '/tameng-beat.jpg', title: 'Nama' },
        { img: '/body.jpg', title: 'Nama' },
        { img: '/body-beat.jpg', title: 'Nama' },
        { img: '/tameng-beat.jpg', title: 'Nama' },
    ]

    React.useEffect(() => {
        console.log('Welcome, Diddy!')
    }, [])

    return (
        <div className="pb-20 px-4 min-h-screen h-fit space-y-4">
            <CarouselSection />
            <h1 className="font-semibold text-xl">Produk</h1>
            <div className="flex w-full h-full">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 m-auto w-fit h-fit">
                    {arrayCardStatic.map((item, i) => (
                        <div key={i} className="w-fit border pb-5">
                            <Image alt="img" className="w-[100vw]"
                                src={item.img} width={500} height={500} />
                            <div className="w-full justify-center flex py-5">
                                <Link href={'/product'}>
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