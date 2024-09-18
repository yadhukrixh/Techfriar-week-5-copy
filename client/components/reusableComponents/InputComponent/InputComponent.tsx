import React, { FC, ChangeEvent } from 'react';
import styles from './InputComponent.module.css';

interface InputSectionProps {
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  customClassName?: keyof typeof styles; // Ensure this matches a key in `styles`
  editableStatus?: boolean;
  toUppercase?: boolean;
}

const InputComponent: FC<InputSectionProps> = ({
  type,
  value,
  onChange,
  placeholder,
  customClassName,
  editableStatus,
  toUppercase,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (toUppercase) {
      const upperCaseValue = e.target.value.toUpperCase();
      onChange(upperCaseValue);
    } else {
      onChange(e.target.value);
    }
  };

  return (
    <div className={styles.main}>
      <input
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={customClassName ? styles[customClassName] : styles.CustomInput}
        required
        readOnly={editableStatus || false}
      />
    </div>
  );
};

export default InputComponent;
