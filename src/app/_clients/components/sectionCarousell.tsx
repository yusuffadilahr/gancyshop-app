"use client";

import Image from "next/image";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Star,
  Wrench,
} from "lucide-react";
import { ICarouselSlide } from "../types";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const slides: ICarouselSlide[] = [
  {
    id: 1,
    title: "Body Parts Collection",
    subtitle: "Premium Quality Motorcycle Parts",
    description:
      "Fairing, tangki, jok, dan komponen body motor berkualitas tinggi untuk semua jenis motor",
    image: "/body-hero.png",
    category: "Body Parts",
    price: "Mulai dari Rp 250.000",
    rating: 4.8,
    inStock: true,
  },
  {
    id: 2,
    title: "Engine Components",
    subtitle: "Performance & Reliability",
    description:
      "Komponen mesin berkualitas untuk performa maksimal dan daya tahan yang lama",
    image: "/body-hero.png",
    category: "Engine",
    price: "Mulai dari Rp 180.000",
    rating: 4.9,
    inStock: true,
  },
  {
    id: 3,
    title: "Electrical Parts",
    subtitle: "Modern Technology Solutions",
    description:
      "Sistem kelistrikan modern untuk motor dengan teknologi terdepan",
    image: "/body-hero.png",
    category: "Electrical",
    price: "Mulai dari Rp 125.000",
    rating: 4.7,
    inStock: false,
  },
];

export default function SectionCarousell(): React.JSX.Element {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const carouselRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(carouselRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      });

      const tl = gsap.timeline();

      tl.to(contentRef.current, {
        opacity: 0,
        x: -30,
        duration: 0.3,
        ease: "power2.inOut",
      })
        .to(
          imageRef.current,
          {
            scale: 0.95,
            opacity: 0.7,
            duration: 0.3,
            ease: "power2.inOut",
          },
          "<"
        )
        .to(contentRef.current, {
          opacity: 1,
          x: 0,
          duration: 0.4,
          ease: "power2.out",
        })
        .to(
          imageRef.current,
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
          },
          "<"
        );

      ScrollTrigger.create({
        trigger: carouselRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.from(statsRef.current?.children || [], {
            opacity: 0,
            y: 30,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.7)",
          });
        },
      });
    }, carouselRef);

    return () => ctx.revert();
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <section className="w-full py-8 px-2 md:px-5 bg-gradient-to-br from-gray-50 to-white">
      <div
        ref={carouselRef}
        className="w-full mx-auto"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <div className="relative min-h-[70vh] flex items-center bg-white rounded-2xl overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-red-50/50 to-white opacity-70"></div>
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
          <div className="relative z-10 grid lg:grid-cols-2 gap-0 w-full min-h-[70vh]">
            <div
              ref={contentRef}
              className="flex flex-col justify-center p-8 lg:p-12 space-y-6"
            >
              <div className="flex items-center space-x-3">
                <Badge
                  variant="secondary"
                  className="bg-red-100 text-red-700 hover:bg-red-200 px-4 py-2 text-sm font-semibold"
                >
                  <Wrench className="w-4 h-4 mr-2" />
                  {currentSlideData.category}
                </Badge>
                {currentSlideData.inStock && (
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-200">
                    ✓ Ready Stock
                  </Badge>
                )}
              </div>

              <div>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
                  {currentSlideData.title.split(" ").map((word, index) => (
                    <span
                      key={index}
                      className={index === 1 ? "text-red-600" : ""}
                    >
                      {word}{" "}
                    </span>
                  ))}
                </h1>
                <p className="text-xl text-gray-600 font-medium">
                  {currentSlideData.subtitle}
                </p>
              </div>

              <p className="text-gray-700 text-lg leading-relaxed max-w-md">
                {currentSlideData.description}
              </p>

              <div ref={statsRef} className="flex items-center space-x-6 py-4">
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-gray-900">
                    {currentSlideData.rating}
                  </span>
                  <span className="text-gray-500">(1.2k reviews)</span>
                </div>
                <div className="text-2xl font-bold text-red-600">
                  {currentSlideData.price}
                </div>
              </div>

              <div className="flex items-center space-x-4 pt-4">
                <Button
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Lihat Katalog
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-3 text-lg font-semibold transition-all duration-300"
                >
                  Konsultasi
                </Button>
              </div>
            </div>

            <div
              ref={imageRef}
              className="relative flex items-center justify-center p-8 lg:p-12"
            >
              <div className="relative w-full h-full">
                <Image
                  src={currentSlideData.image}
                  alt={currentSlideData.title}
                  fill
                  sizes="100%"
                  priority
                  className="object-cover rounded-xl transition-all duration-700 hover:scale-105"
                />

                <div className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-lg">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-red-600 text-white rounded-xl p-3 shadow-lg">
                  <span className="text-sm font-bold">500+</span>
                  <br />
                  <span className="text-xs">Products</span>
                </div>
              </div>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={prevSlide}
            className="absolute left-4 z-10 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg backdrop-blur-sm rounded-full w-12 h-12 opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={nextSlide}
            className="absolute right-4 z-10 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg backdrop-blur-sm rounded-full w-12 h-12 opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </Button>
        </div>

        <div className="flex items-center justify-center space-x-3 mt-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide
                  ? "w-12 h-3 bg-red-600"
                  : "w-3 h-3 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
