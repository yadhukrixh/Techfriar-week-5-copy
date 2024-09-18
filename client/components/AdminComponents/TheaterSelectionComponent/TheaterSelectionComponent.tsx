import React, { useState } from 'react';
import styles from './TheaterSelectionComponent.module.css';
import { MoviesForSetShow, TheatersForSetShow } from '../ManageShows/ManageShows';



interface SelectComponentProps {
  options: TheatersForSetShow[];
  placeholder: string;
  setSelectedValue: (value: string) => void;
}

const TheaterSelectionComponent: React.FC<SelectComponentProps> = ({
  options,
  placeholder,
  setSelectedValue
}) => {
    const [selectedOption, setSelectedOption] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      setSelectedOption(value);
      setSelectedValue(value); // Send the selected value to the parent component
    };

  return (
    <div className={styles.selectWrapper}>
      <select value={selectedOption} onChange={handleChange} className={styles.selectBox}>
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option._id} value={option._id}>
            {option.theater_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TheaterSelectionComponent;
