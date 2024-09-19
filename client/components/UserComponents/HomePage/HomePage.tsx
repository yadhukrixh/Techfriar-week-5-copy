import React from 'react';
import Carousel from '../Crousal/Carousal';
import MovieList from '../MovieList/MovieList';

/**
 * The HomePage component is the main entry point of the application.
 * It renders a Carousel and a MovieList component.
 */
const HomePage = () => {
  return (
    /**
     * The container element that holds the Carousel and MovieList components.
     * It uses flexbox to arrange the components vertically with a gap of 30px.
     */
    <div style={{display:'flex',gap:'30px',flexDirection:"column"}}>
      {/**
       * The Carousel component is rendered first.
       */}
      <Carousel/>
      {/**
       * The MovieList component is rendered below the Carousel.
       */}
      <MovieList/>
    </div>
  )
}

/**
 * Export the HomePage component as the default export.
 */
export default HomePage;