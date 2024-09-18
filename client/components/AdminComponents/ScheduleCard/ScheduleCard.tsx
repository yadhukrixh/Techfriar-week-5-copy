import React from 'react';
import styles from './ScheduleCard.module.css';
import ButtonComponent from '@/components/reusableComponents/ButtonComponent/ButtonComponent';

// Define TypeScript interfaces based on your data
interface ISeat {
  seatNumber: string;
  bookingStatus: boolean;
  bookedUser: string | null;
}

interface IShowtime {
  time: string;
  seats: ISeat[];
  _id: string;
}

interface IShowDate {
  date: Date;
  showtimes: IShowtime[];
  _id: string;
}

interface IMovie {
  movieId: {
    _id: string;
    title: string;
    imdbID: string;
  };
  showDates: IShowDate[];
  _id: string;
}

interface ITheater {
  _id: string;
  theater_name: string;
  address: string;
}

export interface ISchedule {
  _id: string;
  theaterId: ITheater;
  movies: IMovie[];
}

// Props type
interface ScheduleCardProps {
  schedules: ISchedule[];
  onDeleteShowtime?: (showtimeId: string) => void;
}

// Card Component
const ScheduleCard: React.FC<ScheduleCardProps> = ({ schedules, onDeleteShowtime }) => {
  return (
    <div className={styles.scheduleCardsContainer}>
      {schedules.map((schedule) => (
        <div key={schedule._id} className={styles.scheduleCard}>
          <h2>{schedule.theaterId?.theater_name}</h2>
          <p>{schedule.theaterId?.address}</p>
          {schedule.movies?.map((movie) => (
            <div key={movie._id} className={styles.movieSection}>
              <h3>{movie.movieId?.title}</h3>
              {movie.showDates.map((showDate) => (
                <div key={showDate._id} className={styles.showDateSection}>
                  <h4>{new Date(showDate.date).toDateString()}</h4>
                  {showDate.showtimes.map((showtime) => (
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
