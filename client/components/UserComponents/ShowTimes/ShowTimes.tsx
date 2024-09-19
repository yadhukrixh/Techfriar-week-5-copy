import styles from './ShowTimes.module.css';
import { ShowTime } from '@/utils/fetchData';
import { fetchShowTimeId } from '@/utils/userUtils';
import { useRouter } from 'next/navigation';

/**
 * Interface for ShowTimes component props
 */
interface ShowTimesProps {
  /**
   * Array of showtimes
   */
  showtimes: ShowTime[];
  /**
   * Selected date
   */
  selectedDate: string;
  /**
   * Movie ID
   */
  movieId: string;
  /**
   * Theater ID
   */
  theaterId: string;
  /**
   * Function to set show seat mapping status
   */
  setShowSeatMapping: (status: boolean) => void;
  /**
   * Function to set show time ID
   */
  setShowTimeId: (value: string) => void;
}

/**
 * ShowTimes component
 */
const ShowTimes: React.FC<ShowTimesProps> = ({
  showtimes,
  selectedDate,
  movieId,
  theaterId,
  setShowSeatMapping,
  setShowTimeId,
}) => {
  // Get the router instance
  const router = useRouter();

  return (
    // Container for showtimes
    <div className={styles.showtimesContainer}>
      {/*
        Map through showtimes and render a button for each
      */}
      {showtimes.map((showtime, index) => (
        // Button for each showtime
        <button
          key={index}
          className={styles.showtimeButton}
          // Handle click event to fetch show time ID
          onClick={() =>
            fetchShowTimeId(
              movieId,
              theaterId,
              selectedDate,
              showtime.time,
              setShowTimeId,
              setShowSeatMapping
            )
          }
        >
          {/*
            Display showtime
          */}
          {showtime.time}
        </button>
      ))}
    </div>
  );
};

export default ShowTimes;