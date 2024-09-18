import { Request, Response } from "express";
import User from "../models/User";
import nodemailer from 'nodemailer';
import { SessionData } from "../types/express-session";
import createRazorpayOrder from "../utils/razorpay";
import { ShowSchedules } from "../models/ShowSchedules";
import Booking from "../models/Bookings";
import mongoose from "mongoose";
import Movies from "../models/Movies";
import Theaters from "../models/Theaters";
import { mailService } from "../services/mail ";
import { generateQR } from "../services/qrCode";
import { whatsappService } from "../services/whatsapp";


let globalSessionID: string;

const sessionStore: { [key: string]: SessionData } = {};


// fetch user Details
export const fetchUserDetails = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body;

        const user = await User.findById(userId)
        if (!user) {
            return res.json({ message: "User not found" })
        }
        const name = user.firstname;
        const email = user.email;
        const lastName = user.lastname;
        const profileUrl = user.photo;
        res.json({ firstName: name, secondName: lastName, mail: email, photo: profileUrl })
    } catch (error) {

    }

}

// send otp to email
export const sendOtp = async (req: Request, res: Response) => {
    const { email } = req.body;
    const otp = `${Math.floor(1000 + (Math.random() * 9000))}`;
    if (!email) {
        return res.json({ message: `${email} is required` });
    }
    try {

        await mailService(email, otp);
        // Store OTP, email, and user ID in the session
        (req.session as SessionData).email = email;
        (req.session as SessionData).otp = otp;
        globalSessionID = req.sessionID;
        sessionStore[req.sessionID] = req.session as SessionData;
        res.json({ success: true })

    } catch (error) {
        console.error('Error sending OTP email:', error);
        throw new Error('Failed to send email');
    }

}

// Validate otp 
export const validateOtp = async (req: Request, res: Response) => {
    const { email, otp } = req.body;
    if (!email || !otp) {
        return res.status(404).json({ message: "OTP or Email camnt be empty" });
    }
    try {
        const session = await sessionStore[globalSessionID];
        if (email === session.email && session.otp === otp) {
            res.json({ success: true })
        }
    } catch (error) {
        console.error(error);

    }
}

// to call razorpay functionality
export const razorpayOrder = async (req: Request, res: Response) => {
    const { amount } = req.body;
    try {
        const order = await createRazorpayOrder(amount);
        res.json({ success: true, order_id: order.id, amount: order.amount, currency: order.currency });
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: error });
    }
}


// to store booking data on the data base
const isValidObjectId = (id: any): boolean => mongoose.Types.ObjectId.isValid(id);

export const confirmBooking = async (req: Request, res: Response) => {
    const {
        userDetails,
        movieTitle,
        theaterName,
        showDate,
        showTime,
        selectedSeats,
        totalPrice,
        paymentId,
    } = req.body;


    try {
        // Find the user
        const user = await User.findOne({ email: userDetails.email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find the movie
        const movie = await Movies.findOne({ title: movieTitle });
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        const theater = await Theaters.findOne({ theater_name: theaterName });

        const movieId = movie.id;

        const theaterId = theater?.id;

        const qrCode = await generateQR(user.firstname, movieTitle, theaterName, showDate, showTime, selectedSeats);


        // Create a new booking
        const booking = new Booking({
            user: {
                firstname: user.firstname,
                email: user.email,
                phone: userDetails.number,
            },
            movie: movieTitle,
            theatre: theaterName,
            date: new Date(showDate),
            time: showTime,
            seats: selectedSeats,
            totalPrice: totalPrice,
            paymentId: paymentId,
            qrcodeUrl: qrCode,
        });

        await booking.save();

        // Find the theater schedule
        const theaterSchedule = await ShowSchedules.findOne({
            'theaterId': theaterId,
            'movies.movieId': movieId,
            'movies.showDates.date': new Date(showDate),
            'movies.showDates.showtimes.time': showTime,
        });


        if (!theaterSchedule) {
            return res.status(404).json({ message: 'Showtime not found' });
        }


        // Find the movie schedule in the theater schedule
        const movieSchedule = theaterSchedule.movies.find(m => {
            return isValidObjectId(m.movieId) && m.movieId.equals(movieId);
        });


        if (!movieSchedule) {
            return res.status(404).json({ message: 'Movie not found in the schedule' });
        }

        // Find the show date
        const showDateObj = movieSchedule.showDates.find(d => new Date(d.date).toISOString().slice(0, 10) === new Date(showDate).toISOString().slice(0, 10));
        if (!showDateObj) {
            return res.status(404).json({ message: 'Show date not found' });
        }


        // Find the showtime
        const showtime = showDateObj.showtimes.find(t => t.time === showTime);
        if (!showtime) {
            return res.status(404).json({ message: 'Showtime not found' });
        }



        // // Update seat status
        selectedSeats.forEach((seatNumber: string) => {
            const seat = showtime.seats.find(s => s.seatNumber === seatNumber);
            if (seat) {
                seat.bookingStatus = true;
                seat.bookedUser = user._id;
            }
        });
        await theaterSchedule.save();

        const messageBody = `
        🎬 *Movie Booking Confirmation* 🎬
        
        Hi *${user.firstname} ${user.lastname}* 👋,
        
        Your booking for the movie *"${movieTitle}"* has been successfully confirmed! 🎉
        
        *Booking Details:*
        🎟️ *Theatre:* ${theaterName}
        📅 *Date:* ${showDate}
        🕒 *Time:* ${showTime}
        🎫 *Seats:* ${selectedSeats.join(", ")}
        💵 *Total Price:* Rs. ${totalPrice}
        
        Enjoy your movies! 🍿🎥`;

        try {
            await whatsappService(userDetails.number, messageBody, qrCode)
        } catch (error) {
            console.error("Error on sending message to whatsapp", error)
        }

        res.status(200).json({
            message: 'Booking and seat status updated successfully',
            booking,
            success: true
        });



    } catch (error) {
        console.error('Error handling booking:', error);
        res.status(500).json({ message: 'Error handling booking' });
    }
};


// handle admin login
export const handleAdminLogin = async(req:Request,res:Response) => {
    const { email,password } = req.body;
    if(email === process.env.ADMIN_EMAIL){
        if(password === process.env.ADMIN_PASS){
            res.json({message:"Admin Authenticated",authenticated:true})
        }else(
            res.json({message:"Invalid Password"})
        )
    }else{
        res.json({message:"No user found!"})
    }
}


// fetch tickets as per the user
export const fetchTickets = async (req: Request, res: Response) => {
    const { email } = req.body;
    try {
        // Fetch all bookings for the provided email
        const tickets = await Booking.find({ 'user.email': email });

        // Check if there are any tickets found for the email
        if (tickets.length === 0) {
            return res.status(404).json({ message: 'No tickets found for this email.' });
        }

        // Return the list of tickets
        return res.status(200).json({
            message: 'Tickets fetched successfully.',
            tickets,
        });
    } catch (error) {
        console.error('Error fetching tickets:', error);
        return res.status(500).json({ message: 'Error fetching tickets.' });
    }
}