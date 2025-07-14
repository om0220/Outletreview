import React, { useState } from 'react';

import { feedbackData } from './data';

import Header from './components/Header';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';
import MapView from './components/MapView';
import SearchBar from './components/SearchBar';
import Footer from './components/Footer';

function App() {
  const [feedbacks, setFeedbacks] = useState(feedbackData);
  const [cityFilter, setCityFilter] = useState('');
  const [foodType, setFoodType] = useState('all');

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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <Header />

      {/* Search */}
      <SearchBar onSearch={handleSearch} />

      {/* Map View */}
      <div className="w-full p-4" style={{ minHeight: '260px' }}>
        <MapView feedbacks={filteredFeedbacks} />
      </div>

      {/* Feedback List */}
      <div className="relative z-10" id="feedbackSection">
        <FeedbackList feedbacks={filteredFeedbacks} />
      </div>

      {/* Spacing for mobile */}
      <div className="h-12 lg:hidden" />

      {/* Feedback Form */}
      <div className="relative z-10">
        <FeedbackForm onAdd={addFeedback} />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
