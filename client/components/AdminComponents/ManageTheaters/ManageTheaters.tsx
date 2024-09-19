"use client";

// Import necessary dependencies
import React, { useEffect, useState } from "react";
import styles from "./ManageTheaters.module.css";
import InputComponent from "../../reusableComponents/InputComponent/InputComponent";
import ButtonComponent from "../../reusableComponents/ButtonComponent/ButtonComponent";
import { handleSearchTheatres } from "@/utils/adminUtils";
import NewTheaterList from "../NewTheatersList/NewTheatersList";
import PopupComponent from "../../reusableComponents/PopupComponent/PopupComponent";
import TheatersList from "../TheatersList/TheatersList";
import { FetchedTheatersProps, fetchTheaters } from "@/utils/fetchData";

// Define the interface for TheaterProps
export interface TheaterProps {
  cinema_name: string;
  address?: string;
  city?: string;
  postcode?: number;
  lat?: number;
  lng?: number;
}

// Define the ManageTheaters component
const ManageTheaters = () => {
  // Initialize state variables
  const [showAddTheaters, setShowAddTheaters] = useState(false); // Flag to show/hide the add theaters section
  const [lattitudes, setLattitudes] = useState(""); // Store the latitude value
  const [longitudes, setLongitudes] = useState(""); // Store the longitude value
  const [theatersList, setTheatersList] = useState<TheaterProps[]>([]); // Store the list of theaters
  const [theatersFound, setTheatersFound] = useState(false); // Flag to indicate if theaters are found
  const [message, setMessage] = useState(""); // Store the message to display
  const [theaterAdded, setTheaterAdded] = useState(false); // Flag to indicate if a theater is added
  const [theaters, setTheaters] = useState<FetchedTheatersProps[]>([]); // Store the list of fetched theaters
  const [errorMessage, setErrorMessage] = useState(''); // Store the error message

  // Use effect hook to fetch theaters and update the error message
  useEffect(() => {
    // Fetch theaters
    fetchTheaters(setTheaters);

    // Update the error message based on the number of theaters
    if (theaters?.length === 0) {
      setErrorMessage("Please add any new Theaters to see the list.");
    } else {
      setErrorMessage('');
    }
  }, [setTheaters, theaters, setErrorMessage]);

  // Function to get the current location
  const handleGetLocation = () => {
    // Check if geolocation is supported
    if (navigator.geolocation) {
      // Get the current position
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Update the latitude and longitude values
          setLattitudes(position.coords.latitude.toString());
          setLongitudes(position.coords.longitude.toString());
        },
        (error) => {
          // Log the error
          console.error("Error getting location:", error);
        }
      );
    } else {
      // Log the error
      console.error("Geolocation is not supported by this browser.");
    }
  };

  // Function to handle the close popup event
  const handleClosePopup = () => {
    // Toggle the theaterAdded flag
    setTheaterAdded(!theaterAdded);
    // Toggle the showAddTheaters flag
    setShowAddTheaters(!showAddTheaters);
  };

  // Return the JSX
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.manageMovieHeader}>
        <h1 className={styles.title}>Manage Theaters</h1>
        <button
          className={styles.addButton}
          onClick={() => setShowAddTheaters(!showAddTheaters)}
        >
          {showAddTheaters ? "Close Add Theaters" : "Add Theaters"}
        </button>
      </div>

      {showAddTheaters && !theaterAdded && (
        <div>
          <div className={styles.addMovieSection}>
            <InputComponent
              type="text"
              value={lattitudes}
              onChange={setLattitudes}
              customClassName="searchInput"
              placeholder="Enter Your Lattitues manually"
            />
            <InputComponent
              type="number"
              value={longitudes}
              onChange={setLongitudes}
              customClassName="searchInput"
              placeholder="Enter the longitudes manually"
            />
            <ButtonComponent
              value="Get location"
              onClickFunction={handleGetLocation}
              className="searchButton"
            />
            <ButtonComponent
              value="Search"
              className="searchButton"
              onClickFunction={() =>
                handleSearchTheatres(
                  lattitudes,
                  longitudes,
                  setTheatersList,
                  setTheatersFound,
                  setMessage
                )
              }
            />
          </div>

          <div>
            {theatersFound && (
              <NewTheaterList
                theaters={theatersList}
                setMessage={setMessage}
                setTheaterAdded={setTheaterAdded}
              />
            )}
            {!theatersFound && message && 
              <PopupComponent message={message} onClose={handleClosePopup}/>
            }
          </div>
        </div>
      )}

      {!showAddTheaters &&
        <div>
          <TheatersList theaters={theaters} />
          <p style={{ width: '100%', color: 'red', textAlign: 'center' }}>{errorMessage}</p>
        </div>
      }

      {theaterAdded && (
        <PopupComponent message={message} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default ManageTheaters;
