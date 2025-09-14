import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { slidesData } from "@/app/_servers/utils/dummyData";

export const useCarousell = () => {
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
        setCurrentSlide((prev) => (prev + 1) % slidesData.length);
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
    setCurrentSlide((prev) => (prev + 1) % slidesData.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + slidesData.length) % slidesData.length
    );
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const currentSlideData = slidesData[currentSlide];

  return {
    currentSlide,
    isAutoPlaying,
    carouselRef,
    contentRef,
    imageRef,
    statsRef,
    autoPlayRef,
    nextSlide,
    prevSlide,
    goToSlide,
    currentSlideData,
    setIsAutoPlaying,
  };
};
