import React, { useState } from "react";
// Import CSS styles for the component
import styles from "./TheatersList.module.css";
// Import TheaterProps and FetchedTheatersProps interfaces
import { TheaterProps } from "../ManageTheaters/ManageTheaters";
import { FetchedTheatersProps } from "@/utils/fetchData";
// Import reusable ButtonComponent and PopupComponent
import ButtonComponent from "../../reusableComponents/ButtonComponent/ButtonComponent";
// Import handleDeleteTheater function from adminUtils
import { handleDeleteTheater } from "@/utils/adminUtils";
import PopupComponent from "../../reusableComponents/PopupComponent/PopupComponent";

// Define the interface for TheaterListProps
interface TheaterListProps {
  // Pass the theater list as a prop
  theaters: FetchedTheatersProps[];
}

// Define the TheatersList component
const TheatersList: React.FC<TheaterListProps> = ({ theaters }) => {
  // Initialize state for showPopup and message
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');

  // Define handleClosePopup function to close the popup
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  // Return the JSX for the component
  return (
    // Container for the theater list
    <div className={styles.theaterListContainer}>
      {/*
        Map over the theaters array and render a theater card for each theater
      */}
      {theaters.map((theater, index) => (
        // Theater card container
        <div key={index} className={styles.theaterCard}>
          {/* Theater index */}
          <h3 className={styles.theaterIndex}>#{index + 1}</h3>
          {/* Theater info container */}
          <div className={styles.theaterInfo}>
            {/* Theater name */}
            <h3 className={styles.theaterName}>{theater.theater_name}</h3>
            {/* Theater address */}
            <p className={styles.theaterAddress}>
              {theater.address}, {theater.city}, {theater.postcode}
            </p>
          </div>
          {/* Delete button */}
          <ButtonComponent 
            value="Delete" 
            className="deleteButton" 
            onClickFunction={() => handleDeleteTheater(theater, setShowPopup, setMessage)}
          />
        </div>
      ))}
      {/*
        Conditionally render the popup component if showPopup is true
      */}
      {showPopup &&
        <PopupComponent 
          message={message} 
          onClose={handleClosePopup} 
        />
      }
    </div>
  );
};

// Export the TheatersList component
export default TheatersList;