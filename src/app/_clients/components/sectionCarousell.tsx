import Image from "next/image";
import * as React from "react";
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
import { MdChecklist } from "react-icons/md";
import { slidesData } from "@/app/_servers/utils/dummyData";
import { useCarousell } from "../hooks/use-carousell";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SectionCarousell(): React.JSX.Element {
  const {
    currentSlide,
    carouselRef,
    contentRef,
    imageRef,
    statsRef,
    nextSlide,
    prevSlide,
    goToSlide,
    currentSlideData,
    setIsAutoPlaying,
  } = useCarousell();

  return (
    <section className="w-full">
      <div
        ref={carouselRef}
        className="w-full mx-auto"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <div className="relative min-h-[600px] flex items-center bg-white rounded-xl overflow-hidden group">
          <div className="relative z-10 grid lg:grid-cols-2 gap-8 w-full p-8 lg:p-12">
            <div
              ref={contentRef}
              className="flex flex-col justify-center space-y-6"
            >
              <div className="flex items-center gap-3">
                <Badge className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5">
                  <Wrench className="w-3.5 h-3.5 mr-1.5" />
                  {currentSlideData.category}
                </Badge>
                {currentSlideData.inStock && (
                  <Badge className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5">
                    <MdChecklist className="w-3.5 h-3.5 mr-1.5" />
                    Ready Stock
                  </Badge>
                )}
              </div>

              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                  {currentSlideData.title.split(" ").map((word, index) => (
                    <span
                      key={index}
                      className={index === 1 ? "text-red-600" : ""}
                    >
                      {word}{" "}
                    </span>
                  ))}
                </h1>
                <p className="text-lg text-gray-600 font-medium">
                  {currentSlideData.subtitle}
                </p>
              </div>

              <p className="text-gray-600 leading-relaxed">
                {currentSlideData.description}
              </p>

              <div
                ref={statsRef}
                className="flex items-center gap-6 py-4 border-t border-gray-200"
              >
                <div className="flex items-center gap-1.5">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-gray-900">
                    {currentSlideData.rating}
                  </span>
                  <span className="text-sm text-gray-500">(1.2k)</span>
                </div>
                <div className="text-2xl font-bold text-red-600">
                  {currentSlideData.price}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Link href={"/produk"}>
                  <Button
                    size="lg"
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Lihat Katalog
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-red-600 text-red-600 hover:bg-red-50 font-semibold"
                >
                  Konsultasi
                </Button>
              </div>
            </div>

            <div
              ref={imageRef}
              className="relative flex items-center justify-center"
            >
              <div className="relative w-full h-[400px] lg:h-[500px]">
                <Image
                  src={currentSlideData.image}
                  alt={currentSlideData.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  className="object-contain transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute bottom-4 left-4 bg-red-600 text-white rounded-lg px-4 py-3 shadow-lg">
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-xs font-medium">Produk</div>
                </div>
              </div>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 shadow-md rounded-full w-10 h-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={nextSlide}
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 bg-white hover:bg-gray-100 shadow-md rounded-full w-10 h-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex items-center justify-center gap-2 mt-6">
          {slidesData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide
                  ? "w-8 h-2 bg-red-600"
                  : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
