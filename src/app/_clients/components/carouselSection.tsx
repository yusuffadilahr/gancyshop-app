"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import * as React from 'react'
import { gsap } from 'gsap'
import { Star, Shield, Truck, ArrowRight, CheckCircle, Award, Clock } from 'lucide-react'

// interface CarouselSectionProps { }

export default function CarouselSection(): React.JSX.Element {
  const cardBlurRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (cardBlurRef.current) {
      const tl = gsap.timeline()

      // Animate main card
      tl.from(cardBlurRef.current, {
        opacity: 0,
        x: 50,
        duration: 1,
        ease: "back.out(1.7)",
      })

      // Animate elements inside card with stagger
      tl.from(cardBlurRef.current.querySelector('.welcome-badge'), {
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        ease: "back.out(1.7)",
      }, "-=0.5")

      tl.from(cardBlurRef.current.querySelector('.main-title'), {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power2.out",
      }, "-=0.3")

      tl.from(cardBlurRef.current.querySelector('.subtitle'), {
        opacity: 0,
        y: 15,
        duration: 0.6,
        ease: "power2.out",
      }, "-=0.4")

      tl.from(cardBlurRef.current.querySelectorAll('.feature-item'), {
        opacity: 0,
        x: -20,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
      }, "-=0.2")

      tl.from(cardBlurRef.current.querySelectorAll('.cta-button'), {
        opacity: 0,
        y: 10,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
      }, "-=0.1")

      tl.from(cardBlurRef.current.querySelector('.stats-section'), {
        opacity: 0,
        y: 15,
        duration: 0.6,
        ease: "power2.out",
      }, "-=0.2")
    }
  }, [])

  const handleOrderClick = (): void => {
    console.log('Pesan Sekarang clicked!')
    // Add your order logic here
  }

  const handleCatalogClick = (): void => {
    console.log('Lihat Katalog clicked!')
    // Add your catalog logic here
  }

  const handleWhatsAppClick = (): void => {
    console.log('WhatsApp clicked!')
    // Add WhatsApp redirect logic here
  }

  return (
    <div className="w-full flex pt-2 gap-1 px-2 md:px-5">
      <div className="w-full min-h-52 h-fit flex items-center px-0 m-auto bg-neutral-100 rounded-xl relative overflow-hidden">
        <Image
          src='/body-hero.png'
          id="hero-section-id"
          height={500}
          width={500}
          alt="hero-section"
          priority
          className="w-full h-[70vh] object-cover rounded-xl transition-opacity"
        />
        <div className="absolute px-2 md:px-0 md:left-[5%] bottom-[10%] space-y-2">
          <Card
            ref={cardBlurRef}
            className="bg-white/25 h-[55vh] backdrop-blur-md p-6 lg:p-8 px-8 lg:px-10 space-y-4 shadow-xl rounded-xl border border-white/20 max-w-md lg:max-w-lg overflow-y-auto"
          >
            {/* Welcome Badge */}
            <Badge className="welcome-badge bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-md transition-all duration-300 inline-flex items-center gap-2">
              <Award className="w-3 h-3" />
              Selamat datang di Gancy Shop
            </Badge>

            {/* Main Title */}
            <div className="main-title space-y-2">
              <h1 className="text-lg md:text-xl lg:text-2xl xl:text-3xl text-white font-bold leading-tight drop-shadow-lg">
                Sparepart Motor
                <span className="block text-yellow-300 drop-shadow-lg">
                  Berkualitas Premium
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <p className="subtitle text-white/90 text-sm lg:text-base leading-relaxed drop-shadow-sm">
              Dapatkan sparepart original dengan harga terbaik dan garansi resmi
            </p>

            {/* Feature Items */}
            <div className="space-y-3">
              <div className="feature-item bg-white/15 backdrop-blur-sm px-3 py-2.5 rounded-lg flex items-center gap-3 border border-white/20 transition-all duration-300 hover:bg-white/20">
                <div className="w-8 h-8 bg-yellow-500/80 rounded-full flex items-center justify-center">
                  <Star className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-white font-medium text-sm">Kualitas Terjamin</div>
                  <div className="text-white/70 text-xs">100% Original & Bergaransi</div>
                </div>
              </div>

              <div className="feature-item bg-white/15 backdrop-blur-sm px-3 py-2.5 rounded-lg flex items-center gap-3 border border-white/20 transition-all duration-300 hover:bg-white/20">
                <div className="w-8 h-8 bg-green-500/80 rounded-full flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-white font-medium text-sm">Garansi Resmi</div>
                  <div className="text-white/70 text-xs">Perlindungan Pembelian</div>
                </div>
              </div>

              <div className="feature-item bg-white/15 backdrop-blur-sm px-3 py-2.5 rounded-lg flex items-center gap-3 border border-white/20 transition-all duration-300 hover:bg-white/20">
                <div className="w-8 h-8 bg-blue-500/80 rounded-full flex items-center justify-center">
                  <Truck className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-white font-medium text-sm">Pengiriman Cepat</div>
                  <div className="text-white/70 text-xs">Gratis Ongkir Se-Indonesia</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleOrderClick}
                  className="cta-button bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2.5 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl flex items-center justify-center gap-2 group"
                >
                  Pesan Sekarang
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>

                <Button
                  onClick={handleCatalogClick}
                  variant="outline"
                  className="cta-button bg-white/15 border-white/40 text-white hover:bg-white/25 hover:border-white/60 backdrop-blur-sm font-medium px-6 py-2.5 rounded-lg transition-all duration-300"
                >
                  Lihat Katalog
                </Button>
              </div>

              {/* WhatsApp Quick Contact */}
              <Button
                onClick={handleWhatsAppClick}
                variant="secondary"
                className="cta-button w-full bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-lg transition-all duration-300 text-sm"
              >
                💬 Chat WhatsApp Sekarang
              </Button>
            </div>

            {/* Trust Stats */}
            <div className="stats-section pt-4 border-t border-white/20">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="space-y-1">
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-white font-bold text-lg">4.9</span>
                    <Star className="w-3 h-3 fill-yellow-300 text-yellow-300" />
                  </div>
                  <div className="text-white/80 text-xs">Rating</div>
                </div>

                <div className="space-y-1">
                  <div className="text-white font-bold text-lg flex items-center justify-center gap-1">
                    <Clock className="w-4 h-4" />
                    24/7
                  </div>
                  <div className="text-white/80 text-xs">Support</div>
                </div>

                <div className="space-y-1">
                  <div className="text-white font-bold text-lg flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-300" />
                  </div>
                  <div className="text-white/80 text-xs">Terpercaya</div>
                </div>
              </div>

              {/* Additional Stats Row */}
              <div className="grid grid-cols-2 gap-4 text-center mt-4 pt-3 border-t border-white/10">
                <div>
                  <div className="text-white font-bold text-sm">10K+</div>
                  <div className="text-white/70 text-xs">Pelanggan Puas</div>
                </div>
                <div>
                  <div className="text-white font-bold text-sm">100%</div>
                  <div className="text-white/70 text-xs">Original</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}