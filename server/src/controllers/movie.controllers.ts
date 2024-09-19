import { Request, Response } from 'express';
import axios from 'axios';
import Movies from '../models/Movies';
import Theaters from '../models/Theaters';
import { ShowSchedules } from '../models/ShowSchedules';
import mongoose from 'mongoose';


// interfe for the movieprops
interface MovieSearchProps {
    Title: string;
    Year: string;
    Genre: string;
    Language: string;
    Released: string;
    Runtime: string;
    Actors: string;
    Plot: string;
    Response: string;
    Poster: string;
    imdbID: string;
}



// Function to fetch movie o register
export const fetchMovieDetailsToRegister = async (req: Request, res: Response) => {
    const { movieTitle, movieYear } = req.body;
    const fetchMovieDetails = {
        method: 'GET',
        url: `https://omdbapi.com/?t=/${movieTitle}&y=${movieYear}&apikey=bc53329f`
    };

    try {
        const response = await axios.request<MovieSearchProps>(fetchMovieDetails);

        const movieData = {
            title: response.data.Title,
            year: response.data.Year,
            genre: response.data.Genre,
            language: response.data.Language,
            released: response.data.Released,
            runTime: response.data.Runtime,
            cast: response.data.Actors,
            plot: response.data.Plot,
            response: response.data.Response,
            posterUrl: response.data.Poster,
            imdbID: response.data.imdbID
        }
        res.status(200).json(movieData);

        // Send the response back to the frontend

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching movie details" });
    }
};



//register movie
export const registerMovie = async (req: Request, res: Response) => {
    const { newMovie, rating } = req.body;
    let movies;

    try {
        movies = await Movies.findOne({ title: newMovie.title });
        if (movies) {
            return res.json({ message: "Movie is already Added" })
        }
        if (!newMovie) {
            return res.status(404);
        }

        const genre = newMovie.genre.split(", ");
        const actors = newMovie.cast.split(",");
        const released = new Date(newMovie.released);


        movies = new Movies({
            title: newMovie.title,
            year: newMovie.year,
            language: newMovie.language,
            releaseDate: released,
            runtime: newMovie.runTime,
            genre: genre,
            actors: actors,
            plot: newMovie.plot,
            rating: rating,
            posterUrl: newMovie.posterUrl,
            imdbID: newMovie.imdbID,
        })

        await movies.save();

        res.json({ message: "Movie saved successfully", savedStatus: true });

    } catch (error) {
        console.error("movie couldnt added",error);
    }
}




// fetch movie from database
export const fetchMovies = async (req: Request, res: Response) => {
    let movies = await Movies.find();
    res.json({ message: 'Movies Found', movieList: movies });
}


// interface for the theaters
interface TheaterProps {
    cinema_name: string,
    address: string,
    city: string,
    postcode: number,
    lat: number,
    lng: number
}

interface TheaterListProps {
    cinemas: [
        TheaterProps
    ]
}



//delete theaters
export const deleteMovie = async (req: Request, res: Response) => {
    try {
        const movieId = req.params.id;
        const deletedMovie = await Movies.findByIdAndDelete(movieId);
        if (!deletedMovie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        res.status(200).json({ message: 'Movie deleted successfully' });
    } catch (error) {

    }
}



// search nearby theaters
export const searchTheaters = async (req: Request, res: Response) => {
    const { location } = req.body;
    const options = {
        "url": "https://api-gate2.movieglu.com/cinemasNearby/?n=20",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "api-version": "v200",
            "Authorization": "Basic Q0xPVV8wOjh5Z0drN0w1Z3VEWg==",
            "client": "CLOU_0",
            "x-api-key": "7LuxmRRG9X2RVr64UlMtU3qsY1NpdQmO3KA0lnRy",
            "device-datetime": "2024-09-05T05:02:16.186Z",
            "territory": "IN",
            "geolocation": `${location}`
        },
    };

    try {
        const response = await axios.request<TheaterListProps>(options);
        if (response.data.cinemas) {
            res.json(response.data.cinemas);
        }
    } catch (error) {
        res.json({ message: "No theaters found in this location", theatersFound: false });
        console.error(error);
    }
}



