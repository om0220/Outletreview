import React, { useState } from 'react';
import '../components/FeedbackForm.css';
import { FaStar } from 'react-icons/fa'; // Star icon from react-icons

const FeedbackForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    name: "",
    city: "",
    outlet: "",
    rating: 0,
    message: "",
    lat: "",
    lng: "",
    type: "",
  });

  const [hover, setHover] = useState(null); // for star hover

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setForm((prev) => ({
            ...prev,
            lat: position.coords.latitude.toFixed(6),
            lng: position.coords.longitude.toFixed(6),
          }));
        },
        () => alert("⚠️ Please allow location access.")
      );
    } else {
      alert("❌ Geolocation not supported.");
    }
  };

  const handleStarClick = (index) => {
    setForm((prev) => ({ ...prev, rating: index + 1 }));
  };

  const handleToggleType = () => {
    setForm((prev) => ({
      ...prev,
      type: prev.type === "veg" ? "nonveg" : "veg",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, city, outlet, rating, message, lat, lng, type } = form;

    if (name && city && outlet && lat && lng && type && rating > 0) {
      const feedbackData = {
        name,
        city,
        outlet,
        rating,
        message,
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        type,
      };

      console.log("📥 Feedback Submitted:", feedbackData); // ✅ log to console
      onAdd(feedbackData); // pass to parent if needed

      setForm({
        name: "",
        city: "",
        outlet: "",
        rating: 0,
        message: "",
        lat: "",
        lng: "",
        type: "",
      });
      setHover(null);
    } else {
      alert("⚠️ Please fill all required fields.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="feedback-form">
      <h2>📝 Submit Your Food Feedback</h2>

      <input name="name" value={form.name} onChange={handleChange} placeholder="👤 Your Name" required />
      <input name="city" value={form.city} onChange={handleChange} placeholder="🌆 City" required />
      <input name="outlet" value={form.outlet} onChange={handleChange} placeholder="🏪 Outlet Name" required />

      <textarea
        name="message"
        value={form.message}
        onChange={handleChange}
        placeholder="💬 Your feedback..."
      />
{/* ⭐ Star Rating Section */}
      <div className="star-rating" onMouseLeave={() => setHover(null)}>
        <label >Rating:</label>
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            size={28}
            className={`star ${i < (hover || form.rating) ? 'filled' : ''}`}
            onClick={() => handleStarClick(i)}
            onMouseEnter={() => setHover(i + 1)}
          />
        ))}
      </div>
      {/* Toggle for Veg / Non-Veg */}
      <div className="toggle-type-section">
        <label className="toggle-label">
          <span>{form.type === "veg" ? "🥦 Veg" : "🍗 Non-Veg"}</span>
          <div className="pure-switch">
            <input
              type="checkbox"
              checked={form.type === "nonveg"}
              onChange={handleToggleType}
            />
            <span className="slider"></span>
          </div>
        </label>
      </div>

      <div className="location-section">
        <input name="lat" value={form.lat} onChange={handleChange} placeholder="📍 Latitude" required />
        <input name="lng" value={form.lng} onChange={handleChange} placeholder="📍 Longitude" required />
      </div>
      <div className='buttons'>
        <button type="button" className="use-location" onClick={handleLocation}>📌 Use My Location</button>
        <button type="submit" className="submit-btn">✅ Submit Feedback</button>
      </div>
    </form>
  );
};

export default FeedbackForm;
