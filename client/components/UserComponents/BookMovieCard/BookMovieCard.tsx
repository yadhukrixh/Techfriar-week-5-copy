import React, { FC } from 'react';
import styles from './BookMovieCard.module.css';
import { movieDetails } from '@/components/AdminComponents/ManageMovie/ManageMovie';
import ButtonComponent from '@/components/reusableComponents/ButtonComponent/ButtonComponent';
import { useRouter } from 'next/navigation';

interface MovieCardProps {
    movie:movieDetails
}

const BookMovieCard:FC<MovieCardProps> = ({movie}) => {
    const router = useRouter();
    const handler = (movie:movieDetails)=>{
        router.push(`/Movies/MovieDetails?movie=${movie._id}`);
    }

  return (
    <div>
      <div className={styles.card} onClick={()=>handler(movie)}>
      <img src={movie.posterUrl} alt={movie.title} className={styles.poster} />
      <div className={styles.details}>
        <h3>{movie.title}</h3>
        <p className={styles.runtime}>{movie.runtime}</p>
        <p className={styles.rating}>Rating: {movie.rating}/10</p>
      </div>
    </div>
    </div>
  )
}

export default BookMovieCard
