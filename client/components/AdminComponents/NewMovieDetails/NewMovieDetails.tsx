import React, { FC, useState } from "react";
// Importing reusable ButtonComponent and SelectorComponent
import ButtonComponent from "../../reusableComponents/ButtonComponent/ButtonComponent";
import SelectorComponent from "@/components/reusableComponents/SelectorComponent/SelectorComponent";

// Importing styles for the component
import styles from './NewMovieDetails.module.css';

// Importing newMovie interface and handleAddMovie function
import { newMovie } from "../ManageMovie/ManageMovie";
import { handleAddMovie } from "@/utils/adminUtils";

// Defining the interface for NewMovieProps
interface NewMovieProps{
    newMovie:newMovie;
    setShowAddMovie:(status:boolean)=>void;
    setMessagePopup:(status:boolean)=>void;
    setMessage:(message:string)=>void;
}

// Defining the NewMovieDetails component
const NewMovieDetails:FC<NewMovieProps> = ({newMovie,setShowAddMovie,setMessagePopup,setMessage}) => {
  // List of ratings to be displayed in the selector
  const ratingList = [1,2,3,4,5,6,7,8,9,10];
  
  // State to store the selected rating
  const [rating,setRating] = useState<number>(0);

  return (
    // Container for the movie details
    <div className={styles.movieDetails}>
      {/* Displaying the movie title */}
      <h2 className={styles.movieTitle}>{newMovie.title}</h2>
      
      {/* Grid to display the movie details */}
      <div className={styles.detailsGrid}>
        {/* Displaying the year of the movie */}
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Year:</span>
          <span className={styles.detailValue}>{newMovie.year}</span>
        </div>
        
        {/* Displaying the genre of the movie */}
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Genre:</span>
          <span className={styles.detailValue}>{newMovie.genre}</span>
        </div>
        
        {/* Displaying the run time of the movie */}
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Run Time:</span>
          <span className={styles.detailValue}>{newMovie.runTime}</span>
        </div>
        
        {/* Displaying the language of the movie */}
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Language:</span>
          <span className={styles.detailValue}>{newMovie.language}</span>
        </div>
        
        {/* Displaying the release date of the movie */}
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Released:</span>
          <span className={styles.detailValue}>{newMovie.released}</span>
        </div>
        
        {/* Displaying the cast of the movie */}
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Cast:</span>
          <span className={styles.detailValue}>{newMovie.cast}</span>
        </div>
        
        {/* Displaying the plot of the movie */}
        <div style={{textAlign:"left",marginBottom:'10px'}} className={styles.detailItem}>
          <span className={styles.detailLabel}>Plot:</span>
          <span className={styles.detailValue}>{newMovie.plot}</span>
        </div>
        
        {/* Rating selector */}
        <div className={styles.ratingSelector}>
          <SelectorComponent options={ratingList} setSelectedValue={setRating} placeholder="Select your ratings"/>
        </div>
      </div>
      
      {/* Container for the movie poster */}
      <div className={styles.posterContainer}>
        <img
          className={styles.posterImage}
          src={newMovie.posterUrl}
          alt={`${newMovie.title} Poster`}
        />
      </div>
      
      {/* Submit button to add the movie */}
      <ButtonComponent
        value="Submit"
        className="submitButton"
        onClickFunction={()=>handleAddMovie(newMovie,rating,setShowAddMovie,setMessagePopup,setMessage)}
      />
    </div>
  );
};

// Exporting the NewMovieDetails component
export default NewMovieDetails;