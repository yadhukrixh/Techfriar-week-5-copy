"use client";

import React, { useEffect, useState } from "react";
import styles from "./MovieList.module.css";
import CustomSelector from "../../reusableComponents/SelectorComponent/SelectorComponent"; // Adjust the import path accordingly
import { fetchSchedules, getFilterationList } from "@/utils/fetchData";
import { ISchedule } from "@/components/AdminComponents/ScheduleCard/ScheduleCard";
import { fetchMoviesToBook } from "@/utils/userUtils";
import { movieDetails } from "@/components/AdminComponents/ManageMovie/ManageMovie";
import BookMovieCard from "../BookMovieCard/BookMovieCard";

export interface Movie {
  id: string;
  posterUrl: string;
  name: string;
  description: string;
  genre: string; // Added category field
}

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<movieDetails[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [showTimes, setShowTimes] = useState<string[]>([]);
  const [ratings, setRatings] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState("All");
  const [filteredMovies, setFilteredMovies] = useState<movieDetails[]>([]); // New state for filtered movies
  const [selectedGenre, setSelectedGenre] = useState<string>("All");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedShowTime, setSelectedShowTime] = useState<string>("All");

  const filterMovies = (
    moviesList: movieDetails[],
    selectedGenre: any | null,
    selectedShowTime: any | null,
    selectedRating: "Upto 5" | "6 and above" | any
  ): movieDetails[] => {
    return moviesList.filter((movie) => {
      // Filter by genre (if selected)
      const genreMatch = selectedGenre !== "All" ? movie.genre.includes(selectedGenre) : true;

      // Filter by showtime (if selected)
      const showtimeMatch = selectedShowTime !== "All" ? movie.showtimes.includes(selectedShowTime) : true;

      // Filter by rating
      let ratingMatch = true;
      if (selectedRating === "6 and above") {
        ratingMatch = movie.rating >= 6;
      } else if (selectedRating === "Upto 5") {
        ratingMatch = movie.rating <= 5;
      }

      // Return true only if all conditions match
      return genreMatch && showtimeMatch && ratingMatch;
    });
  };

  useEffect(() => {
    // Fetch genres, showtimes, and ratings
    getFilterationList(setGenres, setShowTimes, setRatings);
    fetchMoviesToBook(setMovies);
  }, []);

  useEffect(() => {
    // Apply filters whenever movies, selectedGenre, selectedShowTime, or selectedRating change
    setFilteredMovies(filterMovies(movies, selectedGenre, selectedShowTime, selectedRating));
  }, [movies, selectedGenre, selectedShowTime, selectedRating]);

  return (
    <section>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Movies</h2>
      <div className={styles.container}>
        <div className={styles.filteration}>
          <p>Genre:</p>
          <CustomSelector
            options={genres}
            setSelectedValue={setSelectedGenre}
            placeholder="Genre"
            className="filterationSelector"
          />

          <p>Show Time:</p>
          <CustomSelector
            options={showTimes}
            setSelectedValue={setSelectedShowTime}
            placeholder="Show time"
            className="filterationSelector"
          />

          <p>Rating:</p>
          <CustomSelector
            options={ratings}
            setSelectedValue={setSelectedRating}
            placeholder="Rating"
            className="filterationSelector"
          />
        </div>
        
        <div className={styles.movieList}>
        {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <BookMovieCard key={movie._id} movie={movie} />
            ))
          ) : (
            <p className={styles.noMovies}>No movies found</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default MovieList;
