"use client";

import React, { useState } from 'react';
import styles from './AdminLogin.module.css';
import { handleAdminLogin } from '@/utils/adminUtils';

/**
 * Admin login page component.
 * 
 * Handles user input for email and password, and calls the handleAdminLogin function
 * when the login button is clicked.
 * 
 * @returns {JSX.Element} The admin login page component.
 */
const page = () => {
  // State variables to store the user's email and password input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  return (
    // Container for the login form
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <h2 className={styles.loginTitle}>Admin Login</h2>

        {/* Email input field */}
        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
            placeholder="Enter your admin email"
          />
        </div>

        {/* Password input field */}
        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
            placeholder="Enter your password"
          />
          {/* Display error message if any */}
          {errorMessage &&
            <p style={{ color: 'red', textAlign: "center" }}>{errorMessage}</p>
          }
        </div>

        {/* Login button */}
        <button className={styles.loginButton} onClick={() => handleAdminLogin(email, password, setErrorMessage)}>Login</button>
      </div>
    </div>
  );
};

export default page;