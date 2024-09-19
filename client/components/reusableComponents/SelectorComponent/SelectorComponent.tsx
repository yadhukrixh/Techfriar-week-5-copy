// Import necessary modules
import React, { useState } from "react";
import styles from './SelectorComponent.module.css'; // Import CSS styles for the component

// Define the interface for the component's props
interface CustomSelectorProps {
  // Array of options to be displayed in the select element
  options: any[];
  // Placeholder text to be displayed when no option is selected
  placeholder: string;
  // Optional class name to be applied to the select element
  className?: string;
  // Function to be called when the selected value changes
  setSelectedValue: (value: any) => void;
}

// Define the SelectorComponent as a functional component
const SelectorComponent: React.FC<CustomSelectorProps> = ({
  options,
  placeholder,
  className,
  setSelectedValue
}) => {
  // Initialize the state to store the currently selected option
  const [selectedOption, setSelectedOption] = useState<string>('');

  // Define the handleChange function to handle changes to the select element
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // Get the value of the selected option
    const value = e.target.value;
    // Update the state with the selected value
    setSelectedOption(value);
    // Call the setSelectedValue function to notify the parent component of the change
    setSelectedValue(value);
  };

  // Return the JSX for the component
  return (
    // Container element for the select element
    <div className={styles.selectWrapper}>
      {/* Select element with the options */}
      <select 
        // Set the value of the select element to the currently selected option
        value={selectedOption} 
        // Call the handleChange function when the select element changes
        onChange={handleChange} 
        // Apply the class name to the select element if provided
        className={className ? styles[className] : styles.selectBox}
      >
        {/* Disabled option to display the placeholder text */}
        <option value="" disabled>
          {placeholder}
        </option>
        {/* Map over the options and create an option element for each one */}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

// Export the SelectorComponent as the default export
export default SelectorComponent;