import React, { useState, useEffect } from 'react';
import { FcSearch } from "react-icons/fc";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (query === "") {
      setHasSearched(false);
    }
  }, [query]);

  const scrollToFeedback = () => {
    setTimeout(() => {
      const section = document.getElementById("feedbackSection");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const handleChange = (e) => setQuery(e.target.value);

  const handleSearchClick = () => {
    onSearch(query);
    setHasSearched(true);
    scrollToFeedback();
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
    setHasSearched(false);
    scrollToFeedback();
  };

  return (
    <div
      className={`flex justify-center px-2 transition-all duration-300 ${
        hasSearched ? "mb-6" : "mb-6"
      }`}
    >
      <div
        className="flex items-center gap-2 p-2 w-full max-w-xl lg:max-w-md border border-white dark:border-white rounded-[25px]"
        style={{
          maxWidth: window.innerWidth <= 440 ? "95%" : undefined,
        }}
      >
        {/* Input */}
        <div className="flex items-center flex-grow min-w-0 border border-gray-300 dark:border-gray-600 h-10 px-2 focus-within:ring-2 ring-blue-400 rounded-[25px]">
          <FcSearch className="text-xl mr-2 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search by city..."
            value={query}
            onChange={handleChange}
            className="w-full bg-transparent outline-none text-sm text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 h-full"
          />
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearchClick}
          className="bg-yellow-500 text-white text-sm px-4 h-10 hover:bg-yellow-600 transition rounded-[25px]"
        >
          Search
        </button>

        {/* Clear Button */}
        {query && (
          <button
            onClick={handleClear}
            className="bg-gray-300 dark:bg-gray-600 text-sm text-black dark:text-white px-4 h-10 hover:bg-gray-400 dark:hover:bg-gray-500 transition rounded-[25px]"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
