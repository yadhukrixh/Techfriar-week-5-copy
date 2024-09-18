import mongoose, { Document, Schema, Model } from 'mongoose';

// Define the Booking interface, extending from Document for Mongoose documents
interface IBooking extends Document {
  user: {
    firstname:string;
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
  bookingDate: Date;
  qrcodeUrl:string;
}

// Define the schema
const bookingSchema: Schema = new mongoose.Schema({
  user: {
    firstname: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
  },
  movie: { type: String, required: true },
  theatre: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  seats: [{ type: String, required: true }],
  totalPrice: { type: Number, required: true },
  paymentId: { type: String, required: true },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
  qrcodeUrl: { type: String, required:true},
});

// Define the Booking model with IBooking interface
const Booking: Model<IBooking> = mongoose.model<IBooking>('Booking', bookingSchema);

export default Booking;
