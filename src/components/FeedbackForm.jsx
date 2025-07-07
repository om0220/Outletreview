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
  });

  const handleChange = e => {
    const { name, value } = e.target;

    if (name === "rating") {
      const num = parseInt(value);
      if (num < 1 || num > 5) return;
    }

    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          setForm(prev => ({
            ...prev,
            lat: pos.coords.latitude.toFixed(6),
            lng: pos.coords.longitude.toFixed(6),
          }));
        },
        err => {
          alert("Location access denied or unavailable.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { name, city, outlet, lat, lng } = form;

    if (name && city && outlet && lat && lng) {
      onAdd({ ...form, lat: parseFloat(lat), lng: parseFloat(lng) });
      setForm({
        name: "",
        city: "",
        outlet: "",
        rating: "",
        message: "",
        lat: "",
        lng: "",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="feedback-form">
      <h2>📝 Submit Your Food Feedback</h2>

      <input name="name" value={form.name} onChange={handleChange} placeholder="👤 Your Name" required />
      <input name="city" value={form.city} onChange={handleChange} placeholder="🌆 City" required />
      <input name="outlet" value={form.outlet} onChange={handleChange} placeholder="🏪 Outlet Name" required />
      <input name="rating" type="number" min="1" max="5" value={form.rating} onChange={handleChange} placeholder="⭐ Rating (1-5)" />
      <textarea name="message" value={form.message} onChange={handleChange} placeholder="💬 Your feedback..." />

      <div className="location-section">
        <input name="lat" value={form.lat} onChange={handleChange} placeholder="📍 Latitude" required />
        <input name="lng" value={form.lng} onChange={handleChange} placeholder="📍 Longitude" required />
        <button type="button" className="use-location" onClick={handleLocation}>📌 Use My Location</button>
      </div>

      <button type="submit">✅ Submit Feedback</button>
    </form>
  );
};

export default FeedbackForm;
