import React, { useEffect } from 'react';
import styles from './PopupComponent.module.css';

/**
 * Props for the PopupComponent.
 * 
 * @property {string} message - The message to be displayed in the popup.
 * @property {function} onClose - A callback function to be called when the popup is closed.
 */
interface PopupComponentProps {
  message: string;
  onClose: () => void;
}

/**
 * A popup component that displays a message and automatically closes after a certain time.
 * 
 * @param {PopupComponentProps} props - The props for the component.
 * @returns {JSX.Element} The JSX element for the popup component.
 */
const PopupComponent: React.FC<PopupComponentProps> = ({ message, onClose }) => {
  /**
   * Effect hook to set a timer to close the popup after 3 seconds.
   */
  useEffect(() => {
    // Set a timer to close the popup after 3 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // 3 seconds

    // Clear the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [onClose]);

  /**
   * Render the popup component.
   */
  return (
    // The container for the popup
    <div className={styles.popupContainer}>
      <div className={styles.popupMessage}>
        {message}
      </div>
    </div>
  );
};

export default PopupComponent;