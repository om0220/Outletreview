import React, { useState } from 'react';
import '../components/SearchBar.css'
const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="🔍 Search by city..."
        value={query}
        onChange={handleChange}
        className="search-input"
      />
      {query && (
        <button className="clear-btn" onClick={handleClear}>✖</button>
      )}
    </div>
  );
};

export default SearchBar;
