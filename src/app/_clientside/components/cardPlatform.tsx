import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";

export default function CardPlatform() {
    const dataRatingStatis = [
        {
            aplikasiName: "Shopee",
            rating: 4.8,
            followers: 2100,
            lastUpdated: "2025-06-06",
            image: '/shopee.png',
            link: 'https://shopee.co.id/gancyshop'
        },
        {
            aplikasiName: "Tokopedia",
            rating: 4.6,
            followers: 2300,
            lastUpdated: "2025-06-06",
            image: '/tokped.png',
            link: 'https://tokopedia.com/gancyshop'
        },
        {
            aplikasiName: "Lazada",
            rating: 4.2,
            followers: 2000,
            lastUpdated: "2025-06-06",
            image: '/laz.png',
            link: 'https://lazada.co.id/gancyshop'
        },
        {
            aplikasiName: "TikTok Shop",
            rating: 4.4,
            followers: 2200,
            lastUpdated: "2025-06-06",
            image: '/tik.jpg',
            link: 'https://tiktok.com/@gancyshop'
        }
    ];

    return (
        <div className="px-5 space-y-5 pt-6">
            <h1 className="font-semibold text-2xl">Platform Resmi</h1>
            <Carousel className="w-full max-w-[100vw]">
                <CarouselContent>
                    {dataRatingStatis.map((item, index) => (
                        <CarouselItem className="md:basis-1/2 lg:basis-1/4" key={index}>
                            <Link href={item.link} target="_blank" className="w-full">
                                <Card className="h-full flex justify-between items-center">
                                    <CardContent className="p-4 flex flex-col justify-between">
                                        <div className="space-y-1">
                                            <h2 className="text-xl font-semibold">{item.aplikasiName}</h2>
                                            <p className="text-yellow-500 text-lg">
                                                {"★".repeat(Math.floor(item.rating))}{" "}
                                                <span className="text-gray-700">({item.rating})</span>
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Followers: {item.followers.toLocaleString()}
                                            </p>
                                        </div>
                                    </CardContent>
                                    <CardContent className="p-4 md:flex flex-col justify-between h-full hidden">
                                        <Image width={500}
                                            height={500} alt="app"
                                            src={item.image} className="w-fit h-24 object-cover" />
                                    </CardContent>
                                </Card>
                            </Link>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    );
}