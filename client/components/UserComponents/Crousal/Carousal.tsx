"use client";

import React from "react";
import styles from "./Carousal.module.css";
import { useCarousel } from "@/hooks/CarousalHooks";
import ButtonComponent from "../../reusableComponents/ButtonComponent/ButtonComponent";

// interface for the carousal image data
interface Carousel {
  url: string;
  caption: {
    Title: string;
    Language: string;
    Rating: string;
  };
  link: string;
}

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

const Carousel: React.FC = () => {
  const {
    currentSlide,
    carouselInnerRef,
    handleTouchStart,
    handleTouchEnd,
    showSlide,
  } = useCarousel(carousel.length);

  return (
    <section className={styles.carousel}>
      <div
        className={styles.carouselInner}
        ref={carouselInnerRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {carousel.map((carousel, index) => (
          <div
            key={index}
            className={styles.carouselItem}
            onClick={() => (window.location.href = carousel.link)}
          >
            <img src={carousel.url} alt="" />
            <div className={styles.carouselCaption}>
              <h2>{carousel.caption.Title}</h2>
                <span className={styles.language}>Language : {carousel.caption.Language}</span>
                <span className={styles.rating}><i className="ri-star-fill"></i>{carousel.caption.Rating}</span>

            </div>
          </div>
        ))}
      </div>

      <div className={styles.carouselIndicators}>
        {carousel.map((_, index) => (
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

export default Carousel;
