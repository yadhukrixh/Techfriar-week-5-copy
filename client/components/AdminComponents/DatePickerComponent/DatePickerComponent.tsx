import React, { useState } from 'react';
import styles from './DatePickerComponent.module.css';

/**
 * Props for the DatePickerComponent.
 * 
 * @param {string} [label] - The label for the date picker.
 * @param {function} setSelectedDate - A callback function to set the selected date.
 */
interface DatePickerComponentProps {
  label?: string;
  setSelectedDate: (date: string) => void;
}

/**
 * A date picker component that allows users to select a date.
 * 
 * @param {DatePickerComponentProps} props - The props for the component.
 * @returns {JSX.Element} The JSX element for the date picker component.
 */
const DatePickerComponent: React.FC<DatePickerComponentProps> = ({
  label,
  setSelectedDate,
}) => {
  /**
   * The state to store the selected date.
   */
  const [date, setDate] = useState<string>('');

  /**
   * Handles the change event for the date input.
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event.
   */
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    setSelectedDate(selectedDate); // Pass the selected date to the parent component
  };

  return (
    <div className={styles.datePickerWrapper}>
      <input
        type="date"
        value={date}
        onChange={handleDateChange}
        placeholder={label}
        className={styles.datePickerInput}
      />
    </div>
  );
};

export default DatePickerComponent;