import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.info}>
          <h1 className={styles.appName}>Ticket Mate</h1>
          <p className={styles.copyright}>
            <span onClick={()=>{
                window.location.href = '/Admin/AdminLogin'
            }}>©</span> 2024 YourAppName. All rights reserved.
          </p>
        </div>
        <div className={styles.socialLinks}>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            <i className="ri-twitter-line"></i>
          </a>
          <a
            href="https://facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            <i className="ri-facebook-fill"></i>
          </a>
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
