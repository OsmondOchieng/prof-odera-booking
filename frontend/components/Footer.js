import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-primary text-white mt-12 py-8">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold mb-4">Prof. Peter Odera</h3>
          <p>Professional psychologist and counselor dedicated to supporting your mental health journey.</p>
        </div>
        <div>
          <h3 className="font-bold mb-4">Services</h3>
          <ul className="space-y-2">
            <li><a href="/services" className="hover:text-gray-300">Individual Counseling</a></li>
            <li><a href="/services" className="hover:text-gray-300">Career Guidance</a></li>
            <li><a href="/services" className="hover:text-gray-300">Trauma Therapy</a></li>
            <li><a href="/services" className="hover:text-gray-300">Workshops</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4">Contact</h3>
          <p>Email: podera@mmust.ac.ke</p>
          <p>Phone: +254-XXX-XXXXXX</p>
          <p>Location: Kakamega, Kenya</p>
        </div>
        <div>
          <h3 className="font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/about" className="hover:text-gray-300">About</a></li>
            <li><a href="/testimonials" className="hover:text-gray-300">Testimonials</a></li>
            <li><a href="/blog" className="hover:text-gray-300">Blog</a></li>
            <li><a href="/privacy" className="hover:text-gray-300">Privacy Policy</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-8 text-center">
        <p>&copy; 2024 Prof. Peter Odera. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
