import React, { useEffect, useRef } from 'react';
import { FaMapSigns } from "react-icons/fa";

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
          position: { lat: parseFloat(f.lat), lng: parseFloat(f.lng) },
          map,
          title: `${f.outlet} (${f.city})`,
        });
      }
    });
  }, [feedbacks]);

  return (
    <div className="w-full px-0 lg:px-0">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-white flex items-center justify-center gap-2">
        <FaMapSigns className="text-orange-600 dark:text-yellow-400" />
        Map View
      </h2>
      <div
        ref={mapRef}
        id="map"
        className="h-72 md:h-80 w-full rounded-none shadow-md border-t border-b border-gray-200 dark:border-gray-700"
      />
    </div>
  );
};

export default MapView;
