"use client";

import TheaterDetails from "@/components/UserComponents/TheaterDetails/TheaterDetails";
import styles from "./BookTicket.module.css";
import { BookingProps, fetchTheatresAndShows } from "@/utils/fetchData";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { movieDetails } from "@/components/AdminComponents/ManageMovie/ManageMovie";
import { movieData } from "@/utils/userUtils";
import SeatSelection from "@/components/UserComponents/SeatMap/SeatMap";
import SeatMap from "@/components/UserComponents/SeatMap/SeatMap";

const page = () => {
  const searchParams = useSearchParams();
  const [theaterList, setTheaterList] = useState<BookingProps[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showSeatMapping, setSeatMapping] = useState(false);
  const [movieId, setMovieId] = useState<any>(
    searchParams.get("movie") ? searchParams.get("movie") : ""
  );
  const [movie, setMovie] = useState<movieDetails>();
  const [showTimeId,setShowTimeId] = useState('')
  useEffect(() => {
    fetchTheatresAndShows(movieId, setTheaterList);
    movieData(movieId, setMovie);
  }, [movieId, setTheaterList, movieId, setMovie]);

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
  };
  const formatDate = (date: string) => {
    const dateObj = new Date(date);
    const day = dateObj.toLocaleDateString("en-US", { weekday: "short" }); // e.g., 'Mon'
    const dayNum = dateObj.getDate(); // e.g., 11
    const month = dateObj.toLocaleDateString("en-US", { month: "short" }); // e.g., 'Sep'
    return { day, dayNum, month };
  };

  return (
    <div>
      {!showSeatMapping && (
        <div className={styles.container}>
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
          <div className={styles.dateSelector}>
            {/* Date Selector */}
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

          <div className={styles.theaterList}>
            {/* Theater List */}
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
      {showSeatMapping &&
        <SeatMap showtimeId={showTimeId}/>
      }
    </div>
  );
};

export default page;
