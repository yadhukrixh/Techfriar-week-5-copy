"use client";
import React, { useEffect, useState } from 'react';
import styles from './TFA.module.css';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { handleRequestOtp, handleValidateOtp } from '@/utils/userUtils';
import { parseCookies } from 'nookies';

const page = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const token  = localStorage.getItem('token');
    const cookies = parseCookies();
    const loggedInToken = cookies.token;

    if(!loggedInToken){
      window.location.href = '/';
    }

    const fetchEmail = (token:string) => {
        const decoded: { userId: string; email: string } = jwtDecode(token);
        setEmail(decoded.email);
    }

    useEffect(()=>{
        fetchEmail(token?token:'')
    },[token])
  
    // Function to request OTP
    
    // Function to validate OTP
   
  
    return (
      <div className={styles.wrapper}>
      <div className={styles.card}>
        <h2>{!isOtpSent ? 'Request OTP' : 'Validate OTP'}</h2>
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
            <button className={styles.primaryBtn} onClick={() =>
                handleRequestOtp(
                  email,
                  setIsOtpSent,
                  setErrorMessage,
                  setSuccessMessage
                )}>
              Send OTP
            </button>
          </>
        ) : (
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
            <button className={styles.primaryBtn} onClick={()=>handleValidateOtp(email,otp,setSuccessMessage,setErrorMessage)}>
              Validate OTP
            </button>
          </>
        )}

        {errorMessage && <p className={styles.errorMsg}>{errorMessage}</p>}
        {successMessage && <p className={styles.successMsg}>{successMessage}</p>}
      </div>
    </div>
  );
}

export default page
