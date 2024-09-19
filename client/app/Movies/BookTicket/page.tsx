"use client";

// Import necessary components and utilities
import TheaterDetails from "@/components/UserComponents/TheaterDetails/TheaterDetails";
import styles from "./BookTicket.module.css";
import { BookingProps, fetchTheatresAndShows } from "@/utils/fetchData";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { movieDetails } from "@/components/AdminComponents/ManageMovie/ManageMovie";
import { movieData } from "@/utils/userUtils";
import SeatSelection from "@/components/UserComponents/SeatMap/SeatMap";
import SeatMap from "@/components/UserComponents/SeatMap/SeatMap";

// Define the page component
const page = () => {
  // Get search parameters from the URL
  const searchParams = useSearchParams();

  // Initialize state variables
  const [theaterList, setTheaterList] = useState<BookingProps[]>([]); // List of theaters and their show dates
  const [selectedDate, setSelectedDate] = useState<string | null>(null); // Currently selected date
  const [showSeatMapping, setSeatMapping] = useState(false); // Flag to show seat mapping
  const [movieId, setMovieId] = useState<any>( // ID of the movie
    searchParams.get("movie") ? searchParams.get("movie") : ""
  );
  const [movie, setMovie] = useState<movieDetails>(); // Details of the movie
  const [showTimeId, setShowTimeId] = useState(''); // ID of the show time

  // Fetch theater and show data when the component mounts or movie ID changes
  useEffect(() => {
    fetchTheatresAndShows(movieId, setTheaterList);
    movieData(movieId, setMovie);
  }, [movieId, setTheaterList, movieId, setMovie]);

  // Handle date selection
  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
  };

  // Format date for display
  const formatDate = (date: string) => {
    const dateObj = new Date(date);
    const day = dateObj.toLocaleDateString("en-US", { weekday: "short" }); // e.g., 'Mon'
    const dayNum = dateObj.getDate(); // e.g., 11
    const month = dateObj.toLocaleDateString("en-US", { month: "short" }); // e.g., 'Sep'
    return { day, dayNum, month };
  };

  // Render the component
  return (
    <div>
      {/* Show theater list and date selector if seat mapping is not shown */}
      {!showSeatMapping && (
        <div className={styles.container}>
          {/* Movie details */}
          <div className={styles.movieDetails}>
            <img
              src={movie?.posterUrl}
              alt={movie?.title}
              className={styles.moviePoster}
            />
            <div>
              <h1 className={styles.movieName}>{movie?.title}</h1>
              <p>
                {movie?.runtime}-{movie?.language}
              </p>
            </div>
          </div>

          {/* Date selector */}
          <div className={styles.dateSelector}>
            {theaterList[0]?.showDates.map((showDate, index) => {
              const { day, dayNum, month } = formatDate(showDate.date);
              return (
                <button
                  key={index}
                  className={`${styles.dateButton} ${
                    selectedDate === showDate.date ? styles.active : ""
                  }`}
                  onClick={() => handleDateSelect(showDate.date)}
                >
                  <span>{day}</span>
                  <span>{dayNum}</span>
                  <span>{month}</span>
                </button>
              );
            })}
          </div>

          {/* Theater list */}
          <div className={styles.theaterList}>
            {theaterList.map((theaterData, index) => (
              <TheaterDetails
                key={index}
                theater={theaterData.theater}
                showDates={theaterData.showDates}
                selectedDate={selectedDate}
                movieId={movieId}
                setShowSeatMapping={setSeatMapping}
                setShowTimeId={setShowTimeId}
              />
            ))}
          </div>
        </div>
      )}

      {/* Show seat mapping if selected */}
      {showSeatMapping &&
        <SeatMap showtimeId={showTimeId} />
      }
    </div>
  );
};

// Export the page component
export default page;