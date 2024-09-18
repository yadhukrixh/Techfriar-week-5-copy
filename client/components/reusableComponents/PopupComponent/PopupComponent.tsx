import React, { useEffect } from 'react';
import styles from './PopupComponent.module.css';

interface PopupComponentProps {
  message: string;
  onClose: () => void;
}

const PopupComponent: React.FC<PopupComponentProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={styles.popupContainer}>
      <div className={styles.popupMessage}>
        {message}
      </div>
    </div>
  );
};

export default PopupComponent;
