import React, { FC } from "react";
import styles from "./SigniInPopup.module.css";
import { handleGoogleLogin } from "@/utils/userUtils";

interface SigninProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignInPopup: FC<SigninProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Don't render if popup is not open
  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <button className={styles.closeBtn} onClick={onClose}>
          &times;
        </button>
        <h2>Sign in</h2>
        <div className={styles.signinOptions}>
          <button
            className={styles.googleBtn}
            onClick={() => handleGoogleLogin()}
          >
            <img src="/images/icons/google.svg" alt="Google Icon" />
            Sign in with Google
          </button>
          <button className={styles.facebookBtn}>
            <img src="/images/icons/facebook.svg" alt="Facebook Icon" />
            Sign in with Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInPopup;
