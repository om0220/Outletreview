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
    setFeedbacks([...feedbacks, { ...feedback, id: Date.now() }]);
  };

  const filteredFeedbacks = cityFilter
    ? feedbacks.filter(f => f.city.toLowerCase().includes(cityFilter.toLowerCase()))
    : feedbacks;

  return (
    <div className="App">
      <h1>🍽️ Food Outlet Feedback App</h1>
      {/* <div className="theme-toggle-wrapper">
    <ThemeToggle />
  </div> */}
      <SearchBar onSearch={setCityFilter} />
      <MapView feedbacks={filteredFeedbacks} />
      <FeedbackForm onAdd={addFeedback} />
      <FeedbackList feedbacks={filteredFeedbacks} />

    </div>
  );
}

export default App;
