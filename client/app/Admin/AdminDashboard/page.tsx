"use client";

import React, { useState } from 'react';
import styles from './AddMovies.module.css';
import axios from 'axios';
import ManageMovie from '@/components/AdminComponents/ManageMovie/ManageMovie';
import ManageTheaters from '@/components/AdminComponents/ManageTheaters/ManageTheaters';
import ManageShows from '@/components/AdminComponents/ManageShows/ManageShows';



const AddMovies = () => {
    const [movieName,setMovieName] = useState('');

    const [showMovies,setShowMovies] = useState(true);
    const [showTheaters,setShowTheaters] = useState(false);
    const [showShows,setShowShows] = useState(false);

    const fetchMovie = async(movieTitle:string) => {
      try{
        console.log("function called");
        
        await axios.post('http://localhost:3200/movie/fetchMovieDetailsToRegister',{ movieTitle });
      }catch(error){
        console.error(error);
      }
    }

    const handleNavClick = (type: string) => {
      if (type === 'movies') {
        setShowMovies(true);
        setShowTheaters(false);
        setShowShows(false);
      } else if (type === 'theaters') {
        setShowMovies(false);
        setShowTheaters(true);
        setShowShows(false);
      } else if (type === 'carousel') {
        setShowMovies(false);
        setShowTheaters(false);
        setShowShows(true);
      }
    }
    
  return (
    <div className={styles.main}>
      <div className={styles.adminNav}>
          <div>
            <h2>Admin dashboard</h2>
          </div>
          <div>
            <span 
              className={showMovies ? styles.active : ''} 
              onClick={() => handleNavClick('movies')}
            >
              Movies
            </span>
            <span 
              className={showTheaters ? styles.active : ''} 
              onClick={() => handleNavClick('theaters')}
            >
              Theaters
            </span>
            <span 
              className={showShows ? styles.active : ''} 
              onClick={() => handleNavClick('carousel')}
            >
              Shows
            </span>
          </div>
      </div>
      <div className={styles.adminContainer}>
        {showMovies && !showTheaters && !showShows &&
            <ManageMovie />
        }

        {!showMovies && showTheaters && !showShows &&
            <ManageTheaters/>
        }

        {!showMovies && !showTheaters && showShows &&
            <ManageShows/>
        }
        
      </div>




      {/* <InputComponent value={movieName} onChange={setMovieName} type='text' />
      <button onClick={()=>fetchMovie(movieName)} className={styles.searchButton}>
        Search
      </button> */}
    </div>
  )
}

export default AddMovies;