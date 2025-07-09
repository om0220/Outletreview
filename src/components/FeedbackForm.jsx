import React, { useState } from 'react';
import '../components/FeedbackForm.css';

const FeedbackForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    name: "",
    city: "",
    outlet: "",
    rating: "",
    message: "",
    lat: "",
    lng: "",
    type: "", // ✅ Renamed from variety to type
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
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
        () => {
          alert("⚠️ Unable to access location. Please allow location access.");
        }
      );
    } else {
      alert("❌ Geolocation is not supported by your browser.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, city, outlet, rating, message, lat, lng, type } = form;

    if (name && city && outlet && lat && lng && type && rating >= 1 && rating <= 5) {
      const feedbackData = {
        name,
        city,
        outlet,
        rating: parseInt(rating),
        message,
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        type: type.toLowerCase(), // ✅ Normalize to 'veg' or 'nonveg'
      };

      console.log("📥 Feedback submitted:", feedbackData);
      onAdd(feedbackData);

      // Reset form
      setForm({
        name: "",
        city: "",
        outlet: "",
        rating: "",
        message: "",
        lat: "",
        lng: "",
        type: "",
      });
    } else {
      alert("⚠️ Please fill all fields correctly.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="feedback-form">
      <h2>📝 Submit Your Food Feedback</h2>

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="👤 Your Name"
        required
      />
      <input
        name="city"
        value={form.city}
        onChange={handleChange}
        placeholder="🌆 City"
        required
      />
      <input
        name="outlet"
        value={form.outlet}
        onChange={handleChange}
        placeholder="🏪 Outlet Name"
        required
      />
      <input
        name="rating"
        type="number"
        min="1"
        max="5"
        required
        value={form.rating}
        onChange={handleChange}
        placeholder="⭐ Rating (1-5)"
      />
      <textarea
        name="message"
        value={form.message}
        onChange={handleChange}
        placeholder="💬 Your feedback..."
      />

      {/* ✅ Veg / Non-Veg Dropdown */}
      <select
        name="type"
        value={form.type}
        onChange={handleChange}
        required
      >
        <option value="">🍽️ Select Food Type</option>
        <option value="veg">🥦 Veg</option>
        <option value="nonveg">🍗 Non-Veg</option>
      </select>

      <div className="location-section">
        <input
          name="lat"
          value={form.lat}
          onChange={handleChange}
          placeholder="📍 Latitude"
          required
        />
        <input
          name="lng"
          value={form.lng}
          onChange={handleChange}
          placeholder="📍 Longitude"
          required
        />
        <button type="button" className="use-location" onClick={handleLocation}>
          📌 Use My Location
        </button>
      </div>

      <button type="submit">✅ Submit Feedback</button>
    </form>
  );
};

export default FeedbackForm;
