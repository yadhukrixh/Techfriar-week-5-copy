"use client";

// Import necessary dependencies
import { fetchSeatData, handleRazorpay, Seat } from "@/utils/userUtils";
import React, { FC, useEffect, useState } from "react";
import styles from "./SeatSelection.module.css"; // Import the CSS module
import ButtonComponent from "@/components/reusableComponents/ButtonComponent/ButtonComponent";
import { fetchUserDetails } from "@/utils/userUtils";
import InputComponent from "@/components/reusableComponents/InputComponent/InputComponent";

// Define the interface for seat map props
interface seatMapProps {
  showtimeId: string;
}

// Define the SeatMap component
const SeatMap: React.FC<seatMapProps> = ({ showtimeId }) => {
  // Initialize state variables
  const [seatData, setSeatData] = useState<Seat[]>([]); // Store seat data
  const [selectedSeatsId, setSelectedSeatsId] = useState<string[]>([]); // Store selected seat IDs
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]); // Store selected seat numbers
  const [movieName, setMovieName] = useState(""); // Store movie name
  const [theaterName, setTheaterName] = useState(""); // Store theater name
  const [showTime, setShowTime] = useState(""); // Store show time
  const [showDate, setShowDate] = useState(""); // Store show date
  const [amount, setAmount] = useState<number>(0); // Store total amount
  const [razorpayLoaded, setRazorpayLoaded] = useState(false); // Store Razorpay SDK load status
  const [profileName, setProfleName] = useState(""); // Store user profile name
  const [profileEmail, setProfileEmail] = useState(""); // Store user email
  const [showNumberInput, setShowNumberInput] = useState(false); // Store show number input status
  const [phone, setPhone] = useState(""); // Store user phone number
  const [errorMessage, setErrorMessage] = useState(""); // Store error message

  // Define user details object
  const userDetails = {
    profileName: profileName,
    email: profileEmail,
    number: phone,
  };

  // Get token from local storage
  const token = localStorage.getItem("token");

  // Fetch seat data on component mount
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

  // Fetch user details on component mount
  useEffect(() => {
    if (token) {
      fetchUserDetails({
        token: token,
        setFullname: setProfleName,
        setEmail: setProfileEmail,
      });
    }
  }, [token]);

  // Load Razorpay SDK on component mount
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

  // Handle show whatsapp number input
  const handleShowWhatsapp = () => {
    setShowNumberInput(!showNumberInput);
  };

  // Handle save phone number
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

  // Render the component
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