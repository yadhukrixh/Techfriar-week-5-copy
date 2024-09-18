"use client";

import React, { useState } from 'react';
import styles from './AdminLogin.module.css';
import { handleAdminLogin } from '@/utils/adminUtils';

const page = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage,setErrorMessage] = useState('');
  
    
  
    return (
      <div className={styles.loginContainer}>
        <div className={styles.loginForm}>
          <h2 className={styles.loginTitle}>Admin Login</h2>
  
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
            {errorMessage &&
                <p style={{color:'red' , textAlign:"center"}}>{errorMessage}</p>
            }
          </div>
  
          <button className={styles.loginButton} onClick={()=>handleAdminLogin(email,password,setErrorMessage)}>Login</button>
        </div>
      </div>
    );
  };

export default page;
