import React, { useState } from 'react';
import '../components/SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const scrollToFeedback = () => {
    setTimeout(() => {
      const section = document.getElementById("feedbackSection");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
  };

  const handleSearchClick = () => {
    onSearch(query);
    scrollToFeedback();
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
    scrollToFeedback();
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

      <button className="search-btn" onClick={handleSearchClick}>Search</button>

      {query && (
        <button className="clear-btn" onClick={handleClear}>✖</button>
      )}
    </div>
  );
};

export default SearchBar;
