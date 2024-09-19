import React from 'react';
import styles from './TheaterDetails.module.css';
import { ShowDate, Theater } from '@/utils/fetchData';
import ShowTimes from '../ShowTimes/ShowTimes';

/**
 * Props for the TheaterDetails component.
 * 
 * @typedef {Object} TheaterDetailsProps
 * @property {Theater} theater - The theater object.
 * @property {ShowDate[]} showDates - An array of show dates.
 * @property {string|null} selectedDate - The selected date.
 * @property {string} movieId - The movie ID.
 * @property {(status: boolean) => void} setShowSeatMapping - A function to set the show seat mapping status.
 * @property {(value: string) => void} setShowTimeId - A function to set the show time ID.
 */
interface TheaterDetailsProps {
  theater: Theater;
  showDates: ShowDate[];
  selectedDate: string | null;
  movieId: string;
  setShowSeatMapping: (status: boolean) => void;
  setShowTimeId: (value: string) => void;
}

/**
 * The TheaterDetails component displays the details of a theater and its showtimes.
 * 
 * @param {TheaterDetailsProps} props - The component props.
 * @returns {JSX.Element} The component JSX.
 */
const TheaterDetails: React.FC<TheaterDetailsProps> = ({
  theater,
  showDates,
  selectedDate,
  movieId,
  setShowSeatMapping,
  setShowTimeId,
}) => {
  // Find the selected show date from the list of show dates.
  const selectedShowDate = showDates.find((showDate) => showDate.date === selectedDate);

  return (
    // The theater card container.
    <div className={styles.theaterCard}>
      {/* The theater name. */}
      <h2 className={styles.theaterName}>{theater.theater_name}</h2>
      {/* The theater address. */}
      <p className={styles.theaterAddress}>{theater.address}, {theater.city} - {theater.postcode}</p>

      {/* Show showtimes only for the selected date. */}
      {selectedShowDate ? (
        // The showtimes component.
        <ShowTimes
          showtimes={selectedShowDate.showtimes}
          movieId={movieId}
          theaterId={theater.theaterId?._id ? theater.theaterId._id : "null"}
          selectedDate={selectedDate ? selectedDate : "not null"}
          setShowSeatMapping={setShowSeatMapping}
          setShowTimeId={setShowTimeId}
        />
      ) : (
        // No showtimes available message.
        <p className={styles.noShows}>No showtimes available for the selected date</p>
      )}
    </div>
  );
};

export default TheaterDetails;