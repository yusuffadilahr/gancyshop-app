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
    <section className="w-full py-8 px-2 md:px-5">
      <div
        ref={carouselRef}
        className="w-full mx-auto"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <div className="relative min-h-[70vh] flex items-center bg-white rounded-2xl overflow-hidden group">
          <div className="absolute inset-0 opacity-70"></div>
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
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-700 hover:bg-green-200 px-4 py-2 text-sm font-semibold"
                  >
                    <MdChecklist className="w-4 h-4 mr-2" />
                    Ready Stock
                  </Badge>
                )}
              </div>

              <div>
                <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
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
          {slidesData.map((_, index) => (
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
