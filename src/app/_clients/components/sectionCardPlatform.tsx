import { dataRatingStatis } from "@/app/_servers/utils/dummyData";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";

export default function SectionCardPlatform() {
  return (
    <div className="px-2 md:px-5 space-y-5 pt-6">
      <h1 className="font-semibold text-2xl">Platform Resmi</h1>
      <Carousel className="w-full max-w-[100vw]">
        <CarouselContent>
          {dataRatingStatis.map((item, index) => (
            <CarouselItem className="md:basis-1/2 lg:basis-1/4" key={index}>
              <Link href={item.link} target="_blank" className="w-full">
                <Card className="h-full flex justify-between items-center">
                  <CardContent className="p-4 flex flex-col justify-between">
                    <div className="space-y-1">
                      <h2 className="text-xl font-semibold">
                        {item.aplikasiName}
                      </h2>
                      <p className="text-yellow-500 text-lg">
                        {"★".repeat(5)}{" "}
                        <span className="text-gray-700">({item.rating})</span>
                      </p>
                      <p className="text-sm text-gray-500">
                        Followers: {item.followers.toLocaleString('id-ID') || '-'}
                      </p>
                    </div>
                  </CardContent>
                  <CardContent className="p-4 md:flex flex-col justify-between h-full hidden">
                    <Image
                      width={500}
                      height={500}
                      alt="app"
                      src={item.image}
                      className="w-fit h-24 object-cover"
                    />
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
