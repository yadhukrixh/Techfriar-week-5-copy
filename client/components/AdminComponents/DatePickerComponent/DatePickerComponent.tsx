import React, { useState } from 'react';
import styles from './DatePickerComponent.module.css';

interface DatePickerComponentProps {
  label?: string;
  setSelectedDate: (date: string) => void;
}

const DatePickerComponent: React.FC<DatePickerComponentProps> = ({
  label,
  setSelectedDate,
}) => {
  const [date, setDate] = useState<string>('');

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
