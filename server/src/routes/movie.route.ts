import express, { Request, Response } from 'express';
import { addShows, addTheater, deleteMovie, deleteTheater, fetchAllTheaterSchedules, fetchMovieDetailsToRegister, fetchMovies,  fetchMoviesForSetShow,  fetchMoviesToBook,  fetchMovieToDetailedView,  fetchSeatAllocation,  fetchShowTimeId, fetchTheaters, fetchTheatersForSetShow, getGenres, registerMovie, searchTheaters, theaterListToBook } from '../controllers/movie.controllers';




const router = express.Router();

router.post("/fetchMovieDetailsToRegister",fetchMovieDetailsToRegister);

router.post("/registerMovie",registerMovie);

router.post("/fetchMovies",fetchMovies);

router.delete('/deleteMovie/:id',deleteMovie)

router.post('/searchTheaters',searchTheaters);

router.post('/addTheater',addTheater);

router.post('/fetchTheaters',fetchTheaters);

router.delete('/deleteTheater/:id',deleteTheater);


router.post('/fetchMoviesForSetShow',fetchMoviesForSetShow);

router.post('/fetchTheatersForsetShow',fetchTheatersForSetShow);

router.post('/addShows',addShows);

router.post('/fetchAllTheaterSchedules',fetchAllTheaterSchedules);

router.post('/getGenres',getGenres)

router.post('/fetchMoviesToBook',fetchMoviesToBook);

router.post('/fetchMovieToDetailedView',fetchMovieToDetailedView)

router.post('/theaterListToBook',theaterListToBook);

router.post('/fetchShowTimeId',fetchShowTimeId);

router.post('/fetchSeatAllocation',fetchSeatAllocation);


export default router;