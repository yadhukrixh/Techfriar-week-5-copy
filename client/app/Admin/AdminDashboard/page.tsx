"use client";

// Import necessary dependencies
import React, { useState } from 'react';
import styles from './AddMovies.module.css';
import axios from 'axios';
import ManageMovie from '@/components/AdminComponents/ManageMovie/ManageMovie';
import ManageTheaters from '@/components/AdminComponents/ManageTheaters/ManageTheaters';
import ManageShows from '@/components/AdminComponents/ManageShows/ManageShows';

/**
 * AddMovies component: Handles the admin dashboard for managing movies, theaters, and shows.
 * 
 * @returns {JSX.Element} The admin dashboard component.
 */
const AddMovies = () => {
  // State variables to store the movie name and navigation state
  const [movieName, setMovieName] = useState('');
  const [showMovies, setShowMovies] = useState(true);
  const [showTheaters, setShowTheaters] = useState(false);
  const [showShows, setShowShows] = useState(false);

  /**
   * Fetches movie details from the server.
   * 
   * @param {string} movieTitle The title of the movie to fetch.
   */
  const fetchMovie = async (movieTitle: string) => {
    try {
      console.log("function called");
      // Send a POST request to the server to fetch movie details
      await axios.post('http://localhost:3200/movie/fetchMovieDetailsToRegister', { movieTitle });
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Handles navigation between movies, theaters, and shows.
   * 
   * @param {string} type The type of navigation (movies, theaters, or carousel).
   */
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
    // Main container for the admin dashboard
    <div className={styles.main}>
      {/* Navigation bar */}
      <div className={styles.adminNav}>
        <div>
          <h2>Admin dashboard</h2>
        </div>
        <div>
          {/* Navigation links */}
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
      {/* Container for the navigation content */}
      <div className={styles.adminContainer}>
        {/* Conditionally render the navigation content */}
        {showMovies && !showTheaters && !showShows &&
          <ManageMovie />
        }

        {!showMovies && showTheaters && !showShows &&
          <ManageTheaters />
        }

        {!showMovies && !showTheaters && showShows &&
          <ManageShows />
        }
      </div>

      {/* Search bar (currently commented out) */}
      {/* <InputComponent value={movieName} onChange={setMovieName} type='text' />
      <button onClick={() => fetchMovie(movieName)} className={styles.searchButton}>
        Search
      </button> */}
    </div>
  )
}

export default AddMovies;