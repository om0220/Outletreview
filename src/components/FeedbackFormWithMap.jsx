// import React, { useEffect, useRef, useState } from 'react';
// import { FaStar } from 'react-icons/fa';
// import { SlLocationPin } from 'react-icons/sl';

// const FeedbackFormWithMap = ({ onAdd, feedbacks }) => {
//   const mapRef = useRef(null);
//   const [form, setForm] = useState({
//     name: '',
//     city: '',
//     outlet: '',
//     rating: 0,
//     message: '',
//     lat: '',
//     lng: '',
//     type: '',
//   });

//   const [hover, setHover] = useState(null);

//   // Load Google Map
//   useEffect(() => {
//     if (!window.google || !window.google.maps) {
//       console.error('Google Maps JS API not loaded.');
//       return;
//     }

//     const map = new window.google.maps.Map(mapRef.current, {
//       zoom: 5,
//       center: { lat: 21.1458, lng: 79.0882 },
//     });

//     feedbacks.forEach((f) => {
//       if (f.lat && f.lng) {
//         new window.google.maps.Marker({
//           position: { lat: parseFloat(f.lat), lng: parseFloat(f.lng) },
//           map,
//           title: `${f.outlet} (${f.city})`,
//         });
//       }
//     });
//   }, [feedbacks]);

//   // Handlers
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setForm((prev) => ({
//             ...prev,
//             lat: position.coords.latitude.toFixed(6),
//             lng: position.coords.longitude.toFixed(6),
//           }));
//         },
//         () => alert('⚠️ Please allow location access.')
//       );
//     } else {
//       alert('❌ Geolocation not supported.');
//     }
//   };

//   const handleStarClick = (index) => {
//     setForm((prev) => ({ ...prev, rating: index + 1 }));
//   };

//   const handleToggleType = () => {
//     setForm((prev) => ({
//       ...prev,
//       type: prev.type === 'veg' ? 'nonveg' : 'veg',
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const { name, city, outlet, rating, message, lat, lng, type } = form;

//     if (name && city && outlet && lat && lng && type && rating > 0) {
//       const feedbackData = {
//         name,
//         city,
//         outlet,
//         rating,
//         message,
//         lat: parseFloat(lat),
//         lng: parseFloat(lng),
//         type,
//       };

//       onAdd(feedbackData);

//       setForm({
//         name: '',
//         city: '',
//         outlet: '',
//         rating: 0,
//         message: '',
//         lat: '',
//         lng: '',
//         type: '',
//       });
//       setHover(null);
//     } else {
//       alert('⚠️ Please fill all required fields.');
//     }
//   };

//   return (
//     <div className="w-full flex flex-col gap-6 px-4 mt-10" id="feedbackFormWithMap">
//       {/* Map View */}
//       <div className="w-full h-[400px]">
//         <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
//           🗺️ Map View
//         </h2>
//         <div
//           ref={mapRef}
//           id="map"
//           className="h-full w-full rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
//         />
//       </div>

//       {/* Feedback Form */}
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 shadow-md rounded-xl space-y-5"
//       >
//         <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
//           📝 Submit Your Food Feedback
//         </h2>

//         <input
//           name="name"
//           value={form.name}
//           onChange={handleChange}
//           placeholder="👤 Your Name"
//           required
//           className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-700"
//         />
//         <input
//           name="city"
//           value={form.city}
//           onChange={handleChange}
//           placeholder="🌆 City"
//           required
//           className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-700"
//         />
//         <input
//           name="outlet"
//           value={form.outlet}
//           onChange={handleChange}
//           placeholder="🏪 Outlet Name"
//           required
//           className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-700"
//         />

//         <textarea
//           name="message"
//           value={form.message}
//           onChange={handleChange}
//           placeholder="💬 Your feedback..."
//           className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-700"
//         />

//         {/* Star Rating */}
//         <div className="flex flex-col items-start">
//           <label className="mb-1 text-gray-700 dark:text-white">Rating:</label>
//           <div className="flex gap-1" onMouseLeave={() => setHover(null)}>
//             {[...Array(5)].map((_, i) => (
//               <FaStar
//                 key={i}
//                 size={28}
//                 className={`cursor-pointer ${
//                   i < (hover || form.rating)
//                     ? 'text-yellow-400'
//                     : 'text-gray-300 dark:text-gray-600'
//                 }`}
//                 onClick={() => handleStarClick(i)}
//                 onMouseEnter={() => setHover(i + 1)}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Veg/Non-Veg Toggle */}
//         <div className="flex items-center justify-between">
//           <span className="text-xl">
//             {form.type === 'veg' ? '🥦 Veg' : '🍗 Non-Veg'}
//           </span>
//           <label className="relative inline-flex items-center cursor-pointer">
//             <input
//               type="checkbox"
//               checked={form.type === 'nonveg'}
//               onChange={handleToggleType}
//               className="sr-only peer"
//             />
//             <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-checked:bg-red-500 rounded-full peer dark:bg-gray-700"></div>
//             <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5"></div>
//           </label>
//         </div>

//         {/* Location Inputs */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <input
//             name="lat"
//             value={form.lat}
//             onChange={handleChange}
//             placeholder="📍 Latitude"
//             required
//             className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-700"
//           />
//           <input
//             name="lng"
//             value={form.lng}
//             onChange={handleChange}
//             placeholder="📍 Longitude"
//             required
//             className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-700"
//           />
//         </div>

//         {/* Buttons */}
//         <div className="flex flex-col sm:flex-row justify-between gap-4">
//           <button
//             type="button"
//             onClick={handleLocation}
//             className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//           >
//             <SlLocationPin /> Use My Location
//           </button>
//           <button
//             type="submit"
//             className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//           >
//             Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default FeedbackFormWithMap;
