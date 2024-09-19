import React, { FC } from "react";
import styles from "./SigniInPopup.module.css";
import { handleGoogleLogin } from "@/utils/userUtils";

/**
 * Props for the SignInPopup component.
 * @typedef {Object} SigninProps
 * @property {boolean} isOpen - Whether the popup is open or not.
 * @property {function} onClose - Function to call when the popup is closed.
 */
interface SigninProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * A popup component for signing in with Google or Facebook.
 * @param {SigninProps} props - The component props.
 * @returns {JSX.Element|null} The popup component or null if it's not open.
 */
const SignInPopup: FC<SigninProps> = ({ isOpen, onClose }) => {
  // Don't render the popup if it's not open
  if (!isOpen) return null;

  return (
    // The overlay that covers the entire screen
    <div className={styles.overlay}>
      {/* The popup container */}
      <div className={styles.popup}>
        {/* The close button */}
        <button className={styles.closeBtn} onClick={onClose}>
          &times;
        </button>
        {/* The sign in header */}
        <h2>Sign in</h2>
        {/* The sign in options container */}
        <div className={styles.signinOptions}>
          {/* The Google sign in button */}
          <button
            className={styles.googleBtn}
            onClick={() => handleGoogleLogin()}
          >
            <img src="/images/icons/google.svg" alt="Google Icon" />
            Sign in with Google
          </button>
          {/* The Facebook sign in button */}
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