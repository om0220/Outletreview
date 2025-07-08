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
  const [cityFilter, setCityFilter] = useState('');
  const [foodType, setFoodType] = useState('all'); // 'veg' | 'nonveg' | 'all'

  const addFeedback = (feedback) => {
    setFeedbacks((prev) => [...prev, { ...feedback, id: Date.now() }]);
  };

  const handleSearch = (city) => {
    setCityFilter(city);
    setTimeout(() => {
      document.getElementById('feedbackSection')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const filteredFeedbacks = feedbacks.filter((f) =>
    f.city.toLowerCase().includes(cityFilter.toLowerCase()) &&
    (foodType === 'all' || f.type === foodType)
  );

  return (
    <div className="app-container">
      {/* Theme Toggle */}
      <ThemeToggle />

      {/* Title */}
      <h1 className="app-title">🍽️ Food Outlet Feedback App</h1>

      {/* Search Bar */}
      <SearchBar onSearch={handleSearch} />

      {/* Food Type Toggle */}
     

      {/* Map View */}
      <MapView feedbacks={filteredFeedbacks} />

      {/* Feedback Form */}
      <FeedbackForm onAdd={addFeedback} />

      {/* Feedback List */}
      <FeedbackList feedbacks={filteredFeedbacks} />
    </div>
  );
}

export default App;
