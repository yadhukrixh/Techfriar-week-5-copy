
import styles from './ShowTimes.module.css';
import { ShowTime } from '@/utils/fetchData';
import { fetchShowTimeId } from '@/utils/userUtils';
import { useRouter } from 'next/navigation';


interface ShowTimesProps {
    showtimes: ShowTime[];
    selectedDate:string;
    movieId:string;
    theaterId:string;
    setShowSeatMapping:(status:boolean)=>void;
    setShowTimeId:(value:string)=>void;
  }
  
  const ShowTimes: React.FC<ShowTimesProps> = ({ showtimes,selectedDate,movieId,theaterId, setShowSeatMapping,setShowTimeId}) => {
    const router = useRouter();
    return (
      <div className={styles.showtimesContainer}>
        {showtimes.map((showtime, index) => (
          <button key={index} className={styles.showtimeButton} onClick={()=>fetchShowTimeId(movieId,theaterId,selectedDate,showtime.time,setShowTimeId,setShowSeatMapping)}>
            {showtime.time}
          </button>
        ))}
      </div>
    );
  };
  
  export default ShowTimes;