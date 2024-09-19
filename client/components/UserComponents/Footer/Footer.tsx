import React from "react";
import styles from "./Footer.module.css";

/**
 * Footer component that displays the application's name, copyright information, and social media links.
 *
 * @returns {JSX.Element} The Footer component.
 */
const Footer = () => {
  return (
    /**
     * The footer element that contains all the footer content.
     */
    <footer className={styles.footer}>
      {/**
       * The container element that wraps the footer content.
       */}
      <div className={styles.container}>
        {/**
         * The info section that displays the application's name and copyright information.
         */}
        <div className={styles.info}>
          {/**
           * The application's name.
           */}
          <h1 className={styles.appName}>Ticket Mate</h1>
          {/**
           * The copyright information with a link to the admin login page.
           */}
          <p className={styles.copyright}>
            <span onClick={() => {
              window.location.href = '/Admin/AdminLogin'
            }}> 2024 YourAppName. All rights reserved.</span>
          </p>
        </div>
        {/**
         * The social links section that displays links to the application's social media profiles.
         */}
        <div className={styles.socialLinks}>
          {/**
           * Link to the application's Twitter profile.
           */}
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            <i className="ri-twitter-line"></i>
          </a>
          {/**
           * Link to the application's Facebook profile.
           */}
          <a
            href="https://facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            <i className="ri-facebook-fill"></i>
          </a>
          {/**
           * Link to the application's Instagram profile.
           */}
          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            <i className="ri-instagram-fill"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;