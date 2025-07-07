import React, { useState } from 'react';
import './App.css';
import { feedbackData } from './data';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';
import MapView from './components/MapView';
import SearchBar from './components/SearchBar';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const [feedbacks, setFeedbacks] = useState(feedbackData);
  const [cityFilter, setCityFilter] = useState("");

  const addFeedback = (feedback) => {
    setFeedbacks(prev => [...prev, { ...feedback, id: Date.now() }]);
  };

  const filteredFeedbacks = cityFilter
    ? feedbacks.filter(f => f.city.toLowerCase().includes(cityFilter.toLowerCase()))
    : feedbacks;

  return (
    <div className="app-container">
      {/* Theme Toggle Button */}
      <ThemeToggle />

      {/* App Title */}
      <h1 className="app-title">🍽️ Food Outlet Feedback App</h1>

      {/* Search Input */}
      <SearchBar onSearch={setCityFilter} />

      {/* Map showing locations */}
      <MapView feedbacks={filteredFeedbacks} />

      {/* Feedback submission form */}
      <FeedbackForm onAdd={addFeedback} />

      {/* Feedback card list */}
      <FeedbackList feedbacks={filteredFeedbacks} />
    </div>
  );
}

export default App;
