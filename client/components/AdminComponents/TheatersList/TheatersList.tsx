import React, { useState } from "react";
import styles from "./TheatersList.module.css"; // Import CSS for styling
import { TheaterProps } from "../ManageTheaters/ManageTheaters";
import { FetchedTheatersProps } from "@/utils/fetchData";
import ButtonComponent from "../../reusableComponents/ButtonComponent/ButtonComponent";
import { handleDeleteTheater } from "@/utils/adminUtils";
import PopupComponent from "../../reusableComponents/PopupComponent/PopupComponent";



interface TheaterListProps {
  theaters: FetchedTheatersProps[]; // Pass the theater list as a prop
}

const TheatersList: React.FC<TheaterListProps> = ({ theaters }) => {
    const [showPopup,setShowPopup] = useState(false);
    const [message,setMessage] = useState('');

    const handleClosePopup = () => {
        setShowPopup(false);
    };


  return (
    <div className={styles.theaterListContainer}>
      {theaters.map((theater, index) => (
        <div key={index} className={styles.theaterCard}>
          <h3 className={styles.theaterIndex}>#{index + 1}</h3>
          <div className={styles.theaterInfo}>
            <h3 className={styles.theaterName}>{theater.theater_name}</h3>
            <p className={styles.theaterAddress}>
              {theater.address}, {theater.city}, {theater.postcode}
            </p>
          </div>
          <ButtonComponent value="Delete" className="deleteButton" onClickFunction={()=>handleDeleteTheater(theater,setShowPopup,setMessage)}/>
        </div>
      ))}
      {showPopup &&
        <PopupComponent message={message} onClose={handleClosePopup} />
      }
    </div>
  );
};

export default TheatersList;
