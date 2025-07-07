import React, { useEffect, useState } from "react";
import "./ThemeToggle.css";

const ThemeToggle = () => {
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
    <div className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
      <img
        src={darkMode ? "public/theme.jpg" : "public/dark.png"}
        alt="Toggle Theme"
        className="theme-icon"
      />
    </div>
  );
};

export default ThemeToggle;
