"use client";

import { movieDetails } from "@/components/AdminComponents/ManageMovie/ManageMovie";
import styles from "./MovieDetails.module.css";
import { movieData } from "@/utils/userUtils";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import SignInPopup from "@/components/UserComponents/SignInPopup/SignInPopup";

const page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [movieId, setMovieId] = useState<any>(
    searchParams.get("movie") ? searchParams.get("movie") : ""
  );
  const [movie, setMovie] = useState<movieDetails>();
  const [showSigninComponent, setShowSigninComponent] = useState(false);
  useEffect(() => {
    movieData(movieId, setMovie);
  }, [movieId, setMovie]);

  const openPopup = () => setShowSigninComponent(true);
  const closePopup = () => setShowSigninComponent(false);

  const handleBookTicket = (id: any) => {
    const token: any = localStorage.getItem("token");
    if (token) {
      router.push(`/Movies/BookTicket?movie=${id}`);
    } else {
      openPopup();
    }
  };

  const backgroundPoster = movie?.posterUrl;
  return (
    <div className={styles.detailsSection}>
      <div
        className={styles.movieInfoContainer}
        style={{ backgroundImage: `url(${backgroundPoster})` }}
      >
        <img
          src={movie?.posterUrl || "/path/to/dummy-poster.jpg"}
          alt={movie?.title}
          className={styles.movieImage}
        />
        <div className={styles.movieInfo}>
          <h2>{movie?.title}</h2>
          <div className={styles.ratingBox}>
            <span>⭐ {movie?.rating}/10</span>
            <span> - {movie?.language}</span>
          </div>
          <p>
            {movie?.runtime} -{" "}
            {movie?.genre?.map((element, index) => (
              <span key={index}>
                {element}
                {index < movie.genre.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
          <p>Release Date:</p>
          <button
            className={styles.bookButton}
            onClick={() => handleBookTicket(movie?._id)}
          >
            Book tickets
          </button>
        </div>
      </div>

      <div className={styles.aboutSection}>
        <h3>About the movie</h3>
        <p>{movie?.plot}</p>
      </div>

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
      <SignInPopup isOpen={showSigninComponent} onClose={closePopup} />
    </div>
  );
};

export default page;
