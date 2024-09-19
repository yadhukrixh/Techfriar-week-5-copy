"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';
import styles from './SearchBar.module.css'; // Import the CSS module

/**
 * Interface for SearchBar component props.
 * @property {function} onSearch - Function to be called when search is performed.
 */
interface SearchBarProps {
  onSearch: (query: string) => void;
}

/**
 * SearchBar component.
 * @param {SearchBarProps} props - Component props.
 * @returns {JSX.Element} SearchBar component.
 */
const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  /**
   * State variable to store the search query.
   */
  const [query, setQuery] = useState<string>('');

  /**
   * Handles input change event.
   * @param {ChangeEvent<HTMLInputElement>} e - Input change event.
   */
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  /**
   * Handles search form submission.
   * @param {FormEvent<HTMLFormElement>} e - Form submission event.
   */
  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    /**
     * Search form.
     */
    <form
      className={styles.search}
      onSubmit={handleSearch} 
      style={{ display: "flex", flexDirection: "row", columnGap:'20px' }}
    >
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search Movie..."
        className={styles.searchInput} // Apply the CSS class
      />
      <button>
        <i className="ri-search-2-line"></i>
      </button>
    </form>
  );
};

export default SearchBar;