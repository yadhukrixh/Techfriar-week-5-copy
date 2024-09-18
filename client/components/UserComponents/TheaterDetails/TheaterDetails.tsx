import React from 'react';
import styles from './TheaterDetails.module.css';
import { ShowDate, Theater } from '@/utils/fetchData';
import ShowTimes from '../ShowTimes/ShowTimes';
interface TheaterDetailsProps {
    theater: Theater;
    showDates: ShowDate[];
    selectedDate: string | null;
    movieId:string;
    setShowSeatMapping:(status:boolean)=>void;
    setShowTimeId:(value:string)=>void;
  }
  
  
  const TheaterDetails: React.FC<TheaterDetailsProps> = ({ theater, showDates, selectedDate,movieId,setShowSeatMapping,setShowTimeId }) => {
    const selectedShowDate = showDates.find((showDate) => showDate.date === selectedDate);
  
    return (
      <div className={styles.theaterCard}>
        <h2 className={styles.theaterName}>{theater.theater_name}</h2>
        <p className={styles.theaterAddress}>{theater.address}, {theater.city} - {theater.postcode}</p>
        
        {/* Show showtimes only for the selected date */}
        {selectedShowDate ? (
          <ShowTimes showtimes={selectedShowDate.showtimes} movieId={movieId} theaterId={theater.theaterId?._id?theater.theaterId._id:"null"} selectedDate={selectedDate?selectedDate:"not null"} setShowSeatMapping={setShowSeatMapping} setShowTimeId={setShowTimeId}/>
        ) : (
          <p className={styles.noShows}>No showtimes available for the selected date</p>
        )}
      </div>
    );
  };
  
  export default TheaterDetails;