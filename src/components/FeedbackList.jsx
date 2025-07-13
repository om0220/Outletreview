import React, { useState } from 'react';
import { BiReset } from "react-icons/bi";

const FeedbackList = ({ feedbacks }) => {
  const [showAll, setShowAll] = useState(false);
  const [ratingFilter, setRatingFilter] = useState('');
  const [localCityFilter, setLocalCityFilter] = useState('');
  const [foodType, setFoodType] = useState('all');

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
    <div className="w-full lg:w-1/2 lg:ml-auto p-4 lg:-mt-[320px]" id="feedbackSection">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
        📝 Customer Food Reviews
      </h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <select
          value={localCityFilter}
          onChange={(e) => setLocalCityFilter(e.target.value)}
          className="px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-white"
        >
          <option value="">🌆 All Cities</option>
          {[...new Set(feedbacks.map((f) => f.city))].map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>

        <select
          value={ratingFilter}
          onChange={(e) => setRatingFilter(e.target.value)}
          className="px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-white"
        >
          <option value="">⭐ All Ratings</option>
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>{r} Stars</option>
          ))}
        </select>

        <div className="flex items-center gap-1">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="hidden peer"
              checked={foodType === "nonveg"}
              onChange={() =>
                setFoodType((prev) => (prev === "nonveg" ? "veg" : "nonveg"))
              }
            />
            <div className="w-10 h-5 bg-gray-300 peer-checked:bg-red-400 rounded-full relative">
              <div className="w-5 h-5 bg-white rounded-full shadow absolute left-0 peer-checked:left-5 transition-all" />
            </div>
          </label>
          <span className="text-xl">{foodType === "nonveg" ? "🍗" : "🥗"}</span>
        </div>

        <button
          onClick={() => {
            setFoodType('all');
            setRatingFilter('');
            setLocalCityFilter('');
          }}
          className="flex items-center gap-1 px-3 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-500"
        >
          <BiReset />
          Reset
        </button>
      </div>

      {filteredFeedbacks.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400">No feedback available</p>
      )}

      {/* Scrollable Feedback List */}
      <div className="max-h-[400px] overflow-y-auto pr-1 space-y-4 custom-scrollbar">
        {visibleFeedbacks.map((f) => {
          const normalizedType = typeof f.type === 'string' ? f.type.toLowerCase() : '';
          return (
            <div key={f.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow bg-white dark:bg-gray-800">
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-yellow-500 ${i < f.rating ? 'opacity-100' : 'opacity-30'}`}
                  >
                    ★
                  </span>
                ))}
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{Number(f.rating).toFixed(1)}</span>
                <span className="ml-2 text-gray-600 dark:text-gray-400">• {f.title || 'Delicious Food'}</span>
              </div>

              <div className="text-gray-800 dark:text-white mb-1">
                Feedback for: <span className="font-semibold">{f.outlet}</span>
              </div>

              <div className="mb-2">
                <span className="inline-block px-2 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                  {normalizedType === 'veg' ? '🟢 Veg' : normalizedType === 'nonveg' ? '🔴 Non-Veg' : '❔ Unknown'}
                </span>
              </div>

              <p className="text-gray-700 dark:text-gray-200 mb-2">{f.message}</p>

              <div className="text-sm text-gray-500 dark:text-gray-400">
                — <strong>{f.name}</strong>, {f.city}
              </div>
            </div>
          );
        })}
      </div>

      {filteredFeedbacks.length > visibleCount && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-4 text-blue-600 dark:text-blue-400 hover:underline"
        >
          {showAll ? "🔼 Show Less" : "🔽 Show More"}
        </button>
      )}
    </div>
  );
};

export default FeedbackList;