//add theaters
export const addTheater = async (req: Request, res: Response) => {
    const { newTheater } = req.body;
    let theater = await Theaters.findOne({ theater_name: newTheater.cinema_name });
    if (theater) {
        return res.json({ message: "Theater already exist.Try new one.", theaterAdded: false });
    }
    else {
        try {
            theater = new Theaters({
                theater_name: newTheater.cinema_name,
                address: newTheater.address,
                city: newTheater.city,
                postcode: newTheater.postcode,
                lat: newTheater.lat,
                lng: newTheater.lng,
                seats: 120
            })
            await theater.save();
            res.json({ message: "Theater saved successfully", theaterAdded: true });
        } catch (error) {
            console.error(error);

        }
    }
}



// fetch theaters
export const fetchTheaters = async (req: Request, res: Response) => {
    let theaters = await Theaters.find();
    res.json(theaters);
}



//delete theaters
export const deleteTheater = async (req: Request, res: Response) => {
    try {
        const theaterId = req.params.id;
        const deletedMovie = await Theaters.findByIdAndDelete(theaterId);
        if (!deletedMovie) {
            return res.status(404).json({ message: 'Theater not found' });
        }

        res.status(200).json({ message: 'Theater deleted successfully' });
    } catch (error) {

    }
}



//fetch data for the show assign
export const fetchMoviesForSetShow = async (req: Request, res: Response) => {
    try {
        const movies = await Movies.find({}, { title: 1, _id: 1 });
        if (!movies) {
            return res.json({ message: "No movies or Theaters Added." });
        }
        res.json(movies);
    } catch (error) {
        console.error(error);
    }
}

export const fetchTheatersForSetShow = async (req: Request, res: Response) => {
    try {
        const theaters = await Theaters.find({}, { _id: 1, theater_name: 1 });
        if (!theaters) {
            return res.json({ message: "No movies or Theaters Added." });
        }
        res.json(theaters);
    } catch (error) {
        console.error(error);
    }
}




