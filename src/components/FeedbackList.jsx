import React, { useState } from 'react';
import './FeedbackList.css';

const FeedbackList = ({ feedbacks }) => {
  const [showAll, setShowAll] = useState(false);
  const [expanded, setExpanded] = useState({});
  const [cityFilter, setCityFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const visibleCount = 3;

  const filteredFeedbacks = feedbacks.filter((f) =>
    (cityFilter ? f.city === cityFilter : true) &&
    (ratingFilter ? f.rating === parseInt(ratingFilter) : true)
  );

  const visibleFeedbacks = showAll
    ? filteredFeedbacks
    : filteredFeedbacks.slice(0, visibleCount);

  return (
    <div className="feedback-list">
      <h2>📝 Customer Food Reviews</h2>

      <div className="filters">
        <select onChange={(e) => setCityFilter(e.target.value)} value={cityFilter}>
          <option value="">🌆 All Cities</option>
          {[...new Set(feedbacks.map((f) => f.city))].map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>

        <select onChange={(e) => setRatingFilter(e.target.value)} value={ratingFilter}>
          <option value="">⭐ All Ratings</option>
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>{r} Stars</option>
          ))}
        </select>
      </div>

      {filteredFeedbacks.length === 0 && <p>No feedback available</p>}

      {visibleFeedbacks.map((f) => (
        <div key={f.id} className="feedback-card">
          {/* Rating Row */}
          <div className="rating-row">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`star ${i < f.rating ? 'filled' : ''}`}>★</span>
            ))}
            <span className="rating-score">{f.rating.toFixed(1)}</span>
            <span className="rating-text">• {f.title || 'Delicious Food'}</span>
          </div>

          {/* Food Outlet Info */}
          <div className="product-info">
            Feedback for: <span className="dim-text">{f.outlet}</span>
          </div>

          {/* Message */}
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

          {/* Reviewer */}
          <div className="user-meta">
            <p><strong>{f.name}</strong>, {f.city}</p>
          </div>

          {/* Action Buttons */}
          <div className="feedback-actions">
            <button className="helpful-btn">👍 Helpful</button>
            <button className="not-helpful-btn">👎</button>
          </div>

          {/* Footer */}
          <div className="verified">✔️ Verified Diner · {f.date || 'Recently'}</div>
        </div>
      ))}

      {filteredFeedbacks.length > visibleCount && (
        <button className="toggle-btn" onClick={() => setShowAll(!showAll)}>
          {showAll ? "🔼 Show Less" : "🔽 Show More"}
        </button>
      )}
    </div>
  );
};

export default FeedbackList;
