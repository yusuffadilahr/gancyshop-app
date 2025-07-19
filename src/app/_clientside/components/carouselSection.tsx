import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import * as React from 'react'
import { gsap } from 'gsap'

export default function CarouselSection() {
  const cardBlurRef = React.useRef(null)
  const cardBlueRef = React.useRef(null)

  React.useEffect(() => {
    gsap.from(cardBlurRef.current, {
      opacity: 0,
      x: 50,
      duration: 1,
      ease: "back",
    })
  }, [])

  React.useEffect(() => {
    gsap.from(cardBlueRef.current, {
      opacity: 0,
      x: 50,
      duration: 1,
      ease: 'back'
    })
  }, [])

  return (
    <div className="w-full flex pt-2 gap-1 px-2 md:px-5">
      <div className="w-full min-h-52 h-fit flex items-center px-0 m-auto bg-neutral-100 rounded-xl relative overflow-hidden">
        <Image src='/body-hero.png' id="hero-section-id"
          height={500} width={500} alt="hero-section"
          className="w-full h-[70vh] object-cover rounded-xl transition-opacity" />
        <div className="absolute px-2 md:px-0 md:left-[5%] bottom-[30%] space-y-2">
          <Badge className="bg-yellow-400 text-black text-xs px-3 py-1 rounded-full">
            🔧 Promo Gila-Gilaan!
          </Badge>

          <h1 className="text-2xl md:text-4xl font-extrabold text-white leading-tight drop-shadow">
            MOTOR LO, GAYA LO! 🛵🔥
          </h1>

          <p className="text-sm md:text-base text-white/80 leading-snug">
            Sparepart kece, kualitas juara,<br className="hidden sm:block" /> langsung kirim hari ini juga!
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button variant="secondary" size="sm">
              🔥 Cek Katalog
            </Button>
            <Button variant="outline" size="sm" className="text-white border-white hover:bg-white/10">
              🎯 Layanan Konsultasi
            </Button>
          </div>
        </div>
        <div className="absolute px-2 md:px-0 md:right-[5%] bottom-[10%] space-y-2">
          <Card ref={cardBlurRef}
            className="bg-white/30 backdrop-blur-md p-6 px-10 space-y-2 shadow-xl rounded-xl border-none">
            <Badge className="bg-red-500 hover:bg-red-500
            text-xs text-white font-medium px-3 py-1 rounded-full">
              Selamat datang di Gancy Shop
            </Badge>
            <h1 className="text-sm md:text-base lg:text-3xl text-white font-bold leading-tight">
              Dapatkan Produk Terbaik!
            </h1>
            <div className="md:flex items-center gap-2">
              <h2 className="lg:text-xl text-white font-semibold">
                Sparepart Berkualitas
              </h2>
              <Button variant='destructive' size='sm'>Pesan Sekarang</Button>
            </div>
          </Card>

          <Card ref={cardBlueRef} className="bg-blue-500 hidden sm:block p-6 px-10 space-y-2 border-none">
            <h1 className="text-3xl text-white font-bold leading-tight">
              Diskon Hingga 30%
            </h1>
            <div className="flex items-center gap-2">
              <h2 className="text-xl text-white font-semibold">
                Untuk Pembelian Body Motor Matic
              </h2>
              <Button variant='secondary'>Lihat Promo</Button>
            </div>
          </Card>
        </div>

      </div>
    </div>
  )
}
