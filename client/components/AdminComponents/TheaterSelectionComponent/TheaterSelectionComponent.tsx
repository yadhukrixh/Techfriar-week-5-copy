import React, { useState } from 'react';
import styles from './TheaterSelectionComponent.module.css';
import { MoviesForSetShow, TheatersForSetShow } from '../ManageShows/ManageShows';

/**
 * Interface for the SelectComponentProps.
 * @typedef {Object} SelectComponentProps
 * @property {TheatersForSetShow[]} options - An array of theater options.
 * @property {string} placeholder - The placeholder text for the select element.
 * @property {(value: string) => void} setSelectedValue - A function to set the selected value.
 */
interface SelectComponentProps {
  options: TheatersForSetShow[];
  placeholder: string;
  setSelectedValue: (value: string) => void;
}

/**
 * A functional component for selecting a theater.
 * @param {SelectComponentProps} props - The component props.
 * @returns {JSX.Element} The JSX element.
 */
const TheaterSelectionComponent: React.FC<SelectComponentProps> = ({
  options,
  placeholder,
  setSelectedValue
}) => {
  /**
   * State to store the selected option.
   */
  const [selectedOption, setSelectedOption] = useState<string>('');

  /**
   * Handles the change event of the select element.
   * @param {React.ChangeEvent<HTMLSelectElement>} e - The event object.
   */
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedOption(value);
    setSelectedValue(value); // Send the selected value to the parent component
  };

  return (
    <div className={styles.selectWrapper}>
      {/**
       * The select element with options.
       */}
      <select value={selectedOption} onChange={handleChange} className={styles.selectBox}>
        {/**
         * The placeholder option.
         */}
        <option value="" disabled>
          {placeholder}
        </option>
        {/**
         * Map through the options and render each option.
         */}
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