import React from 'react';
import styles from './TicketCard.module.css'
import { bookedTickets } from '@/utils/userUtils';

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
    <div className={styles.ticketCard}>
      <div className={styles.qrCodeContainer}>
        <img src={qrcodeUrl} alt="QR Code" className={styles.qrCode} />
      </div>
      <div className={styles.ticketDetails}>
        <h2>{movie}</h2>
        <p><strong>Theatre:</strong> {theatre}</p>
        <p><strong>Date:</strong> {new Date(date).toDateString()}</p>
        <p><strong>Time:</strong> {time}</p>
        <p><strong>Booking Date:</strong> {bookingDate.slice(0,10)}</p>
        <p><strong>Seats:</strong> {seats.join(', ')}</p>
        <p><strong>Total Price:</strong> ₹{totalPrice}</p>
        <p><strong>Payment ID:</strong> {paymentId}</p>
      </div>
    </div>
  );
};

export default TicketCard;
