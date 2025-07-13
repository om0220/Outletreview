import React, { useEffect, useRef } from 'react';

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
    <div className="w-full lg:w-1/2 p-4 overflow-y-auto max-h-[500px]">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-black">
        🗺️ Map View
      </h2>
      <div
        ref={mapRef}
        id="map"
        className="h-72 lg:h-60 w-full rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
      />
    </div>
  );
};

export default MapView;
