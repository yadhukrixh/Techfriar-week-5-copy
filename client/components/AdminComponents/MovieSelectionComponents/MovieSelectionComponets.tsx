import React, { useState } from 'react';
import styles from './MovieSelectionComponents.module.css';
import { MoviesForSetShow } from '../ManageShows/ManageShows';

interface SelectOption {
  _id: string;
  label: string;
}

interface SelectComponentProps {
  options: MoviesForSetShow[];
  placeholder: string;
  setSelectedValue: (value: string) => void;
}

const MovieSelectionComponent: React.FC<SelectComponentProps> = ({
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
            {option.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MovieSelectionComponent;
