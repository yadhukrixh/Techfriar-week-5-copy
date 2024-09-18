import React from "react";
import styles from "./MovieCard.module.css"; // Import the styles for the card
import { movieDetails, newMovie } from "../ManageMovie/ManageMovie";
import { handleDeleteMovie } from "@/utils/adminUtils";
import ButtonComponent from "../../reusableComponents/ButtonComponent/ButtonComponent";
import { FetchedMovieProps } from "@/utils/fetchData";

interface MovieCardProps {
  movie: FetchedMovieProps; // The movie object
  index: number; // The index of the movie in the list
  setMessage:(message:string)=>void;
  setShowPopup:(status:boolean)=>void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, index,setMessage,setShowPopup}) => {
  const formattedDate = movie.releaseDate.toString().split('T')[0];

  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardHeader}>
        <h2 className={styles.movieTitle}>
          {index + 1}. {movie.title}
        </h2>

        <ButtonComponent value="Delete" className="deleteButton" onClickFunction={()=>handleDeleteMovie(movie,setMessage,setShowPopup)}/>

      </div>
      <div className={styles.detailsGrid}>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Year:</span>
          <span className={styles.detailValue}>{movie.year}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Genre:</span>
          <span className={styles.detailValue}>{movie.genre}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Run Time:</span>
          <span className={styles.detailValue}>{movie.runtime}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Language:</span>
          <span className={styles.detailValue}>{movie.language}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Released:</span>
          <span className={styles.detailValue}>{formattedDate}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Cast:</span>
          <span className={styles.detailValue}>{movie.actors}</span>
        </div>
      </div>
      <div className={styles.plotContainer}>
        <span className={styles.detailLabel}>Plot  : </span>
        <span className={styles.detailValue}>
          {movie.plot}
        </span>
      </div>
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
