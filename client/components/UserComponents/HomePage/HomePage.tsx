import React from 'react';
import Carousel from '../Crousal/Carousal';
import MovieList from '../MovieList/MovieList';


const HomePage = () => {
  return (
    <div style={{display:'flex',gap:'30px',flexDirection:"column"}}>
      <Carousel/>
      <MovieList/>
    </div>
  )
}

export default HomePage;
