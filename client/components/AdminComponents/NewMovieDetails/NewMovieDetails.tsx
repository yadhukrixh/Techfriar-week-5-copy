import React, { FC, useState } from "react";
import ButtonComponent from "../../reusableComponents/ButtonComponent/ButtonComponent";
import styles from './NewMovieDetails.module.css';
import { newMovie } from "../ManageMovie/ManageMovie";
import { handleAddMovie } from "@/utils/adminUtils";
import SelectorComponent from "@/components/reusableComponents/SelectorComponent/SelectorComponent";

interface NewMovieProps{
    newMovie:newMovie;
    setShowAddMovie:(status:boolean)=>void;
    setMessagePopup:(status:boolean)=>void;
    setMessage:(message:string)=>void;
}

const NewMovieDetails:FC<NewMovieProps> = ({newMovie,setShowAddMovie,setMessagePopup,setMessage}) => {
  const ratingList = [1,2,3,4,5,6,7,8,9,10];
  const [rating,setRating] = useState<number>(0);

  return (
    <div className={styles.movieDetails}>
      <h2 className={styles.movieTitle}>{newMovie.title}</h2>
      <div className={styles.detailsGrid}>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Year:</span>
          <span className={styles.detailValue}>{newMovie.year}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Genre:</span>
          <span className={styles.detailValue}>{newMovie.genre}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Run Time:</span>
          <span className={styles.detailValue}>{newMovie.runTime}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Language:</span>
          <span className={styles.detailValue}>{newMovie.language}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Released:</span>
          <span className={styles.detailValue}>{newMovie.released}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Cast:</span>
          <span className={styles.detailValue}>{newMovie.cast}</span>
        </div>
        <div style={{textAlign:"left",marginBottom:'10px'}} className={styles.detailItem}>
          <span className={styles.detailLabel}>Plot:</span>
          <span className={styles.detailValue}>{newMovie.plot}</span>
        </div>
        <div className={styles.ratingSelector}>
          <SelectorComponent options={ratingList} setSelectedValue={setRating} placeholder="Select your ratings"/>
        </div>
      </div>
      
      <div className={styles.posterContainer}>
        <img
          className={styles.posterImage}
          src={newMovie.posterUrl}
          alt={`${newMovie.title} Poster`}
        />
      </div>
      <ButtonComponent
        value="Submit"
        className="submitButton"
        onClickFunction={()=>handleAddMovie(newMovie,rating,setShowAddMovie,setMessagePopup,setMessage)}
      />
    </div>
  );
};

export default NewMovieDetails;
