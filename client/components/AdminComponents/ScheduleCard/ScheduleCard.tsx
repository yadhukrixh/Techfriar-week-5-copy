// Import necessary dependencies
import React from 'react';
import styles from './ScheduleCard.module.css';
import ButtonComponent from '@/components/reusableComponents/ButtonComponent/ButtonComponent';

// Define TypeScript interfaces based on your data
/**
 * Interface for a single seat
 */
interface ISeat {
  seatNumber: string;
  bookingStatus: boolean;
  bookedUser: string | null;
}

/**
 * Interface for a single showtime
 */
interface IShowtime {
  time: string;
  seats: ISeat[];
  _id: string;
}

/**
 * Interface for a single show date
 */
interface IShowDate {
  date: Date;
  showtimes: IShowtime[];
  _id: string;
}

/**
 * Interface for a single movie
 */
interface IMovie {
  movieId: {
    _id: string;
    title: string;
    imdbID: string;
  };
  showDates: IShowDate[];
  _id: string;
}

/**
 * Interface for a single theater
 */
interface ITheater {
  _id: string;
  theater_name: string;
  address: string;
}

/**
 * Interface for a schedule
 */
export interface ISchedule {
  _id: string;
  theaterId: ITheater;
  movies: IMovie[];
}

// Props type
/**
 * Props for the ScheduleCard component
 */
interface ScheduleCardProps {
  schedules: ISchedule[];
  onDeleteShowtime?: (showtimeId: string) => void;
}

// Card Component
/**
 * ScheduleCard component
 * 
 * @param schedules - An array of schedules
 * @param onDeleteShowtime - A callback function to delete a showtime
 */
const ScheduleCard: React.FC<ScheduleCardProps> = ({ schedules, onDeleteShowtime }) => {
  return (
    // Container for all schedule cards
    <div className={styles.scheduleCardsContainer}>
      {schedules.map((schedule) => (
        // Individual schedule card
        <div key={schedule._id} className={styles.scheduleCard}>
          <h2>{schedule.theaterId?.theater_name}</h2>
          <p>{schedule.theaterId?.address}</p>
          {schedule.movies?.map((movie) => (
            // Movie section
            <div key={movie._id} className={styles.movieSection}>
              <h3>{movie.movieId?.title}</h3>
              {movie.showDates.map((showDate) => (
                // Show date section
                <div key={showDate._id} className={styles.showDateSection}>
                  <h4>{new Date(showDate.date).toDateString()}</h4>
                  {showDate.showtimes.map((showtime) => (
                    // Showtime section
                    <div key={showtime._id} className={styles.showtimeSection}>
                      <span>{showtime.time}</span>
                      <ButtonComponent value='Delete' className='deleteButton' />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ScheduleCard;