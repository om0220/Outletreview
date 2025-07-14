import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 mt-12">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* About Section */}
        <div>
          <h3 className="text-xl font-semibold mb-3">About Us</h3>
          <p className="text-sm leading-relaxed text-gray-300">
            We help foodies find the best local outlets by collecting real-time customer feedback and reviews. Eat smart, eat local!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#feedbackFormSection" className="hover:underline text-gray-300 hover:text-white">Submit Feedback</a></li>
            <li><a href="#feedbackSection" className="hover:underline text-gray-300 hover:text-white">View Reviews</a></li>
            <li><a href="#mapSection" className="hover:underline text-gray-300 hover:text-white">Find Outlets</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Contact</h3>
          <ul className="text-sm space-y-2 text-gray-300">
            <li>Email: support@foodfinder.com</li>
            <li>Phone: +91-9876543210</li>
            <li>Address: Mumbai, India</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <a href="#" aria-label="Facebook" className="hover:text-blue-500 text-gray-300"><FaFacebook size={20} /></a>
            <a href="#" aria-label="Twitter" className="hover:text-sky-400 text-gray-300"><FaTwitter size={20} /></a>
            <a href="#" aria-label="Instagram" className="hover:text-pink-500 text-gray-300"><FaInstagram size={20} /></a>
            <a href="#" aria-label="GitHub" className="hover:text-gray-400 text-gray-300"><FaGithub size={20} /></a>
          </div>
        </div>

      </div>

      <div className="text-center text-sm text-gray-500 mt-8">
        © {new Date().getFullYear()} FoodFinder. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
