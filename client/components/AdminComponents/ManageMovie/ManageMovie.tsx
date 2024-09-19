"use client";

// Import necessary dependencies
import React, { useEffect, useState } from "react";
import styles from "./ManageMovie.module.css"; // Updated CSS module import
import InputComponent from "../../reusableComponents/InputComponent/InputComponent";
import ButtonComponent from "../../reusableComponents/ButtonComponent/ButtonComponent";
import { handleSearchMovie } from "@/utils/adminUtils";
import NewMovieDetails from "../NewMovieDetails/NewMovieDetails";
import PopupComponent from "../../reusableComponents/PopupComponent/PopupComponent";
import MovieCard from "../MovieCard/MovieCard";
import { FetchedMovieProps, fetchMovies } from "@/utils/fetchData";

// Define interfaces for newMovie and movieDetails
export interface newMovie {
  title?: string;
  year?: string;
  genre?: string;
  language?: string;
  released?: string;
  runTime?: string;
  cast?: string;
  plot?: string;
  response?: string;
  posterUrl?: string;
  imdbID?: string;
}

export interface movieDetails {
  _id?: string;
  title?: string;
  year?: string;
  language?: string;
  released?: Date;
  runtime?: string;
  genre: string[];
  actors?: string[];
  plot?: string;
  rating?: any;
  posterUrl?: string;
  imdbID?: string;
  backGroundUrl?: string;
  showtimes: string[];
}

// Define the ManageMovie component
const ManageMovie = () => {
  // Initialize state variables
  const [movies, setMovies] = useState<FetchedMovieProps[]>([]);
  const [newMovie, setNewMovie] = useState<newMovie>({});
  const [showAddMovie, setShowAddMovie] = useState(false);
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newMovieYear, setNewMovieYear] = useState("");
  const [responseStatus, setResponseStatus] = useState(false);
  const [movieFoundStatus, setMovieFoundStatus] = useState(false);
  const [messagePopup, setMessagePopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [message, setMessage] = useState('');

  // Fetch movies when the component mounts
  useEffect(() => {
    // Fetch movies and update the state
    fetchMovies(setMovies);
    // Check if there are any movies in the state
    if (movies?.length === 0) {
      // If no movies, display a message
      setMessage("Please add any new movies to see the list.");
    } else {
      // If movies exist, clear the message
      setMessage('');
    }
  }, [setMovies, movies, setMessage]);

  // Define a function to handle closing the popup
  const handleClosePopup = () => {
    // Set the message popup state to false
    setMessagePopup(false);
  };

  // Render the component
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.manageMovieHeader}>
        <h1 className={styles.title}>Manage Movies</h1>
        <button
          className={styles.addButton}
          onClick={() => setShowAddMovie(!showAddMovie)}
        >
          {showAddMovie ? "Close Add Movie" : "Add Movie"}
        </button>
      </div>

      {showAddMovie && (
        <div>
          <div className={styles.addMovieSection}>
            {/* Input field for movie title */}
            <InputComponent
              type="text"
              value={newMovieTitle}
              onChange={setNewMovieTitle}
              customClassName="searchInput"
              placeholder="Enter the correct name of the movie"
            />
            {/* Input field for movie year */}
            <InputComponent
              type="number"
              value={newMovieYear}
              onChange={setNewMovieYear}
              customClassName="searchInput"
              placeholder="Enter the release year of movie"
            />
            {/* Button to search for the movie */}
            <ButtonComponent
              value="Search"
              onClickFunction={() =>
                handleSearchMovie(
                  newMovieTitle,
                  newMovieYear,
                  setNewMovie,
                  setResponseStatus,
                  setMovieFoundStatus
                )
              }
              className="searchButton"
            />
          </div>
          <div>
            {/* Display NewMovieDetails component if movie is found */}
            {responseStatus && movieFoundStatus && (
              <NewMovieDetails
                newMovie={newMovie}
                setShowAddMovie={setShowAddMovie}
                setMessagePopup={setMessagePopup}
                setMessage={setPopupMessage}
              />
            )}
            {/* Display error message if movie is not found */}
            {responseStatus && !movieFoundStatus && (
              <p
                style={{
                  width: '100%',
                  textAlign: 'center',
                  color: 'red',
                  padding: '10px',
                }}
              >
                Enter a valid movie name
              </p>
            )}
          </div>
        </div>
      )}
      {/* Display movie grid if not in add movie mode */}
      {!showAddMovie && (
        <div className={styles.moviesGrid}>
          {movies?.map((movie, index) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              index={index}
              setMessage={setPopupMessage}
              setShowPopup={setMessagePopup}
            />
          ))}
        </div>
      )}
      {/* Display message if no movies exist */}
      <p style={{ width: '100%', color: 'red', textAlign: 'center' }}>
        {message}
      </p>
      {/* Display popup if message popup state is true */}
      {messagePopup && (
        <PopupComponent
          message={popupMessage}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};

export default ManageMovie;