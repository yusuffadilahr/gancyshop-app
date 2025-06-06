import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";

export default function CarouselSection() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  const arrayHeroSection = [
    { img: '/hero-section.png', nama: 'ABC' },
    { img: '/hero-section.png', nama: 'ABC' },
  ]

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {arrayHeroSection.map((item, index) => (
          <CarouselItem key={index}>
            <div className="pt-2 w-full">
              <CardContent className="flex items-center justify-center w-full">
                <Image src={item.img} id="hero-section-id"
                  height={500} width={500} alt="hero-section"
                  className="w-full h-[50vh] object-cover rounded-xl" />
              </CardContent>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
