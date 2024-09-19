"use client";
// Import necessary dependencies
import React from "react";
import styles from "./Carousal.module.css";
import { useCarousel } from "@/hooks/CarousalHooks";
import ButtonComponent from "../../reusableComponents/ButtonComponent/ButtonComponent";

// Define the interface for the carousel image data
interface Carousel {
  /**
   * URL of the image
   */
  url: string;
  /**
   * Caption data for the image
   */
  caption: {
    /**
     * Title of the image
     */
    Title: string;
    /**
     * Language of the image
     */
    Language: string;
    /**
     * Rating of the image
     */
    Rating: string;
  };
  /**
   * Link associated with the image
   */
  link: string;
}

// Define the carousel data
const carousel: Carousel[] = [
  {
    url: "images/vaazha.webp",
    caption: {
      Title: "Vaazha",
      Language: "Malayalam",
      Rating: " 8.0/10",
    },
    link: "https://example.com/",
  },
  {
    url: "images/vaazha.webp",
    caption: {
      Title: "Vaazha",
      Language: "Malayalam",
      Rating: " 8.0/10",
    },
    link: "images/stree2.jpg",
  },
  {
    url: "images/vaazha.webp",
    caption: {
      Title: "Vaazha",
      Language: "Malayalam",
      Rating: " 8.0/10",
    },
    link: "https://example.com/",
  },
  {
    url: "images/vaazha.webp",
    caption: {
      Title: "Vaazha",
      Language: "Malayalam",
      Rating: " 8.0/10",
    },
    link: "https://example.com/",
  },
];

// Define the Carousel component
const Carousel: React.FC = () => {
  // Get the carousel state and functions from the useCarousel hook
  const {
    /**
     * Current slide index
     */
    currentSlide,
    /**
     * Reference to the carousel inner element
     */
    carouselInnerRef,
    /**
     * Handle touch start event
     */
    handleTouchStart,
    /**
     * Handle touch end event
     */
    handleTouchEnd,
    /**
     * Show a specific slide
     */
    showSlide,
  } = useCarousel(carousel.length);

  // Render the carousel component
  return (
    // Carousel container
    <section className={styles.carousel}>
      {/* Carousel inner container */}
      <div
        className={styles.carouselInner}
        ref={carouselInnerRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Map through the carousel data and render each slide */}
        {carousel.map((carousel, index) => (
          // Carousel item
          <div
            key={index}
            className={styles.carouselItem}
            onClick={() => (window.location.href = carousel.link)}
          >
            {/* Image */}
            <img src={carousel.url} alt="" />
            {/* Caption */}
            <div className={styles.carouselCaption}>
              {/* Title */}
              <h2>{carousel.caption.Title}</h2>
              {/* Language */}
              <span className={styles.language}>Language : {carousel.caption.Language}</span>
              {/* Rating */}
              <span className={styles.rating}>
                <i className="ri-star-fill"></i>
                {carousel.caption.Rating}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Carousel indicators */}
      <div className={styles.carouselIndicators}>
        {/* Map through the carousel data and render each indicator */}
        {carousel.map((_, index) => (
          // Indicator
          <div
            key={index}
            className={currentSlide === index ? styles.active : ""}
            onClick={() => showSlide(index)}
          ></div>
        ))}
      </div>
    </section>
  );
};

// Export the Carousel component
export default Carousel;