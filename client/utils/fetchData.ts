
import { MoviesForSetShow, TheatersForSetShow } from "@/components/AdminComponents/ManageShows/ManageShows";
import { ISchedule } from "@/components/AdminComponents/ScheduleCard/ScheduleCard";
import axios from "axios";

export interface FetchedMovieProps {
    _id: string;
    title: string;
    year: string;
    language: string;
    releaseDate: Date;
    runtime: string;
    genre: string[];
    actors: string[];
    plot: string;
    posterUrl: string;
    showtimes?:string[];
}


// function to fetch movies to shhow in admin panel
export const fetchMovies = async (
    setMovies: (list: FetchedMovieProps[]) => void
) => {
    try {
        const response = await axios.post("http://localhost:3200/movie/fetchMovies");
        if (response.data) {
            setMovies(response.data.movieList);
        }
    } catch (error) {
        console.error(error);
    }
}


export interface FetchedTheatersProps {
    address: string;
    city: string;
    lat: number;
    lng: number;
    postcode: number;
    seats: number;
    theater_name: string;
    _id: string;
}

// fetch theaters
export const fetchTheaters = async (
    setTheaters: (list: FetchedTheatersProps[]) => void
) => {

    try {
        const response = await axios.post('http://localhost:3200/movie/fetchTheaters');
        if (response.data) {
            setTheaters(response.data);
        }

    } catch (error) {
        console.error(error);
    }
}

// Fetch movies and theater for show
export const fetchDataForSetShow = async (
    setMovies: (list: MoviesForSetShow[]) => void,
    setTheaters: (list: TheatersForSetShow[]) => void
) => {
    try {
        const movie = await axios.post('http://localhost:3200/movie/fetchMoviesForSetShow');
        const theater = await axios.post('http://localhost:3200/movie/fetchTheatersForsetShow');
        if (movie.data || theater.data) {
            setMovies(movie.data);
            setTheaters(theater.data)
        }
    } catch (error) {
        console.error(error);
    }
}



// Fetch Schedules
export const fetchSchedules = async (
    setSchedules: (list: ISchedule[]) => void,
    setErrorMessage: (message: string) => void
) => {
    const response = await axios.post('http://localhost:3200/movie/fetchAllTheaterSchedules');
    if (response.data.schedules) {
        setSchedules(response.data.schedules);
    }
    else {
        setErrorMessage(response.data.message);
    }
}


// Fetch Genres to Filteration
export const getFilterationList = async (
    setGenresList: (list: string[]) => void,
    setShowTimes: (list: string[]) => void,
    setRatings: (list: string[]) => void
) => {

    try {
        const response = await axios.post('http://localhost:3200/movie/getGenres');
        if (response.data.genreList) {
            setGenresList(["All", ...response.data.genreList])
        }
        setShowTimes(["All","6:00", "10:00", "13:00", "16:00", "19:00", "21:00"]);
        setRatings(["All","Upto 5", "6 and above"]);
    } catch (error) {
        console.error(error);
    }
}


// Fetch Theaters and show times to book ticket
export interface ShowTime {
    _id:string;
    time: string;
}

export interface ShowDate {
    date: string;
    showtimes: ShowTime[];
}

export interface Theater {
    theaterId?:{
        _id:string;
    };
    theater_name: string;
    address: string;
    city: string;
    postcode: number;
    lat: number;
    lng: number;
    showDates: ShowDate[];
}

export interface BookingProps {
        theater: Theater;
        showDates: ShowDate[];
}


export const fetchTheatresAndShows = async(
    movieId:string,
    setTheaterList:(list:BookingProps[])=>void
)=>{
    const response = await axios.post('http://localhost:3200/movie/theaterListToBook',{movieId});
    if(response.data.list){
        setTheaterList(response.data.list);
    }
}