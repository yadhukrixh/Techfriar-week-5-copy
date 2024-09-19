// Import necessary components and libraries
import { movieDetails } from "@/components/AdminComponents/ManageMovie/ManageMovie";
import { ISchedule } from "@/components/AdminComponents/ScheduleCard/ScheduleCard";
import { strict } from "assert";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { setCookie } from "nookies";

// Function to handle Google login
export const handleGoogleLogin = () => {
  // Redirect to backend for Google Auth
  window.location.href = 'http://localhost:3200/auth/google';
};

// Function to handle Google callback after authentication
export const handleGoogleCallback = () => {
  // Get token from URL params
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');

  if (token) {
    // Store token in localStorage
    localStorage.setItem('token', token);

    // Set cookie with token
    setCookie(null, 'token', token, {
      maxAge: 30 * 24 * 60 * 60, // Token will expire in 30 days
      path: '/', // Make it accessible throughout the site
    });

    // Redirect to dashboard or any protected page
    window.location.href = '/User/TFA';
  } else {
    console.error('No token received from Google callback');
  }
};

// Function to fetch user details after login
export const fetchUserDetails = async ({
  token,
  setProfileUrl,
  setProfileName,
  setFullname,
  setEmail
}: {
  token: string;
  setProfileUrl?: (url: string) => void;
  setProfileName?: (name: string) => void;
  setFullname?: (name: string) => void;
  setEmail?: (mail: string) => void;
}) => {
  // Decode token to get user ID and email
  const decoded: { userId: string; email: string } = jwtDecode(token);
  const userId = decoded.userId;

  // Send request to fetch user details
  const response = await axios.post('http://localhost:3200/auth/fetchUserDetails', { userId });

  if (response.data) {
    // Update profile name and URL
    if (setProfileName && setProfileUrl) {
      setProfileName(response.data.firstName);
      setProfileUrl(response.data.photo);
    }

    // Update full name and email
    if (setFullname && setEmail) {
      setFullname((response.data.firstName) + (response.data.secondName));
      setEmail(response.data.mail);
    }
  }
}

// Handle token expiration after 1 hour on the client side only
if (typeof window !== 'undefined') {
  setTimeout(() => {
    localStorage.removeItem('token');
    console.log("Auth token and user data have been removed due to expiration.");
  }, 3600000);
}

// Function to handle logout
export const logout = (): void => {
  // Remove token from localStorage
  localStorage.removeItem('token');
  // Redirect to home page
  window.location.href = '/';
};

// Function to handle 2FA send OTP
export const handleRequestOtp = async (
  email: string,
  setIsOtpSent: (status: boolean) => void,
  setErrorMessage: (message: string) => void,
  setSuccessMessage: (message: string) => void
) => {
  try {
    // Send request to send OTP
    const response = await axios.post('http://localhost:3200/auth/sendOtp', { email });

    if (response.data.success) {
      // Set OTP sent status to true
      setIsOtpSent(true);
      // Clear error message
      setErrorMessage('');
      // Set success message
      setSuccessMessage('OTP sent to your email.');
    }
  } catch (error) {
    // Set error message
    setErrorMessage('Error sending OTP. Please try again.');
  }
};

// Function to handle validate OTP
export const handleValidateOtp = async (
  email: string,
  otp: string,
  setSuccessMessage: (message: string) => void,
  setErrorMessage: (message: string) => void,
) => {
  try {
    // Send request to validate OTP
    const response = await axios.post('http://localhost:3200/auth/validateOtp', { email, otp });

    if (response.data.success) {
      // Set success message
      setSuccessMessage('OTP successfully validated.');
      // Clear error message
      setErrorMessage('');
      // Redirect to home page
      window.location.href = '/';
    } else {
      // Set error message
      setErrorMessage('Invalid OTP. Please try again.');
    }
  } catch (error) {
    // Set error message
    setErrorMessage('Error validating OTP. Please try again.');
  }
};

// Function to fetch movies to display
export const fetchMoviesToBook = async (
  setMovies: (list: movieDetails[]) => void
) => {
  try {
    // Create a set to store unique movie IDs
    const movieIds = new Set<string>();

    // Send request to fetch all theater schedules
    const response = await axios.post("http://localhost:3200/movie/fetchAllTheaterSchedules");

    if (response.data.schedules) {
      // Extract schedules and add movie IDs to the set
      const schedules: ISchedule[] = response.data.schedules;
      schedules.forEach((schedule) => {
        schedule.movies.forEach((movie) => {
          movieIds.add(movie.movieId._id);
        })
      })
    }

    // Convert set to array and send request to fetch movies
    const movieIdList = Array.from(movieIds);
    const movieResponse = await axios.post("http://localhost:3200/movie/fetchMoviesToBook", { movieIdList });

    if (movieResponse.data.moviesList) {
      // Update movies list
      setMovies(movieResponse.data.moviesList);
    }
  } catch (error) {
    console.error(error);
  }
};

// Function to fetch movie data
export const movieData = async (
  movieId: string,
  setMovie: (movie: movieDetails) => void
) => {
  try {
    // Send request to fetch movie data
    const response = await axios.post("http://localhost:3200/movie/fetchMovieToDetailedView", { movieId });

    if (response) {
      // Update movie data
      setMovie(response.data.movie)
    }
  } catch (error) {
    console.error(error);
  }
}

// Function to handle show seat mapping
export const fetchShowTimeId = async (
  movieId: string,
  theaterId: string,
  date: string,
  time: string,
  setShowTimeId: (id: string) => void,
  setSeatMapping: (status: boolean) => void
) => {
  try {
    // Send request to fetch show time ID
    const response = await axios.post('http://localhost:3200/movie/fetchShowTimeId', { movieId, theaterId, date, time });

    if (response.data.showTime) {
      // Update show time ID and seat mapping status
      setShowTimeId(response.data.showTime);
      setSeatMapping(true);
    }
  } catch (error) {
    console.error(error);
  }
}

