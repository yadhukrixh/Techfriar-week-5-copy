// Import necessary components and libraries
import { MoviesForSetShow, TheatersForSetShow } from "@/components/AdminComponents/ManageShows/ManageShows";
import { ISchedule } from "@/components/AdminComponents/ScheduleCard/ScheduleCard";
import axios from "axios";

// Define the interface for fetched movie properties
export interface FetchedMovieProps {
    _id: string; // Unique movie ID
    title: string; // Movie title
    year: string; // Movie release year
    language: string; // Movie language
    releaseDate: Date; // Movie release date
    runtime: string; // Movie runtime
    genre: string[]; // Movie genres
    actors: string[]; // Movie actors
    plot: string; // Movie plot
    posterUrl: string; // Movie poster URL
    showtimes?: string[]; // Movie showtimes (optional)
}

// Function to fetch movies for the admin panel
export const fetchMovies = async (
    setMovies: (list: FetchedMovieProps[]) => void // Callback function to set the fetched movies
) => {
    try {
        // Send a POST request to fetch movies
        const response = await axios.post("http://localhost:3200/movie/fetchMovies");
        if (response.data) {
            // Set the fetched movies
            setMovies(response.data.movieList);
        }
    } catch (error) {
        // Log any errors
        console.error(error);
    }
}

// Define the interface for fetched theater properties
export interface FetchedTheatersProps {
    address: string; // Theater address
    city: string; // Theater city
    lat: number; // Theater latitude
    lng: number; // Theater longitude
    postcode: number; // Theater postcode
    seats: number; // Theater seats
    theater_name: string; // Theater name
    _id: string; // Unique theater ID
}

// Function to fetch theaters
export const fetchTheaters = async (
    setTheaters: (list: FetchedTheatersProps[]) => void // Callback function to set the fetched theaters
) => {
    try {
        // Send a POST request to fetch theaters
        const response = await axios.post('http://localhost:3200/movie/fetchTheaters');
        if (response.data) {
            // Set the fetched theaters
            setTheaters(response.data);
        }
    } catch (error) {
        // Log any errors
        console.error(error);
    }
}

// Function to fetch movies and theaters for setting a show
export const fetchDataForSetShow = async (
    setMovies: (list: MoviesForSetShow[]) => void, // Callback function to set the fetched movies
    setTheaters: (list: TheatersForSetShow[]) => void // Callback function to set the fetched theaters
) => {
    try {
        // Send a POST request to fetch movies for setting a show
        const movie = await axios.post('http://localhost:3200/movie/fetchMoviesForSetShow');
        // Send a POST request to fetch theaters for setting a show
        const theater = await axios.post('http://localhost:3200/movie/fetchTheatersForsetShow');
        if (movie.data || theater.data) {
            // Set the fetched movies and theaters
            setMovies(movie.data);
            setTheaters(theater.data)
        }
    } catch (error) {
        // Log any errors
        console.error(error);
    }
}

// Function to fetch schedules
export const fetchSchedules = async (
    setSchedules: (list: ISchedule[]) => void, // Callback function to set the fetched schedules
    setErrorMessage: (message: string) => void // Callback function to set an error message
) => {
    // Send a POST request to fetch all theater schedules
    const response = await axios.post('http://localhost:3200/movie/fetchAllTheaterSchedules');
    if (response.data.schedules) {
        // Set the fetched schedules
        setSchedules(response.data.schedules);
    } else {
        // Set an error message
        setErrorMessage(response.data.message);
    }
}

// Function to fetch genres for filtering
export const getFilterationList = async (
    setGenresList: (list: string[]) => void, // Callback function to set the fetched genres
    setShowTimes: (list: string[]) => void, // Callback function to set the showtimes
    setRatings: (list: string[]) => void // Callback function to set the ratings
) => {
    try {
        // Send a POST request to fetch genres
        const response = await axios.post('http://localhost:3200/movie/getGenres');
        if (response.data.genreList) {
            // Set the fetched genres
            setGenresList(["All", ...response.data.genreList])
        }
        // Set the showtimes
        setShowTimes(["All", "6:00", "10:00", "13:00", "16:00", "19:00", "21:00"]);
        // Set the ratings
        setRatings(["All", "Upto 5", "6 and above"]);
    } catch (error) {
        // Log any errors
        console.error(error);
    }
}

// Define the interface for showtime properties
export interface ShowTime {
    _id: string; // Unique showtime ID
    time: string; // Showtime
}

// Define the interface for showdate properties
export interface ShowDate {
    date: string; // Showdate
    showtimes: ShowTime[]; // Showtimes for the date
}

// Define the interface for theater properties
export interface Theater {
    theaterId?: {
        _id: string; // Unique theater ID
    };
    theater_name: string; // Theater name
    address: string; // Theater address
    city: string; // Theater city
    postcode: number; // Theater postcode
    lat: number; // Theater latitude
    lng: number; // Theater longitude
    showDates: ShowDate[]; // Showdates for the theater
}

// Define the interface for booking properties
export interface BookingProps {
    theater: Theater; // Theater
    showDates: ShowDate[]; // Showdates
}

// Function to fetch theaters and showtimes for booking a ticket
export const fetchTheatresAndShows = async (
    movieId: string, // Movie ID
    setTheaterList: (list: BookingProps[]) => void // Callback function to set the fetched theaters and showtimes
) => {
    // Send a POST request to fetch theaters and showtimes for booking a ticket
    const response = await axios.post('http://localhost:3200/movie/theaterListToBook', { movieId });
    if (response.data.list) {
        // Set the fetched theaters and showtimes
        setTheaterList(response.data.list);
    }
}