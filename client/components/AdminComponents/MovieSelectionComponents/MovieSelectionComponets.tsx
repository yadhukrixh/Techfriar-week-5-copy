import React, { useState } from 'react';
import styles from './MovieSelectionComponents.module.css';
import { MoviesForSetShow } from '../ManageShows/ManageShows';

/**
 * Interface for select option
 */
interface SelectOption {
  _id: string;
  label: string;
}

/**
 * Interface for select component props
 */
interface SelectComponentProps {
  /**
   * Array of movie options
   */
  options: MoviesForSetShow[];
  /**
   * Placeholder text for the select box
   */
  placeholder: string;
  /**
   * Function to set the selected value in the parent component
   */
  setSelectedValue: (value: string) => void;
}

/**
 * Movie selection component
 */
const MovieSelectionComponent: React.FC<SelectComponentProps> = ({
  options,
  placeholder,
  setSelectedValue
}) => {
  /**
   * State to store the selected option
   */
  const [selectedOption, setSelectedOption] = useState<string>('');

  /**
   * Handle change event for the select box
   */
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