// Interface for seat data
export interface Seat {
  seatNumber: string;
  bookingStatus: boolean;
  bookedUser: string | null;
  _id: string;
}

// Function to fetch seat data
export const fetchSeatData = async (
  showtimeId: string,
  setSeatList: (list: Seat[]) => void,
  setMovienName: (name: string) => void,
  setTheaterName: (name: string) => void,
  setDate: (data: string) => void,
  setTime: (data: string) => void
) => {
  try {
    // Send request to fetch seat data
    const response = await axios.post('http://localhost:3200/movie/fetchSeatAllocation', { showtimeId });

    if (response.data.seats) {
      // Update seat list, movie name, theater name, date, and time
      setSeatList(response.data.seats);
      setMovienName(response.data.movieTitle);
      setTheaterName(response.data.theater);
      setDate(response.data.date);
      setTime(response.data.showTime);
    }
  } catch (error) {
    console.error(error);
  }
}

// Function to handle seat click
export const handleSeatClick = (
  seatNumber: string,
  seatData: Seat[],
  setSelectedSeats: (list: string[]) => void,
  selectedSeats: string[]
) => {
  // Check if the seat is booked
  const seat = seatData.find((seat) => seat.seatNumber === seatNumber);
  if (seat?.bookingStatus) {
    alert("This seat is already booked");
    return;
  }

  // Toggle seat selection
  if (selectedSeats.includes(seatNumber)) {
    setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
  } else {
    setSelectedSeats([...selectedSeats, seatNumber]);
  }
};

// Function to handle ticket booking
export const handleRazorpay = async (
  razorpayLoaded: boolean,
  amount: any,
  profileName: string,
  profileEmail: string,
  userDetails: {
    profileName: string
    email: string,
    number: string
  },
  movieTitle: string,
  theaterName: string,
  showDate: string,
  showTime: string,
  selectedSeats: string[],
) => {
  if (!razorpayLoaded) return alert("Razorpay SDK is not loaded.");

  try {
    // Send request to initiate payment
    const response = await axios.post(
      "http://localhost:3200/auth/razorpayOrder",
      { amount: amount }
    );

    const { data } = response;
    if (!data.success) return alert("Error initiating payment.");

    // Create Razorpay instance
    const rzp = new (window as any).Razorpay({
      key: "rzp_test_37TZNY8cnWgUm8",
      amount: data.amount,
      currency: data.currency,
      name: "Movie Booking",
      description: "Payment for movie booking",
      order_id: data.order_id,
      handler: (response: any) => {
        alert("Payment successful!");
        confirmBooking(response.razorpay_payment_id, userDetails, movieTitle, theaterName, showDate, showTime, selectedSeats, amount);
      },
      prefill: {
        name: { profileName },
        email: { profileEmail },
      },
      theme: { color: "#f12f3f" },
    });

    // Open Razorpay payment modal
    rzp.open();
  } catch (error) {
    console.error("Error initiating payment", error);
    alert("Issue with initiating payment.");
  }
};

// Function to confirm booking
const confirmBooking = async (
  paymentId: string,
  userDetails: {
    profileName: string
    email: string,
    number: string
  },
  movieTitle: string,
  theaterName: string,
  showDate: string,
  showTime: string,
  selectedSeats: string[],
  totalPrice: string
) => {
  try {
    // Send request to confirm booking
    const response = await axios.post(
      "http://localhost:3200/auth/confirmBooking",
      {
        userDetails,
        movieTitle,
        theaterName,
        showDate,
        showTime,
        selectedSeats,
        totalPrice,
        paymentId,
      }
    );

    if (response.data.success) {
      // Get booking details and QR code URL
      const bookingDetails = response.data.booking;
      const qrCodeUrl = response.data.qrCodeUrl;

      // Convert booking details to JSON string and encode it
      const encodedBookingDetails = encodeURIComponent(
        JSON.stringify(bookingDetails)
      );
      const encodedQrCodeUrl = encodeURIComponent(qrCodeUrl);

      // Create query parameters
      const queryParams = new URLSearchParams({
        bookingDetails: encodedBookingDetails,
        qrCodeUrl: encodedQrCodeUrl,
      }).toString();

      // Redirect to booking QR page
      window.location.href = '/User/Dashboard';
    } else {
      alert("Error confirming booking.");
    }
  } catch (error) {
    console.error("Error confirming booking", error);
    alert("Issue confirming booking.");
  }
};

// Interface for booked tickets
export interface bookedTickets {
  user: {
    firstname: string;
    email: string;
    phone: string;
  };
  movie: string;
  theatre: string;
  date: string;
  time: string;
  seats: string[];
  totalPrice: number;
  paymentId: string;
  bookingDate: string;
  qrcodeUrl: string;
}

// Function to fetch booked tickets
export const fetchTickets = async (
  setTicketData: (ticket: bookedTickets[]) => void,
  setErrorMessage: (message: string) => void
) => {
  // Get token from local storage
  const token: any = localStorage.getItem('token');

  // Decode token to get user ID and email
  const decoded: { userId: string; email: string } = jwtDecode(token);
  const email = decoded.email

  try {
    // Send request to fetch tickets
    const response = await axios.post('http://localhost:3200/auth/fetchTickets', { email });

    if (response) {
      // Update ticket data
      setTicketData(response.data.tickets)
    }
  } catch (error) {
    // Set error message
    setErrorMessage("Book any tickets to See Tickets");
  }
}

// Function to handle back button click
export const handleBackButton = () => {
  // Redirect to home page
  window.location.href = '/';
}