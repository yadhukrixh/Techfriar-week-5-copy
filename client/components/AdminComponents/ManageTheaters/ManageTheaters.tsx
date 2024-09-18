"use client";

import React, { useEffect, useState } from "react";
import styles from "./ManageTheaters.module.css";
import InputComponent from "../../reusableComponents/InputComponent/InputComponent";
import ButtonComponent from "../../reusableComponents/ButtonComponent/ButtonComponent";
import { handleSearchTheatres } from "@/utils/adminUtils";
import NewTheaterList from "../NewTheatersList/NewTheatersList";
import PopupComponent from "../../reusableComponents/PopupComponent/PopupComponent";
import TheatersList from "../TheatersList/TheatersList";
import { FetchedTheatersProps, fetchTheaters } from "@/utils/fetchData";

export interface TheaterProps {
  cinema_name: string;
  address?: string;
  city?: string;
  postcode?: number;
  lat?: number;
  lng?: number;
}

const ManageTheaters = () => {
  const [showAddTheaters, setShowAddTheaters] = useState(false);
  const [lattitudes, setLattitudes] = useState("");
  const [longitudes, setLongitudes] = useState("");
  const [theatersList, setTheatersList] = useState<TheaterProps[]>([]);
  const [theatersFound, setTheatersFound] = useState(false);
  const [message, setMessage] = useState("");
  const [theaterAdded, setTheaterAdded] = useState(false);
  const [theaters, setTheaters] = useState<FetchedTheatersProps[]>([]);
  const [errorMessage,setErrorMessage] = useState('');

  useEffect(() => {
    fetchTheaters(setTheaters);

    if (theaters?.length === 0) {
      setErrorMessage("Please add any new Theaters to see the list.");
    } else {
      setErrorMessage('');
    }
  }, [setTheaters,theaters,setErrorMessage]);

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLattitudes(position.coords.latitude.toString());
          setLongitudes(position.coords.longitude.toString());
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleClosePopup = () => {
    setTheaterAdded(!theaterAdded);
    setShowAddTheaters(!showAddTheaters);
  };

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
          </div>
        </div>
      )}

        {!showAddTheaters &&
          <div>
            <TheatersList theaters={theaters}/>
            <p style={{width:'100%',color:'red',textAlign:'center'}}>{errorMessage}</p>
          </div>
        }


      {theaterAdded && (
        <PopupComponent message={message} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default ManageTheaters;
