import React, { useState } from 'react';
import '../components/FeedbackForm.css';

const FeedbackForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    name: "",
    city: "",
    outlet: "",
    rating: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          alert("📍 Location fetched successfully, but coordinates are not used.");
          // In future, use position.coords.latitude & longitude if needed
        },
        (error) => {
          alert("⚠️ Unable to access location. Please allow location access.");
        }
      );
    } else {
      alert("❌ Geolocation is not supported by your browser.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, city, outlet, rating, message } = form;

    if (name && city && outlet && rating >= 1 && rating <= 5) {
      onAdd({
        ...form,
        rating: parseInt(rating),
        id: Date.now()
      });

      setForm({
        name: "",
        city: "",
        outlet: "",
        rating: "",
        message: "",
      });

      alert("✅ Feedback submitted successfully!");
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

      <div className="location-section">
        <button type="button" className="use-location" onClick={handleLocation}>
          📌 Use My Location
        </button>
      </div>

      <button type="submit">✅ Submit Feedback</button>
    </form>
  );
};

export default FeedbackForm;
