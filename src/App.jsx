import React, { useState } from 'react';

import { feedbackData } from './data';

import Header from './components/Header'; // ⬅️ NEW: using Header with ThemeToggle built-in
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';
import MapView from './components/MapView';
import SearchBar from './components/SearchBar';

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
      {/* App Header with Theme Toggle */}
      <Header />

      {/* Search Bar */}
      <SearchBar onSearch={handleSearch} />

      {/* Optional: Food Type Filter (Veg / Nonveg / All) can be added here */}

      {/* Map View */}
      <MapView feedbacks={filteredFeedbacks} />

      {/* Feedback List */}
      <div id="feedbackSection">
        <FeedbackList feedbacks={filteredFeedbacks} />
      </div>
       {/* Feedback Form */}
      <FeedbackForm onAdd={addFeedback} />
    </div>
  );
}

export default App;
