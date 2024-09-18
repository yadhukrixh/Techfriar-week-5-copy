import mongoose, { Schema, Document } from 'mongoose';

// Define Seat Schema
const seatSchema = new Schema({
  seatNumber: {
    type: String,
    required: true,
  },
  bookingStatus: {
    type: Boolean,
    default: false,
  },
  bookedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
});

// Define Showtime Schema
const showtimeSchema = new Schema({
  time: {
    type: String,
    required: true,
  },
  seats: [seatSchema], // Array of seats for each showtime
});

// Define ShowDate Schema
const showDateSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  showtimes: [showtimeSchema], // Array of showtimes for each show date
});

// Define Movie Schema within Theater
const movieSchema = new Schema({
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movies',
    required: true,
  },
  showDates: [showDateSchema], // Array of show dates with showtimes
});

// Define Theater Schedule Schema
const theaterScheduleSchema = new Schema(
  {
    theaterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Theater', // Reference to the theater
      required: true,
    },
    movies: [movieSchema], // Array of movies being shown at this theater
  },
  { timestamps: true }
);

// Define Interfaces
interface ISeat {
  _id?: mongoose.Types.ObjectId;
  seatNumber: string;
  bookingStatus: boolean;
  bookedUser: any | null;
}

interface IShowtime {
  _id?: mongoose.Types.ObjectId | null;
  time: string;
  seats: ISeat[];
}

interface IShowDate {
  date: Date;
  showtimes: IShowtime[];
}

interface IMovie {
  movieId: any | { title: string }; // Either ObjectId or populated object
  showDates: IShowDate[];
}

// Define Theater interface to represent the populated data
interface ITheater {
  theater_name: string;
  address: string;
  city: string;
  postcode: number;
  lat: number;
  lng: number;
}

interface ISchedule extends Document {
  theaterId: mongoose.Types.ObjectId | ITheater; // Either ObjectId or populated object
  movies: IMovie[];
}

// Create and export the Mongoose Model for Schedule
const ShowSchedules = mongoose.model<ISchedule>('TheaterSchedule', theaterScheduleSchema);

export { ShowSchedules };
