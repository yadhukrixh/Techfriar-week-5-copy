// Import necessary dependencies
import React, { useEffect, useState } from "react";
import styles from "./MovieList.module.css";
import CustomSelector from "../../reusableComponents/SelectorComponent/SelectorComponent"; // Adjust the import path accordingly
import { fetchSchedules, getFilterationList } from "@/utils/fetchData";
import { ISchedule } from "@/components/AdminComponents/ScheduleCard/ScheduleCard";
import { fetchMoviesToBook } from "@/utils/userUtils";
import { movieDetails } from "@/components/AdminComponents/ManageMovie/ManageMovie";
import BookMovieCard from "../BookMovieCard/BookMovieCard";

// Define the Movie interface
export interface Movie {
  id: string;
  posterUrl: string;
  name: string;
  description: string;
  genre: string; // Added category field
}

// Define the MovieList component
const MovieList: React.FC = () => {
  // Initialize state variables
  const [movies, setMovies] = useState<movieDetails[]>([]); // List of movies
  const [genres, setGenres] = useState<string[]>([]); // List of genres
  const [showTimes, setShowTimes] = useState<string[]>([]); // List of show times
  const [ratings, setRatings] = useState<string[]>([]); // List of ratings
  const [selectedRating, setSelectedRating] = useState("All"); // Selected rating
  const [filteredMovies, setFilteredMovies] = useState<movieDetails[]>([]); // Filtered list of movies
  const [selectedGenre, setSelectedGenre] = useState<string>("All"); // Selected genre
  const [errorMessage, setErrorMessage] = useState(""); // Error message
  const [selectedShowTime, setSelectedShowTime] = useState<string>("All"); // Selected show time

  // Define the filterMovies function
  const filterMovies = (
    moviesList: movieDetails[], // List of movies to filter
    selectedGenre: any | null, // Selected genre
    selectedShowTime: any | null, // Selected show time
    selectedRating: "Upto 5" | "6 and above" | any // Selected rating
  ): movieDetails[] => {
    // Filter movies based on selected genre, show time, and rating
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

  // Fetch genres, showtimes, and ratings on component mount
  useEffect(() => {
    getFilterationList(setGenres, setShowTimes, setRatings);
    fetchMoviesToBook(setMovies);
  }, []);

  // Apply filters whenever movies, selectedGenre, selectedShowTime, or selectedRating change
  useEffect(() => {
    setFilteredMovies(filterMovies(movies, selectedGenre, selectedShowTime, selectedRating));
  }, [movies, selectedGenre, selectedShowTime, selectedRating]);

  // Render the component
  return (
    <section>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Movies</h2>
      <div className={styles.container}>
        <div className={styles.filteration}>
          <p>Genre:</p>
          <CustomSelector
            options={genres} // List of genres
            setSelectedValue={setSelectedGenre} // Set selected genre
            placeholder="Genre" // Placeholder text
            className="filterationSelector" // CSS class
          />

          <p>Show Time:</p>
          <CustomSelector
            options={showTimes} // List of show times
            setSelectedValue={setSelectedShowTime} // Set selected show time
            placeholder="Show time" // Placeholder text
            className="filterationSelector" // CSS class
          />

          <p>Rating:</p>
          <CustomSelector
            options={ratings} // List of ratings
            setSelectedValue={setSelectedRating} // Set selected rating
            placeholder="Rating" // Placeholder text
            className="filterationSelector" // CSS class
          />
        </div>

        <div className={styles.movieList}>
          {filteredMovies.length > 0 ? (
            // Render filtered movies
            filteredMovies.map((movie) => (
              <BookMovieCard key={movie._id} movie={movie} />
            ))
          ) : (
            // Display message if no movies found
            <p className={styles.noMovies}>No movies found</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default MovieList;