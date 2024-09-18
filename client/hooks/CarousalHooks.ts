"use client";

import { useState, useEffect, useRef } from "react";

export const useCarousel = (totalSlides: number) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselInnerRef = useRef<HTMLDivElement>(null);
  let startX: number;

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  const showSlide = (index: number) => {
    const newSlideIndex =
      index >= totalSlides ? 0 : index < 0 ? totalSlides - 1 : index;
    setCurrentSlide(newSlideIndex);

    if (carouselInnerRef.current) {
      carouselInnerRef.current.style.transform = `translateX(-${
        newSlideIndex * 100
      }%)`;
    }
  };

  const nextSlide = () => {
    showSlide(currentSlide + 1);
  };

  const prevSlide = () => {
    showSlide(currentSlide - 1);
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    startX = event.touches[0].clientX;
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    const endX = event.changedTouches[0].clientX;
    if (startX > endX + 50) {
      nextSlide();
    } else if (startX < endX - 50) {
      prevSlide();
    }
  };

  return {
    currentSlide,
    carouselInnerRef,
    nextSlide,
    prevSlide,
    showSlide,
    handleTouchStart,
    handleTouchEnd,
  };
};
