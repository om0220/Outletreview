import React, { useEffect, useRef } from 'react';
import '../components/MapView.css';

const MapView = ({ feedbacks }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!window.google || !window.google.maps) {
      console.error("Google Maps JS API not loaded yet.");
      return;
    }

    const map = new window.google.maps.Map(mapRef.current, {
      zoom: 5,
      center: { lat: 21.1458, lng: 79.0882 },
    });

    feedbacks.forEach((f) => {
      if (f.lat && f.lng) {
        new window.google.maps.Marker({
          position: { lat: f.lat, lng: f.lng },
          map,
          title: `${f.outlet} (${f.city})`,
        });
      }
    });
  }, [feedbacks]);

  return (
    <div className="map-wrapper">
      <h2 className="map-heading">📍 Outlet Locations on Map</h2>
      <div ref={mapRef} id="map" className="map-container" />
    </div>
  );
};

export default MapView;
