"use client";
import { fetchSeatData, handleRazorpay, Seat } from "@/utils/userUtils";
import React, { FC, useEffect, useState } from "react";
import styles from "./SeatSelection.module.css"; // Import the CSS module
import ButtonComponent from "@/components/reusableComponents/ButtonComponent/ButtonComponent";
import { fetchUserDetails } from "@/utils/userUtils";
import InputComponent from "@/components/reusableComponents/InputComponent/InputComponent";

interface seatMapProps {
  showtimeId: string;
}

const SeatMap: React.FC<seatMapProps> = ({ showtimeId }) => {
  const [seatData, setSeatData] = useState<Seat[]>([]);
  const [selectedSeatsId, setSelectedSeatsId] = useState<string[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]); // Seat numbers
  const [movieName, setMovieName] = useState("");
  const [theaterName, setTheaterName] = useState("");
  const [showTime, setShowTime] = useState("");
  const [showDate, setShowDate] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [profileName, setProfleName] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [showNumberInput, setShowNumberInput] = useState(false);
  const [phone, setPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const userDetails = {
    profileName: profileName,
    email: profileEmail,
    number: phone,
  };

  const token = localStorage.getItem("token");

  // Fetch seat data
  useEffect(() => {
    fetchSeatData(
      showtimeId,
      setSeatData,
      setMovieName,
      setTheaterName,
      setShowDate,
      setShowTime
    );

    console.log(seatData);
  }, [showtimeId]);

  // Fetch user details
  useEffect(() => {
    if (token) {
      fetchUserDetails({
        token: token,
        setFullname: setProfleName,
        setEmail: setProfileEmail,
      });
    }
  }, [token]);

  // Load Razorpay SDK
  useEffect(() => {
    const loadRazorpayScript = async () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => setRazorpayLoaded(true);
      script.onerror = () => console.error("Failed to load Razorpay SDK.");
      document.body.appendChild(script);
    };
    loadRazorpayScript();
  }, []);

  // Handle seat selection
  const handleSeatClick = (seatNumber: string, seatId: string) => {
    // Check if the seat is booked
    const seat = seatData.find((seat) => seat.seatNumber === seatNumber);
    if (seat?.bookingStatus) {
      alert("This seat is already booked");
      return;
    }

    // Toggle seat selection
    if (selectedSeats.includes(seatNumber)) {
      // Deselect the seat
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
      setSelectedSeatsId(selectedSeatsId.filter((id) => id !== seatId));

      // Decrease the amount by one seat price
      setAmount(amount - 150);
    } else {
      // Select the seat
      setSelectedSeats([...selectedSeats, seatNumber]);
      setSelectedSeatsId([...selectedSeatsId, seatId]);

      // Increase the amount by one seat price
      setAmount(amount + 150);
    }
  };

  const handleShowWhatsapp = () => {
    setShowNumberInput(!showNumberInput);
  };

  // handle whatsapp number 
  const handleSavePhoneNumber = () => {
    const phoneNumberRegex = /^[6-9]\d{9}$/;
  
    // Check if the phone number is not provided or is invalid
    if (!phone || !phoneNumberRegex.test(phone)) {
      setErrorMessage("Enter a valid Phone number and Try again");
      return;
    }
  
    setErrorMessage('');
    // Proceed with the Razorpay flow if phone number is valid
    handleRazorpay(
      razorpayLoaded,
      amount,
      profileName,
      profileEmail,
      userDetails,
      movieName,
      theaterName,
      showDate,
      showTime,
      selectedSeats
    );
    
  };
  

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "100px",
        }}
        className={styles.main}
      >
        <div className={styles.movieDetails}>
          <h2>{movieName}</h2>
          <h2>{theaterName}</h2>
          <p>
            {showDate.split("T")[0]} | {showTime}
          </p>
        </div>

        <div className={styles.seatContainer}>
          <div className={styles.container}>
            {seatData.map((seat) => (
              <div
                key={seat._id} // Using seat's unique ID
                className={`${styles.seat} ${
                  seat.bookingStatus
                    ? styles.booked
                    : selectedSeats.includes(seat.seatNumber)
                    ? styles.selected
                    : styles.available
                }`}
                onClick={() => handleSeatClick(seat.seatNumber, seat._id)} // Pass seat number and seat ID
              >
                {seat.seatNumber}
              </div>
            ))}
          </div>
        </div>
        <span className={styles.screen}>Screen position</span>

        {selectedSeats.length > 0 && (
          <div className={styles.paymentSection}>
            <ButtonComponent
              value={`Pay ₹${amount}/-`}
              className="payButton"
              onClickFunction={() => handleShowWhatsapp()}
            />
          </div>
        )}
      </div>
      {showNumberInput && (
        <div className={styles.phoneNumberSection}>
          <div className={styles.bookingDetails}>
            <span onClick={() => handleShowWhatsapp()}>X</span>
            <h2>Add Whatsapp Number.</h2>

            <div className={styles.inputSection}>
              <InputComponent
                type="number"
                value={phone}
                onChange={setPhone}
                customClassName="whatsappInput"
                placeholder="Your Number"
              />
              <ButtonComponent
                value="Confirm Booking"
                className="sendBookingDetailsButton"
                onClickFunction={() => handleSavePhoneNumber()}
              />

              {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatMap;
