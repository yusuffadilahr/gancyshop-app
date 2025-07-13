import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import * as React from "react"

export default function CarouselSection() {
  const [indexImage, setIndexImage] = React.useState<number>(0)
  const arrayHeroSection = [
    { img: '/matic.png', nama: 'ABC' },
    { img: '/body.jpg', nama: 'ABC' },
    { img: '/beat.jpeg', nama: 'ABC' },
  ]

  return (
    <div className="w-full flex pt-2 gap-1 px-2 md:px-5">
      <div className="w-full min-h-52 h-fit flex items-center px-0 m-auto bg-neutral-100 rounded-xl relative overflow-hidden">
        <Image src={arrayHeroSection[indexImage].img} id="hero-section-id"
          height={500} width={500} alt="hero-section"
          className="w-full h-[70vh] object-cover rounded-xl transition-opacity" />
        <div className="absolute left-[10%] top-[30%] z-10">
          {indexImage === 0 && (
            <div className="space-y-3">
              <Badge>Selamat datang di Gancy Shop</Badge>
              <h1 className="text-white text-3xl">Dapatkan Produk Terbaik!</h1>
              <h1 className="text-white text-3xl font-bold">Dengan Harga Menarik!</h1>
              <Button variant={"default"}>Pesan Sekarang</Button>
            </div>
          )}
        </div>
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => {
              if (indexImage === 0) {
                setIndexImage(arrayHeroSection.length - 1)
                return
              }

              setIndexImage(indexImage - 1)
            }}
            className="bg-black/50 hover:bg-black/70 text-white"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          <Button
            size="icon"
            variant="ghost"
            onClick={() => {
              if ((arrayHeroSection.length - 1) === indexImage) {
                setIndexImage(0)
                return
              }

              setIndexImage(indexImage + 1)
            }}
            className="bg-black/50 hover:bg-black/70 text-white"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>
      </div>
      <div className="w-1/3 items-stretch hidden lg:flex bg-neutral-100 rounded-xl">
        <Image src={arrayHeroSection[arrayHeroSection.length - 1].img} id="hero-section-id"
          height={500} width={500} alt="hero-section"
          className="w-full h-[70vh] object-cover rounded-xl" />
      </div>
    </div>
  )
}
