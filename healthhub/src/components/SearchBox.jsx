import React, { useState } from 'react';
import '../styles/SearchBox.css';

/**
 * SearchBox component
 * This component renders a search box with input and buttons for searching and resetting.
 * @param {function} onSearch - Function to call when the search input changes.
 * @param {function} onReset - Function to call when the reset button is clicked.
 */
const SearchBox = ({ onSearch, onReset }) => {
  const [query, setQuery] = useState('');

  /**
   * handleSearch
   * Calls the onSearch function with the current query.
   */
  const handleSearch = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

  /**
   * handleReset
   * Resets the query state and calls the onReset function.
   */
  const handleReset = () => {
    setQuery('');
    onReset();
  };

  return (
    <div className="search-box">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Hospital name"
      />
      <button onClick={() => onSearch(query)} className='search-button'>Search</button>
      <button onClick={handleReset} className='reset-button'>Reset</button>
    </div>
  );
};

export default SearchBox;