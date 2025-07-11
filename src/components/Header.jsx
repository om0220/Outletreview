import React, { useEffect, useState } from "react";
import { LuMoonStar, LuSun } from "react-icons/lu";
import './Header.css';

const Header = () => {
  const [darkMode, setDarkMode] = useState(() =>
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document.body.classList.toggle("dark-theme", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <header className="app-header">
      <h1 className="app-title">🍽️ Food Outlet Feedback App</h1>
      <div className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
        {darkMode ? (
          <LuSun className="theme-icon" />
        ) : (
          <LuMoonStar className="theme-icon" />
        )}
      </div>
    </header>
  );
};

export default Header;
