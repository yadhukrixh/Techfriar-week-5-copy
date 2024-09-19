"use client";

// Import necessary components and utilities
import { movieDetails } from "@/components/AdminComponents/ManageMovie/ManageMovie";
import styles from "./MovieDetails.module.css";
import { movieData } from "@/utils/userUtils";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import SignInPopup from "@/components/UserComponents/SignInPopup/SignInPopup";

// Define the page component
const page = () => {
  // Get the router and search parameters
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize state variables
  const [movieId, setMovieId] = useState<any>(
    searchParams.get("movie") ? searchParams.get("movie") : ""
  );
  const [movie, setMovie] = useState<movieDetails>();
  const [showSigninComponent, setShowSigninComponent] = useState(false);

  // Fetch movie data when the component mounts or the movie ID changes
  useEffect(() => {
    movieData(movieId, setMovie);
  }, [movieId, setMovie]);

  // Function to open the sign-in popup
  const openPopup = () => setShowSigninComponent(true);

  // Function to close the sign-in popup
  const closePopup = () => setShowSigninComponent(false);

  // Function to handle booking a ticket
  const handleBookTicket = (id: any) => {
    // Check if the user is logged in
    const token: any = localStorage.getItem("token");
    if (token) {
      // If logged in, navigate to the book ticket page
      router.push(`/Movies/BookTicket?movie=${id}`);
    } else {
      // If not logged in, open the sign-in popup
      openPopup();
    }
  };

  // Get the background poster URL
  const backgroundPoster = movie?.posterUrl;

  // Render the component
  return (
    <div className={styles.detailsSection}>
      {/* Movie info container */}
      <div
        className={styles.movieInfoContainer}
        style={{ backgroundImage: `url(${backgroundPoster})` }}
      >
        {/* Movie poster */}
        <img
          src={movie?.posterUrl || "/path/to/dummy-poster.jpg"}
          alt={movie?.title}
          className={styles.movieImage}
        />
        {/* Movie info */}
        <div className={styles.movieInfo}>
          <h2>{movie?.title}</h2>
          {/* Rating and language */}
          <div className={styles.ratingBox}>
            <span>⭐ {movie?.rating}/10</span>
            <span> - {movie?.language}</span>
          </div>
          {/* Runtime and genre */}
          <p>
            {movie?.runtime} -{" "}
            {movie?.genre?.map((element, index) => (
              <span key={index}>
                {element}
                {index < movie.genre.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
          {/* Release date */}
          <p>Release Date:</p>
          {/* Book ticket button */}
          <button
            className={styles.bookButton}
            onClick={() => handleBookTicket(movie?._id)}
          >
            Book tickets
          </button>
        </div>
      </div>

      {/* About the movie section */}
      <div className={styles.aboutSection}>
        <h3>About the movie</h3>
        <p>{movie?.plot}</p>
      </div>

      {/* Cast and crew section */}
      <div className={styles.castCrewSection}>
        <h3>Cast</h3>
        <div className={styles.castList}>
          {movie?.actors?.map((actor, index) => (
            <div key={index} className={styles.castMember}>
              <img
                src="/images/user.svg"
                alt={actor}
                className={styles.actorImage}
              />
              <p>{actor}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sign-in popup */}
      <SignInPopup isOpen={showSigninComponent} onClose={closePopup} />
    </div>
  );
};

// Export the page component
export default page;