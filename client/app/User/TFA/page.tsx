"use client";
// Import necessary dependencies
import React, { useEffect, useState } from 'react';
import styles from './TFA.module.css';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { handleRequestOtp, handleValidateOtp } from '@/utils/userUtils';

// Define the page component
const page = () => {
  // Initialize state variables
  const [email, setEmail] = useState(''); // Email address of the user
  const [otp, setOtp] = useState(''); // One-time password
  const [isOtpSent, setIsOtpSent] = useState(false); // Flag to track if OTP has been sent
  const [errorMessage, setErrorMessage] = useState(''); // Error message to display
  const [successMessage, setSuccessMessage] = useState(''); // Success message to display
  const token = localStorage.getItem('token'); // Token stored in local storage
  const loggedInToken = localStorage.getItem('token');

  // Redirect to login page if not logged in
  if (!loggedInToken) {
    window.location.href = '/';
  }

  // Function to fetch email from token
  const fetchEmail = (token: string) => {
    // Decode the token to get user data
    const decoded: { userId: string; email: string } = jwtDecode(token);
    // Set the email address
    setEmail(decoded.email);
  };

  // Use effect to fetch email when token changes
  useEffect(() => {
    fetchEmail(token ? token : '');
  }, [token]);

  // Render the component
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h2>{!isOtpSent ? 'Request OTP' : 'Validate OTP'}</h2>
        {/* Render request OTP form if OTP has not been sent */}
        {!isOtpSent ? (
          <>
            <label htmlFor="email">Email Address:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              readOnly
            />
            <button
              className={styles.primaryBtn}
              onClick={() =>
                handleRequestOtp(
                  email,
                  setIsOtpSent,
                  setErrorMessage,
                  setSuccessMessage
                )
              }
            >
              Send OTP
            </button>
          </>
        ) : (
          // Render validate OTP form if OTP has been sent
          <>
            <label htmlFor="otp">Enter OTP:</label>
            <input
              id="otp"
              type="number"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter the OTP"
              required
            />
            <button
              className={styles.primaryBtn}
              onClick={() =>
                handleValidateOtp(email, otp, setSuccessMessage, setErrorMessage)
              }
            >
              Validate OTP
            </button>
          </>
        )}

        {/* Display error message if any */}
        {errorMessage && <p className={styles.errorMsg}>{errorMessage}</p>}
        {/* Display success message if any */}
        {successMessage && <p className={styles.successMsg}>{successMessage}</p>}
      </div>
    </div>
  );
};

// Export the page component
export default page;
