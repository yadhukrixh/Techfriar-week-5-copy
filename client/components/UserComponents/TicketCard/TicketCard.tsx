import React from 'react';
import styles from './TicketCard.module.css'
import { bookedTickets } from '@/utils/userUtils';

/**
 * TicketCard component displays the details of a booked ticket.
 * 
 * @param {bookedTickets} props - The props for the TicketCard component.
 * @param {string} props.user - The user who booked the ticket.
 * @param {string} props.movie - The name of the movie.
 * @param {string} props.theatre - The name of the theatre.
 * @param {string} props.date - The date of the movie.
 * @param {string} props.time - The time of the movie.
 * @param {string[]} props.seats - The seats booked by the user.
 * @param {number} props.totalPrice - The total price of the ticket.
 * @param {string} props.paymentId - The payment ID of the ticket.
 * @param {string} props.qrcodeUrl - The URL of the QR code.
 * @param {string} props.bookingDate - The date the ticket was booked.
 * @returns {JSX.Element} The TicketCard component.
 */
const TicketCard: React.FC<bookedTickets> = ({
  user,
  movie,
  theatre,
  date,
  time,
  seats,
  totalPrice,
  paymentId,
  qrcodeUrl,
  bookingDate,
}) => {
  return (
    // The container for the ticket card
    <div className={styles.ticketCard}>
      {/* The container for the QR code */}
      <div className={styles.qrCodeContainer}>
        {/* The QR code image */}
        <img src={qrcodeUrl} alt="QR Code" className={styles.qrCode} />
      </div>
      {/* The container for the ticket details */}
      <div className={styles.ticketDetails}>
        {/* The movie title */}
        <h2>{movie}</h2>
        {/* The theatre name */}
        <p><strong>Theatre:</strong> {theatre}</p>
        {/* The movie date */}
        <p><strong>Date:</strong> {new Date(date).toDateString()}</p>
        {/* The movie time */}
        <p><strong>Time:</strong> {time}</p>
        {/* The booking date */}
        <p><strong>Booking Date:</strong> {bookingDate.slice(0,10)}</p>
        {/* The booked seats */}
        <p><strong>Seats:</strong> {seats.join(', ')}</p>
        {/* The total price */}
        <p><strong>Total Price:</strong> ₹{totalPrice}</p>
        {/* The payment ID */}
        <p><strong>Payment ID:</strong> {paymentId}</p>
      </div>
    </div>
  );
};

export default TicketCard;