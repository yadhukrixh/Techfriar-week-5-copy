"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';
import styles from './SearchBar.module.css'; // Import the CSS module

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form className={styles.search}
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
