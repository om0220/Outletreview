import React, { useEffect, useState } from "react";
import { LuMoonStar, LuSun } from "react-icons/lu";

const Header = () => {
  const [darkMode, setDarkMode] = useState(() =>
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const root = window.document.documentElement;
    darkMode
      ? root.classList.add("dark")
      : root.classList.remove("dark");
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <header className="bg-[#ffe7c2] dark:bg-black py-4 px-4 transition-colors duration-500">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between relative">
        {/* Responsive Heading */}
        <h1 className="text-base sm:text-xl lg:text-4xl font-bold text-gray-800 dark:text-white tracking-tight w-full text-center">
          🍽️ Food Outlet Feedback App
        </h1>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          title="Toggle theme"
          className="absolute right-0 text-2xl text-gray-700 dark:text-gray-200 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors duration-300"
        >
          {darkMode ? <LuSun /> : <LuMoonStar />}
        </button>
      </div>
    </header>
  );
};

export default Header;
