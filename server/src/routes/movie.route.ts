import express, { Request, Response } from 'express';
import { 
  addShows, 
  addTheater, 
  deleteMovie, 
  deleteTheater, 
  fetchAllTheaterSchedules, 
  fetchMovieDetailsToRegister, 
  fetchMovies,  
  fetchMoviesForSetShow,  
  fetchMoviesToBook,  
  fetchMovieToDetailedView,  
  fetchSeatAllocation,  
  fetchShowTimeId, 
  fetchTheaters, 
  fetchTheatersForSetShow, 
  getGenres, 
  registerMovie, 
  searchTheaters, 
  theaterListToBook 
} from '../controllers/movie.controllers';


// Create a new Express router instance
const router = express.Router();


// Define routes for movie registration
router.post("/fetchMovieDetailsToRegister", fetchMovieDetailsToRegister); // Fetch movie details for registration
router.post("/registerMovie", registerMovie); // Register a new movie


// Define routes for movie retrieval
router.post("/fetchMovies", fetchMovies); // Fetch all movies
router.delete('/deleteMovie/:id', deleteMovie) // Delete a movie by ID


// Define routes for theater management
router.post('/searchTheaters', searchTheaters); // Search for theaters
router.post('/addTheater', addTheater); // Add a new theater
router.post('/fetchTheaters', fetchTheaters); // Fetch all theaters
router.delete('/deleteTheater/:id', deleteTheater) // Delete a theater by ID


// Define routes for show management
router.post('/fetchMoviesForSetShow', fetchMoviesForSetShow); // Fetch movies for setting up a show
router.post('/fetchTheatersForsetShow', fetchTheatersForSetShow); // Fetch theaters for setting up a show
router.post('/addShows', addShows); // Add a new show
router.post('/fetchAllTheaterSchedules', fetchAllTheaterSchedules); // Fetch all theater schedules


// Define routes for genre retrieval
router.post('/getGenres', getGenres) // Fetch all genres


// Define routes for booking
router.post('/fetchMoviesToBook', fetchMoviesToBook); // Fetch movies for booking
router.post('/fetchMovieToDetailedView', fetchMovieToDetailedView) // Fetch movie details for booking
router.post('/theaterListToBook', theaterListToBook); // Fetch theater list for booking
router.post('/fetchShowTimeId', fetchShowTimeId); // Fetch show time ID for booking
router.post('/fetchSeatAllocation', fetchSeatAllocation); // Fetch seat allocation for booking


// Export the router instance
export default router;