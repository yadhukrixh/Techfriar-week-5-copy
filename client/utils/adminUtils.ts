// Import necessary components and libraries
import { newMovie } from "@/components/AdminComponents/ManageMovie/ManageMovie";
import { TheaterProps } from "@/components/AdminComponents/ManageTheaters/ManageTheaters";
import axios from "axios";
import { FetchedMovieProps, FetchedTheatersProps } from "./fetchData";

// Function to create a delay in milliseconds
const delay = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

// Handle admin login functionality
export const handleAdminLogin = async (
    email: string,
    password: string,
    setErrorMessage: (message: string) => void
) => {
    try {
        // Check if email and password are provided
        if (!email || !password) {
            setErrorMessage("Enter a valid credentials");
        }
        // Send a POST request to the server to authenticate the admin
        const response = await axios.post("http://localhost:3200/auth/handleAdminLogin", { email, password });
        // If authenticated, redirect to the admin dashboard
        if (response.data.authenticated) {
            window.location.href = '/Admin/AdminDashboard'
        } else {
            // If not authenticated, display an error message
            setErrorMessage(response.data.message);
        }
    } catch (error) {
        console.error(error);
    }
}

// Handle movie search functionality
export const handleSearchMovie = async (
    movieTitle: string,
    movieYear: string,
    setnewMovie: (value: newMovie) => void,
    setResponseStatus: (status: boolean) => void,
    setMovieFoundStatus: (status: boolean) => void
) => {
    // Check if movie title is provided
    if (!movieTitle) {
        setResponseStatus(true);
        setMovieFoundStatus(false)
    } else {
        try {
            // Send a POST request to the server to fetch movie details
            const response = await axios.post('http://localhost:3200/movie/fetchMovieDetailsToRegister', { movieTitle, movieYear });
            // If response is received, update the response status and movie found status
            if (response) {
                setResponseStatus(true);
                // If movie is found, update the movie data and found status
                if (response.data.response === "True") {
                    setMovieFoundStatus(true)
                    setnewMovie(response.data)
                } else {
                    setMovieFoundStatus(false)
                }
            }
        } catch (error) {
            console.error(error);
        }
    }
};

// Handle add movie functionality
export const handleAddMovie = async (
    newMovie: newMovie,
    rating: number,
    setShowAddMovie: (status: boolean) => void,
    setMessagePopup: (status: boolean) => void,
    setMessage: (message: string) => void
) => {
    try {
        // Check if rating is provided
        if (!rating) {
            setMessagePopup(true);
            return setMessage("You have to choose a rating");
        }
        // Send a POST request to the server to add the movie
        const response = await axios.post('http://localhost:3200/movie/registerMovie', { newMovie, rating });
        // If movie is added, update the add movie status and display a message
        if (response.data.savedStatus) {
            setShowAddMovie(false);
        }
        setMessagePopup(true);
        setMessage(response.data.message);
        console.log(response.data.message);
        // Wait for 2 seconds and then reload the page
        await delay(2000);
        window.location.reload();
    } catch (error) {
        console.error(error);
    }
};

// Handle delete movie functionality
export const handleDeleteMovie = async (
    movieData: FetchedMovieProps,
    setMessage: (messsage: string) => void,
    setShowPopup: (status: boolean) => void
) => {
    // Get the movie ID from the movie data
    const movieId = movieData._id;
    try {
        // Send a DELETE request to the server to delete the movie
        const response = await axios.delete(`http://localhost:3200/movie/deleteMovie/${movieId}`);
        // Display a message and wait for 2 seconds before reloading the page
        setShowPopup(true);
        setMessage(response.data.message);
        await delay(2000);
        window.location.reload();
    } catch (error) {

    }
}

// Handle search theaters functionality
export const handleSearchTheatres = async (
    lat: string,
    long: string,
    setTheaterList: (list: TheaterProps[]) => void,
    setTheatersFound: (status: boolean) => void,
    setMessage: (message: string) => void
) => {
    // Create a location string from the latitude and longitude
    const location = `${lat};${long}`;
    // Send a POST request to the server to search for theaters
    try {
        const response = await axios.post('http://localhost:3200/movie/searchTheaters', { location });
        // Update the theaters found status and display a message if no theaters are found
        setTheatersFound(true);
        console.log(response);
        if (!response.data.theatersFound) {
            setTheatersFound(false);
            return  setMessage("Error occured on Fetching Theaters");

        }
        // Update the theater list
        setTheaterList(response.data);
    }catch(error){
        setMessage("Error occured on Fetching Theaters");
        console.error(error);
    }
    
}

// Handle add theaters functionality
export const handleAddTheaters = async (
    newTheater: TheaterProps,
    setMessage: (message: string) => void,
    setTheaterAdded: (status: boolean) => void
) => {
    // Send a POST request to the server to add the theater
    const response = await axios.post('http://localhost:3200/movie/addTheater', { newTheater });
    // Update the theater added status and display a message
    setTheaterAdded(true);
    setMessage(response.data.message);
    // Wait for 2 seconds and then reload the page
    await delay(2000);
    window.location.reload();
}

// Handle delete theater functionality
export const handleDeleteTheater = async (
    theater: FetchedTheatersProps,
    setShowPopup: (status: boolean) => void,
    setMessage: (message: string) => void
) => {
    // Get the theater ID from the theater data
    const theaterId = theater._id
    // Send a DELETE request to the server to delete the theater
    const response = await axios.delete(`http://localhost:3200/movie/deleteTheater/${theaterId}`);
    // Display a message and wait for 2 seconds before reloading the page
    setShowPopup(true);
    setMessage(response.data.message);
    await delay(2000);
    window.location.reload();
}

// Handle add show functionality
export const handleAddShow = async (
    movie: string,
    theater: string,
    showTime: string,
    date: string,
    setErrorMessage: (message: string) => void,
    setPopupMessage: (message: string) => void,
    setSheduleAdded: (status: boolean) => void
) => {
    try {
        // Send a POST request to the server to add the show
        const response = await axios.post('http://localhost:3200/movie/addShows', { movie, theater, showTime, date });
        // Update the error message and popup message
        if (response) {
            setErrorMessage(response.data.error);
            setPopupMessage(response.data.message);
            // Update the schedule added status
            response.data.isAdded ? setSheduleAdded(response.data.isAdded) : setSheduleAdded(false);
        }
    } catch (error) {
        console.error(error);
    }
}