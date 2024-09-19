import React from "react";
import styles from "./MovieCard.module.css"; // Import the styles for the card
import { movieDetails, newMovie } from "../ManageMovie/ManageMovie";
import { handleDeleteMovie } from "@/utils/adminUtils";
import ButtonComponent from "../../reusableComponents/ButtonComponent/ButtonComponent";
import { FetchedMovieProps } from "@/utils/fetchData";

// Define the props interface for the MovieCard component
interface MovieCardProps {
  movie: FetchedMovieProps; // The movie object
  index: number; // The index of the movie in the list
  setMessage: (message: string) => void;
  setShowPopup: (status: boolean) => void;
}

// Define the MovieCard component
const MovieCard: React.FC<MovieCardProps> = ({ movie, index, setMessage, setShowPopup }) => {
  // Format the release date to display only the date part
  const formattedDate = movie.releaseDate.toString().split('T')[0];

  return (
    // Container for the movie card
    <div className={styles.cardContainer}>
      {/* Header section of the card */}
      <div className={styles.cardHeader}>
        {/* Display the movie title with its index */}
        <h2 className={styles.movieTitle}>
          {index + 1}. {movie.title}
        </h2>

        {/* Delete button to remove the movie */}
        <ButtonComponent value="Delete" className="deleteButton" onClickFunction={() => handleDeleteMovie(movie, setMessage, setShowPopup)} />

      </div>
      {/* Grid to display movie details */}
      <div className={styles.detailsGrid}>
        {/* Display the year of the movie */}
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Year:</span>
          <span className={styles.detailValue}>{movie.year}</span>
        </div>
        {/* Display the genre of the movie */}
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Genre:</span>
          <span className={styles.detailValue}>{movie.genre}</span>
        </div>
        {/* Display the runtime of the movie */}
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Run Time:</span>
          <span className={styles.detailValue}>{movie.runtime}</span>
        </div>
        {/* Display the language of the movie */}
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Language:</span>
          <span className={styles.detailValue}>{movie.language}</span>
        </div>
        {/* Display the release date of the movie */}
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Released:</span>
          <span className={styles.detailValue}>{formattedDate}</span>
        </div>
        {/* Display the cast of the movie */}
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Cast:</span>
          <span className={styles.detailValue}>{movie.actors}</span>
        </div>
      </div>
      {/* Container to display the plot of the movie */}
      <div className={styles.plotContainer}>
        <span className={styles.detailLabel}>Plot  : </span>
        <span className={styles.detailValue}>
          {movie.plot}
        </span>
      </div>
      {/* Container to display the poster of the movie */}
      <div className={styles.posterContainer}>
        <img
          className={styles.posterImage}
          src={movie.posterUrl}
          alt={`${movie.title} Poster`}
        />
      </div>
    </div>
  );
};

export default MovieCard;