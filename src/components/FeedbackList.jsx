import React, { useState } from 'react';
import './FeedbackList.css';

const FeedbackList = ({ feedbacks }) => {
  const [showAll, setShowAll] = useState(false);
  const [expanded, setExpanded] = useState({});
  const [ratingFilter, setRatingFilter] = useState('');
  const [localCityFilter, setLocalCityFilter] = useState('');
  const [foodType, setFoodType] = useState('all'); // 'veg' | 'nonveg' | 'all'

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const visibleCount = 3;

  const filteredFeedbacks = feedbacks.filter((f) =>
    (localCityFilter ? f.city === localCityFilter : true) &&
    (ratingFilter ? parseInt(f.rating) === parseInt(ratingFilter) : true) &&
    (foodType === 'all' || (f.type && f.type.toLowerCase() === foodType))
  );

  const visibleFeedbacks = showAll
    ? filteredFeedbacks
    : filteredFeedbacks.slice(0, visibleCount);

  return (
    <div className="feedback-list" id="feedbackSection">
      <h2>📝 Customer Food Reviews</h2>

      {/* Filters */}
      <div className="filters">
        {/* City Filter */}
        <select onChange={(e) => setLocalCityFilter(e.target.value)} value={localCityFilter}>
          <option value="">🌆 All Cities</option>
          {[...new Set(feedbacks.map((f) => f.city))].map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>

        {/* Rating Filter */}
        <select onChange={(e) => setRatingFilter(e.target.value)} value={ratingFilter}>
          <option value="">⭐ All Ratings</option>
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>{r} Stars</option>
          ))}
        </select>

        {/* Veg / Non-Veg Toggle */}
        <div className="filter-toggle">
          <label className="pure-switch">
            <input
              type="checkbox"
              checked={foodType === "nonveg"}
              onChange={() =>
                setFoodType((prev) => (prev === "nonveg" ? "veg" : "nonveg"))
              }
            />
            <span className="slider" />
          </label>
          <span>{foodType === "nonveg" ? "🍗 Non-Veg" : "🥗 Veg"}</span>
        </div>

        {/* Reset Button */}
        <button onClick={() => {
          setFoodType('all');
          setRatingFilter('');
          setLocalCityFilter('');
        }}>
          🔄 Reset Filters
        </button>
      </div>

      {/* No Results */}
      {filteredFeedbacks.length === 0 && <p>No feedback available</p>}

      {/* Feedback Cards */}
      {visibleFeedbacks.map((f) => {
        const normalizedType = typeof f.type === 'string' ? f.type.toLowerCase() : '';
        return (
          <div key={f.id} className="feedback-card">
            {/* Rating Row */}
            <div className="rating-row">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`star ${i < f.rating ? 'filled' : ''}`}>★</span>
              ))}
              <span className="rating-score">{Number(f.rating).toFixed(1)}</span>
              <span className="rating-text">• {f.title || 'Delicious Food'}</span>
            </div>

            {/* Outlet Info */}
            <div className="product-info">
              Feedback for: <span className="dim-text">{f.outlet}</span>
            </div>

            {/* Food Type */}
            <div className="food-type-label">
              {normalizedType === 'veg' ? '🟢 Veg' : normalizedType === 'nonveg' ? '🔴 Non-Veg' : '❔ Unknown'}
            </div>

            {/* Expandable Message */}
            <div className="message">
              {!expanded[f.id] ? (
                <p onClick={() => toggleExpand(f.id)} className="expand-message">
                  {f.message.length > 50 ? f.message.slice(0, 40) + "..." : f.message}
                  <span className="read-more"> Read more</span>
                </p>
              ) : (
                <p onClick={() => toggleExpand(f.id)} className="expand-message">
                  {f.message}
                  <span className="read-less"> Show less</span>
                </p>
              )}
            </div>

            {/* Reviewer Info */}
            <div className="user-meta">
              <p><strong>{f.name}</strong>, {f.city}</p>
            </div>

            {/* Feedback Buttons */}
            <div className="feedback-actions">
              <button className="helpful-btn">👍 Helpful</button>
              <button className="not-helpful-btn">👎</button>
            </div>

            {/* Footer */}
            <div className="verified">✔️ Verified Diner · {f.date || 'Recently'}</div>
          </div>
        );
      })}

      {/* Toggle More/Less */}
      {filteredFeedbacks.length > visibleCount && (
        <button className="toggle-btn" onClick={() => setShowAll(!showAll)}>
          {showAll ? "🔼 Show Less" : "🔽 Show More"}
        </button>
      )}
    </div>
  );
};

export default FeedbackList;
