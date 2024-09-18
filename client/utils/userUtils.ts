import { movieDetails } from "@/components/AdminComponents/ManageMovie/ManageMovie";
import { ISchedule } from "@/components/AdminComponents/ScheduleCard/ScheduleCard";
import { strict } from "assert";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { setCookie } from "nookies";




// to login google
export const handleGoogleLogin = () => {
    // Redirect to backend for Google Auth
    window.location.href = 'http://localhost:3200/auth/google';
};

// After Google authentication, handle the token in the redirected URL
export const handleGoogleCallback = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token'); // Get token from URL params

    if (token) {
        // Store token in localStorage
        localStorage.setItem('token', token);

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


// fetch userdata after login
export const fetchUserDetails = async (
    {
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
    }
) => {
    const decoded: { userId: string; email: string } = jwtDecode(token);
    const userId = decoded.userId;
    const response = await axios.post('http://localhost:3200/auth/fetchUserDetails', { userId });
    if (response.data) {
        if (setProfileName && setProfileUrl) {
            setProfileName(response.data.firstName);
            setProfileUrl(response.data.photo);
        }

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

export const logout = (): void => {
    localStorage.removeItem('token');
    window.location.href = '/';
};

//  to handle 2 fa send otp
export const handleRequestOtp = async (
    email: string,
    setIsOtpSent: (status: boolean) => void,
    setErrorMessage: (message: string) => void,
    setSuccessMessage: (message: string) => void
) => {
    try {
        const response = await axios.post('http://localhost:3200/auth/sendOtp', { email });
        if (response.data.success) {
            setIsOtpSent(true);
            setErrorMessage('');
            setSuccessMessage('OTP sent to your email.');
        }
    } catch (error) {
        setErrorMessage('Error sending OTP. Please try again.');
    }
};

// handle valudate otp
export const handleValidateOtp = async (
    email: string,
    otp: string,
    setSuccessMessage: (message: string) => void,
    setErrorMessage: (message: string) => void,
) => {
    try {
        const response = await axios.post('http://localhost:3200/auth/validateOtp', { email, otp });
        if (response.data.success) {
            setSuccessMessage('OTP successfully validated.');
            setErrorMessage('');
            window.location.href = '/';

        } else {
            setErrorMessage('Invalid OTP. Please try again.');
        }
    } catch (error) {
        setErrorMessage('Error validating OTP. Please try again.');
    }
};






// to fetch movies to dispaly
export const fetchMoviesToBook = async (
    setMovies: (list: movieDetails[]) => void
) => {
    try {
        const movieIds = new Set<string>();
        const response = await axios.post("http://localhost:3200/movie/fetchAllTheaterSchedules");
        if (response.data.schedules) {
            const schedules: ISchedule[] = response.data.schedules;
            schedules.forEach((schedule) => {
                schedule.movies.forEach((movie) => {
                    movieIds.add(movie.movieId._id);
                })
            })
        }
        if (movieIds) {
            const movieIdList = Array.from(movieIds);
            const movieResponse = await axios.post("http://localhost:3200/movie/fetchMoviesToBook", { movieIdList });
            if (movieResponse.data.moviesList) {
                setMovies(movieResponse.data.moviesList);
            }
        }

    } catch (error) {
        console.error(error);
    }
};


// to fetch movie data
export const movieData = async (
    movieId: string,
    setMovie: (movie: movieDetails) => void
) => {
    try {
        const response = await axios.post("http://localhost:3200/movie/fetchMovieToDetailedView", { movieId });
        if (response) {
            setMovie(response.data.movie)
        }

    } catch (error) {
        console.error(error);
    }
}

// handle show seat mapping

export const fetchShowTimeId = async (
    movieId: string,
    theaterId: string,
    date: string,
    time: string,
    setShowTimeId: (id: string) => void,
    setSeatMapping: (status: boolean) => void
) => {
    try {
        const response = await axios.post('http://localhost:3200/movie/fetchShowTimeId', { movieId, theaterId, date, time });
        if (response.data.showTime) {
            setShowTimeId(response.data.showTime);
            setSeatMapping(true);
        }
    } catch (error) {
        console.error(error);
    }
}

// fetch seats data as list
export interface Seat {
    seatNumber: string;
    bookingStatus: boolean;
    bookedUser: string | null;
    _id: string;
}

export const fetchSeatData = async (
    showtimeId: string,
    setSeatList: (list: Seat[]) => void,
    setMovienName: (name: string) => void,
    setTheaterName: (name: string) => void,
    setDate: (data: string) => void,
    setTime: (data: string) => void
) => {
    try {
        const response = await axios.post('http://localhost:3200/movie/fetchSeatAllocation', { showtimeId });
        if (response.data.seats) {
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


// set payment data

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

// handle ticket booking
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
        const response = await axios.post(
            "http://localhost:3200/auth/razorpayOrder",
            { amount: amount }
        );
        const { data } = response;
        if (!data.success) return alert("Error initiating payment.");

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
        rzp.open();
    } catch (error) {
        console.error("Error initiating payment", error);
        alert("Issue with initiating payment.");
    }
};

//   handle confirm booking
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
        console.log("confirm booking func")
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
            const bookingDetails = response.data.booking;
            const qrCodeUrl = response.data.qrCodeUrl;

            // Convert bookingDetails to a JSON string and encode it
            const encodedBookingDetails = encodeURIComponent(
                JSON.stringify(bookingDetails)
            );
            const encodedQrCodeUrl = encodeURIComponent(qrCodeUrl);

            const queryParams = new URLSearchParams({
                bookingDetails: encodedBookingDetails,
                qrCodeUrl: encodedQrCodeUrl,
            }).toString();

            // Redirect to the booking QR page
            window.location.href = '/User/Dashboard';
        } else {
            alert("Error confirming booking.");
        }
    } catch (error) {
        console.error("Error confirming booking", error);
        alert("Issue confirming booking.");
    }
};

// fetch booked Tickets
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

export const fetchTickets = async (
    setTicketData:(ticket:bookedTickets[])=>void,
    setErrorMessage:(message:string)=>void
) =>{
    const token:any = localStorage.getItem('token');
    const decoded: { userId: string; email: string } = jwtDecode(token);
    const email = decoded.email
    try{
        const response = await axios.post('http://localhost:3200/auth/fetchTickets',{email});
        if(response){
            setTicketData(response.data.tickets)
        }
    }catch(error){
        setErrorMessage("Book any tickets to See Tickets");
    }
}

export const handleBackButton = ()=>{
    window.location.href = '/';
}
