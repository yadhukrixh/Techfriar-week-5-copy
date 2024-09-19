import React, { FC } from 'react';
import styles from './BookMovieCard.module.css';
import { movieDetails } from '@/components/AdminComponents/ManageMovie/ManageMovie';
import ButtonComponent from '@/components/reusableComponents/ButtonComponent/ButtonComponent';
import { useRouter } from 'next/navigation';

// Define the props interface for the BookMovieCard component
interface MovieCardProps {
    movie: movieDetails
}

// Define the BookMovieCard component
const BookMovieCard: FC<MovieCardProps> = ({ movie }) => {
    // Get the Next.js router instance
    const router = useRouter();

    // Define a handler function to navigate to the movie details page
    const handler = (movie: movieDetails) => {
        // Navigate to the movie details page with the movie ID as a query parameter
        router.push(`/Movies/MovieDetails?movie=${movie._id}`);
    }

    // Render the BookMovieCard component
    return (
        <div>
            {/* The card container with an onClick event handler */}
            <div className={styles.card} onClick={() => handler(movie)}>
                {/* The movie poster image */}
                <img src={movie.posterUrl} alt={movie.title} className={styles.poster} />
                {/* The movie details container */}
                <div className={styles.details}>
                    {/* The movie title */}
                    <h3>{movie.title}</h3>
                    {/* The movie runtime */}
                    <p className={styles.runtime}>{movie.runtime}</p>
                    {/* The movie rating */}
                    <p className={styles.rating}>Rating: {movie.rating}/10</p>
                </div>
            </div>
        </div>
    )
}

// Export the BookMovieCard component as the default export
export default BookMovieCard