// Add shows to database
export const addShows = async (req: Request, res: Response) => {
    const { movie, theater, showTime, date } = req.body;
    const parsedDate = new Date(date);
    const newShowtime = {
        time: showTime,
        seats: Array.from({ length: 120 }, (_, i) => ({
            seatNumber: (i + 1).toString(),
            bookingStatus: false,
            bookedUser: null,
        })),
    };

    try {
        if (!movie || !theater || !showTime || !date) {
            return res.json({ error: 'Movie, theater, showtime, and date are required.' });
        }

        // Check if the theater already has schedules
        const existingTheaterSchedule = await ShowSchedules.findOne({ theaterId: theater });

        if (existingTheaterSchedule) {
            // Theater exists, check if the movie is already scheduled for the same date and time
            const conflictingSchedule = existingTheaterSchedule.movies.some((m) => {
                return m.showDates.some((sd) => {
                    return (
                        sd.date.getTime() === parsedDate.getTime() &&
                        sd.showtimes.some((st) => st.time === showTime)
                    );
                });
            });

            if (conflictingSchedule) {
                return res.json({ error: 'There is already a movie scheduled at this time and date.' });
            }

            // If the movie exists within this theater
            const existingMovie = existingTheaterSchedule.movies.find(
                (m) => m.movieId.toString() === movie
            );

            if (existingMovie) {
                // If the date exists within the movie's showDates
                const existingShowDate = existingMovie.showDates.find(
                    (sd) => sd.date.getTime() === parsedDate.getTime()
                );

                if (existingShowDate) {
                    // If the time already exists within the date
                    const existingShowTime = existingShowDate.showtimes.find(
                        (st) => st.time === showTime
                    );

                    if (existingShowTime) {
                        return res.json({ error: 'Showtime already exists for this date and movie.' });
                    } else {
                        // Add new showtime to the existing date
                        existingShowDate.showtimes.push(newShowtime);
                    }
                } else {
                    // Add new date and showtime to the movie
                    existingMovie.showDates.push({
                        date: parsedDate,
                        showtimes: [newShowtime],
                    });
                }
            } else {
                // Add new movie with date and showtime to the theater
                existingTheaterSchedule.movies.push({
                    movieId: movie,
                    showDates: [
                        {
                            date: parsedDate,
                            showtimes: [newShowtime],
                        },
                    ],
                });
            }

            // Save the updated theater schedule
            await existingTheaterSchedule.save();
            return res.status(201).json({ message: 'New schedule added successfully.', isAdded: true });
        } else {
            // If theater does not exist, create everything from scratch
            const newTheaterSchedule = new ShowSchedules({
                theaterId: theater,
                movies: [
                    {
                        movieId: movie,
                        showDates: [
                            {
                                date: parsedDate,
                                showtimes: [newShowtime],
                            },
                        ],
                    },
                ],
            });

            await newTheaterSchedule.save();
            return res.status(201).json({ message: 'New schedule created successfully.', isAdded: true });
        }
    } catch (error) {
        console.error('Error adding showtime:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};




// fetch data for show shedules
// Fetch all theater schedules
export const fetchAllTheaterSchedules = async (req: Request, res: Response) => {
    try {
        const schedules = await ShowSchedules.find()
            .populate({
                path: 'theaterId', // Populate theater data
                select: '_id theater_name address', // Only select the 'theater_name' field from Theater
            })
            .populate({
                path: 'movies.movieId', // Populate movie data
                select: ' _id title imdbID', // Only select the 'title' field from Movies
            });

        if (!schedules || schedules.length === 0) {
            return res.status(404).json({ error: 'No theater schedules found' });
        }


        return res.status(200).json({ schedules: schedules });
    } catch (error) {
        console.error('Error fetching theater schedules:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


// Get geners list

export const getGenres = async (req: Request, res: Response) => {

    try {
        const genres = await Movies.aggregate([
            { $unwind: "$genre" },  // Unwind the genre array
            { $group: { _id: "$genre" } }, // Group by genre to eliminate duplicates
            { $sort: { _id: 1 } } // Sort genres alphabetically (optional)
        ]);

        // Map to return just the genre list
        const genreList = genres.map(genre => genre._id);
        res.json({ genreList: genreList })
    } catch (error) {
        console.error(error);
    }

}



// fetch movies to show in booking page
export const fetchMoviesToBook = async (req: Request, res: Response) => {
    const { movieIdList } = req.body;

    try {
        // Fetch movie details
        const movies = await Movies.find({
            _id: { $in: movieIdList }, // Use $in operator to match the list of IDs
        });

        if (!movies || movies.length === 0) {
            return res.status(404).json({ message: 'No movies found' });
        }

        // Fetch showtimes from the ShowSchedules collection based on the movieIdList
        const schedules = await ShowSchedules.find({
            'movies.movieId': { $in: movieIdList }, // Match schedules where movies contain the movie IDs
        }).populate({
            path: 'movies.movieId',
            select: 'title', // Select specific fields from the Movies collection, e.g., title
        });

        // Create a response structure that includes both movie details and unique showtimes
        const response = movies.map((movie) => {
            // Find the schedule entry for this movie
            const schedule = schedules.find((schedule) =>
                schedule.movies.some((m) => m.movieId._id.equals(movie._id))
            );

            // Extract the relevant showtimes for this movie, if available
            const movieSchedule = schedule
                ? schedule.movies.find((m) => m.movieId._id.equals(movie._id))
                : null;

            // Gather all showtimes from all show dates
            let showtimes: string[] = [];
            if (movieSchedule) {
                movieSchedule.showDates.forEach((showDate) => {
                    showDate.showtimes.forEach((showtime) => {
                        // Add showtime only if it is not already in the array
                        if (!showtimes.includes(showtime.time)) {
                            showtimes.push(showtime.time);
                        }
                    });
                });
            }

            // Add unique showtimes array inside the movie object
            return {
                ...movie.toObject(), // Convert Mongoose document to a plain JS object
                showtimes: showtimes, // Unique showtimes as an array of strings
            };
        });

        // Send the combined movie and showtime data as response
        res.json({ moviesList: response });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching movie data' });
    }
};



// fetch each movie data and also the background image
export const fetchMovieToDetailedView = async (req: Request, res: Response) => {
    const { movieId } = req.body;

    try {
        // Find movie by ObjectId
        const movie = await Movies.findOne({ _id: new mongoose.Types.ObjectId(movieId) });
        res.json({ movie: movie })


    } catch (error) {
        console.error(error);
    }
};



//   set data for theater base booking
export const theaterListToBook = async (req: Request, res: Response) => {
    const { movieId } = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(movieId)) {
            return res.status(400).json({ error: 'Invalid movie ID' });
        }

        // Fetch schedules and populate theater details
        const schedules = await ShowSchedules.find({ 'movies.movieId': movieId })
            .populate({
                path: 'theaterId',
                select: 'theater_name address city postcode lat lng',
            })
            .exec();

        if (!schedules || schedules.length === 0) {
            return res.status(404).json({ message: 'No schedules found for this movie' });
        }

        // Format response
        const formattedResponse = schedules.map(schedule => {
            const theater = schedule.theaterId;

            // Check if theater is populated
            if (typeof theater !== 'object' || !('theater_name' in theater)) {
                return null; // Or handle error appropriately
            }

            return {
                theater: {
                    theaterId: theater,
                    theater_name: theater.theater_name,
                    address: theater.address,
                    city: theater.city,
                    postcode: theater.postcode,
                    lat: theater.lat,
                    lng: theater.lng
                },
                showDates: schedule.movies
                    .find(movie => movie.movieId.toString() === movieId.toString())
                    ?.showDates.map(showDate => ({
                        date: showDate.date,
                        showtimes: showDate.showtimes.map(showtime => ({
                            time: showtime.time
                        }))
                    }))
            };
        }).filter(Boolean); // Remove any null entries

        res.status(200).json({ list: formattedResponse });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}



//   fetch seat mapping
export const fetchShowTimeId = async (req: Request, res: Response) => {
    const { movieId, theaterId, date, time } = req.body;

    try {
        // Validate and parse the date from the request
        const showDate = new Date(date);
        if (isNaN(showDate.getTime())) {
            return res.status(400).json({ message: 'Invalid date format' });
        }

        // Query the ShowSchedules to find the relevant theater, movie, and showtime
        const schedule = await ShowSchedules.findOne({
            theaterId: theaterId,
            'movies.movieId': movieId,
            'movies.showDates.date': showDate,
            'movies.showDates.showtimes.time': time,
        });

        // If no schedule is found, return an error
        if (!schedule) {
            return res.status(404).json({ message: 'Showtime not found' });
        }

        // Find the specific movie
        const movie = schedule.movies.find((movie) =>
            movie.movieId.toString() === new mongoose.Types.ObjectId(movieId).toString()
        );
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        const requestedDate = new Date(date);
        const showDateData = movie.showDates.find((showDate) => {
            const showDateObj = new Date(showDate.date); // Ensure showDate.date is a Date object
            return showDateObj.getTime() === requestedDate.getTime();
        });

        if (!showDateData) {
            return res.status(404).json({ message: 'Show date not found' });
        }

        const showtime = showDateData.showtimes.find((showtime) => showtime.time === time);
        if (!showtime) {
            return res.status(404).json({ message: 'Showtime not found' });
        }


        // Send the seats array back to the frontend
        return res.status(200).json({ showTime: showtime._id });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};




// fetch seat allocation
export const fetchSeatAllocation = async (req: Request, res: Response) => {
    const { showtimeId } = req.body;

    try {
        // Find the schedule with the matching showtime ID and populate movie and theater details
        const schedule = await ShowSchedules.findOne(
            { 'movies.showDates.showtimes._id': new mongoose.Types.ObjectId(showtimeId) },
            { 'movies.showDates.showtimes.$': 1, 'movies.showDates.date': 1 } // Include date in the projection
        )
        .populate('movies.movieId', 'title') // Populate movie title
        .populate('theaterId', 'theater_name'); // Populate theater name

        if (!schedule || !schedule.movies.length) {
            return res.status(404).json({ message: 'Showtime not found' });
        }

        const movie = schedule.movies[0];

        // Find the specific showDate that has the requested showtime
        const showDateObj = movie.showDates.find(showDate =>
            showDate.showtimes.some(st => st._id?.toString() === showtimeId)
        );

        if (!showDateObj) {
            return res.status(404).json({ message: 'Showtime not found' });
        }

        const showtime = showDateObj.showtimes.find(st => st._id?.toString() === showtimeId);
        if (!showtime) {
            return res.status(404).json({ message: 'Showtime not found' });
        }

        const movieData = movie.movieId;
        let movieName: string | null = null;

        if (typeof movieData !== 'string' && 'title' in movieData) {
            movieName = movieData.title; // Get the populated movie title
        }

        const theaterName = (schedule.theaterId as any).theater_name; // Get the populated theater name
        const showDate = showDateObj.date; // Extract the show date

        // Return the movie name, theater name, show date, show time, and seats array
        return res.status(200).json({
            movieTitle: movieName,
            theater: theaterName,
            date: showDate, // Ensure show date is returned
            showTime: showtime.time,
            seats: showtime.seats
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};










