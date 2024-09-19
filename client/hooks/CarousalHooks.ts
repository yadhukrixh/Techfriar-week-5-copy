"use client";
import { useState, useEffect, useRef } from "react";

/**
 * Hook to manage a carousel with a specified number of slides.
 * 
 * @param {number} totalSlides The total number of slides in the carousel.
 * @returns An object containing the current slide index, a reference to the carousel inner element, and functions to navigate the carousel.
 */
export const useCarousel = (totalSlides: number) => {
  // Initialize the current slide index to 0.
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Create a reference to the carousel inner element.
  const carouselInnerRef = useRef<HTMLDivElement>(null);
  
  // Store the starting x-coordinate of a touch event.
  let startX: number;

  /**
   * Effect to automatically navigate to the next slide every 3 seconds.
   */
  useEffect(() => {
    // Set an interval to call the nextSlide function every 3 seconds.
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    
    // Clear the interval when the component unmounts.
    return () => clearInterval(interval);
  }, [currentSlide]);

  /**
   * Show a specific slide in the carousel.
   * 
   * @param {number} index The index of the slide to show.
   */
  const showSlide = (index: number) => {
    // Calculate the new slide index, wrapping around to the start or end if necessary.
    const newSlideIndex =
      index >= totalSlides ? 0 : index < 0 ? totalSlides - 1 : index;
    
    // Update the current slide index.
    setCurrentSlide(newSlideIndex);

    // If the carousel inner element exists, update its transform style to show the new slide.
    if (carouselInnerRef.current) {
      carouselInnerRef.current.style.transform = `translateX(-${newSlideIndex * 100}%)`;
    }
  };

  /**
   * Navigate to the next slide in the carousel.
   */
  const nextSlide = () => {
    showSlide(currentSlide + 1);
  };

  /**
   * Navigate to the previous slide in the carousel.
   */
  const prevSlide = () => {
    showSlide(currentSlide - 1);
  };

  /**
   * Handle the start of a touch event.
   * 
   * @param {React.TouchEvent} event The touch event.
   */
  const handleTouchStart = (event: React.TouchEvent) => {
    // Store the starting x-coordinate of the touch event.
    startX = event.touches[0].clientX;
  };

  /**
   * Handle the end of a touch event.
   * 
   * @param {React.TouchEvent} event The touch event.
   */
  const handleTouchEnd = (event: React.TouchEvent) => {
    // Get the ending x-coordinate of the touch event.
    const endX = event.changedTouches[0].clientX;
    
    // If the user swiped to the right, navigate to the next slide.
    if (startX > endX + 50) {
      nextSlide();
    } 
    // If the user swiped to the left, navigate to the previous slide.
    else if (startX < endX - 50) {
      prevSlide();
    }
  };

  // Return the current slide index, carousel inner reference, and navigation functions.
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