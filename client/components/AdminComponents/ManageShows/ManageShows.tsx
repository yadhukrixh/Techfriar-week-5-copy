"use client";

// Import necessary dependencies
import React, { useEffect, useState } from "react";
import styles from "./ManageShows.module.css";
import ButtonComponent from "@/components/reusableComponents/ButtonComponent/ButtonComponent";
import { fetchDataForSetShow, fetchSchedules } from "@/utils/fetchData";
import MovieSelectionComponent from "../MovieSelectionComponents/MovieSelectionComponets";
import TheaterSelectionComponent from "../TheaterSelectionComponent/TheaterSelectionComponent";
import SelectorComponent from "@/components/reusableComponents/SelectorComponent/SelectorComponent";
import { handleAddShow } from "@/utils/adminUtils";
import DatePickerComponent from "../DatePickerComponent/DatePickerComponent";
import PopupComponent from "@/components/reusableComponents/PopupComponent/PopupComponent";
import ScheduleCard, { ISchedule } from "../ScheduleCard/ScheduleCard";

// Define interfaces for movie and theater data
export interface MoviesForSetShow {
  _id: string;
  title: string;
}

export interface TheatersForSetShow {
  _id: string;
  theater_name: string;
}

// ManageShows component
const ManageShows = () => {
  // State variables for managing show addition and error messages
  const [showAddShow, setShowAddShow] = useState(false);
  const [responseStatus, setResponseStatus] = useState(false);
  const [movieList, setMovieList] = useState<MoviesForSetShow[]>([]);
  const [theaterList, setTheatersList] = useState<TheatersForSetShow[]>([]);
  const [selectedMovie, setSelectedMovie] = useState("");
  const [selectedTheater, setSelectedTheater] = useState("");
  const [selectedShowTime, setSelectedShowTime] = useState("");
  const [selectedShowDate, setSelectedShowDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [shedulesAdded, setShedulesAdded] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [schedules, setSchedules] = useState<ISchedule[]>([]);

  // Function to handle closing the popup
  const handleClosePopup = () => {
    setShedulesAdded(!shedulesAdded);
    setShowAddShow(!showAddShow);
  };

  // Predefined show times
  const preDefinedShowTimes = [
    "06:00",
    "10:00",
    "13:00",
    "16:00",
    "19:00",
    "22:00",
  ];

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch movie list and theaters list
        await fetchDataForSetShow(setMovieList, setTheatersList);
        
        // Fetch schedules
        await fetchSchedules(setSchedules, setErrorMessage);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [setMovieList, setTheatersList, setSchedules]);

  // Render the component
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.manageMovieHeader}>
        <h1 className={styles.title}>Manage Shows</h1>
        <button
          className={styles.addButton}
          onClick={() => setShowAddShow(!showAddShow)}
        >
          {showAddShow ? "Close Add Show" : "Add Show"}
        </button>
      </div>

      {showAddShow && (
        <div>
          <div className={styles.addMovieSection}>
            {/* Movie selection component */}
            <MovieSelectionComponent
              options={movieList}
              setSelectedValue={setSelectedMovie}
              placeholder="Movie"
            />
            {/* Theater selection component */}
            <TheaterSelectionComponent
              options={theaterList}
              setSelectedValue={setSelectedTheater}
              placeholder="Theater"
            />
            {/* Show time selection component */}
            <SelectorComponent
              options={preDefinedShowTimes}
              setSelectedValue={setSelectedShowTime}
              placeholder="Show Time"
            />

            {/* Date picker component */}
            <DatePickerComponent label="Date" setSelectedDate={setSelectedShowDate} />  
            {/* Submit button */}
            <ButtonComponent
              value="Submit"
              className="submitButton"
              onClickFunction={() =>
                handleAddShow(
                  selectedMovie,
                  selectedTheater,
                  selectedShowTime,
                  selectedShowDate,
                  setErrorMessage,
                  setPopupMessage,
                  setShedulesAdded
                )
              }
            />

          </div>
          <div>
            {/* Error message */}
            <p style={{textAlign:"center",color:"red"}}>{errorMessage}</p>
          </div>
          {/* Popup component */}
          {shedulesAdded &&
            <PopupComponent message={popupMessage} onClose={handleClosePopup}/>
          }
          
        </div>
      )}

      {!showAddShow && (
        <div>
          {/* Error message */}
          <p style={{textAlign:"center",color:"red"}}>{errorMessage}</p>
          {/* Schedule card component */}
          {schedules &&
          <div>
            <ScheduleCard schedules={schedules} />
          </div>
          }
          
        </div>
      )}
    </div>
  );
};

export default ManageShows;