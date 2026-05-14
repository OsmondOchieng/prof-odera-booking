import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-10 py-16 relative z-10">
        <div className="animate-fade-in">
          <h3 className="font-bold mb-4 text-2xl bg-gradient-to-r from-secondary to-emerald-300 bg-clip-text text-transparent">Prof. Peter Odera</h3>
          <p className="text-slate-300 leading-relaxed font-light">Professional psychologist and counselor dedicated to supporting your mental health journey with compassion and expertise.</p>
        </div>
        <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <h3 className="font-bold mb-6 text-lg text-white">Services</h3>
          <ul className="space-y-3">
            <li><a href="/services" className="hover:text-secondary transition-all duration-300 flex items-center text-slate-300 hover:translate-x-1"><span className="mr-2 text-secondary">→</span>Individual Counseling</a></li>
            <li><a href="/services" className="hover:text-secondary transition-all duration-300 flex items-center text-slate-300 hover:translate-x-1"><span className="mr-2 text-secondary">→</span>Career Guidance</a></li>
            <li><a href="/services" className="hover:text-secondary transition-all duration-300 flex items-center text-slate-300 hover:translate-x-1"><span className="mr-2 text-secondary">→</span>Trauma Therapy</a></li>
            <li><a href="/services" className="hover:text-secondary transition-all duration-300 flex items-center text-slate-300 hover:translate-x-1"><span className="mr-2 text-secondary">→</span>Workshops</a></li>
          </ul>
        </div>
        <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <h3 className="font-bold mb-6 text-lg text-white">Contact</h3>
          <div className="space-y-4">
            <p className="flex items-center text-slate-300 hover:text-secondary transition-colors"><span className="mr-3 text-lg">📧</span>podera@mmust.ac.ke</p>
            <p className="flex items-center text-slate-300 hover:text-secondary transition-colors"><span className="mr-3 text-lg">📞</span>+254-XXX-XXXXXX</p>
            <p className="flex items-center text-slate-300 hover:text-secondary transition-colors"><span className="mr-3 text-lg">📍</span>Kakamega, Kenya</p>
          </div>
        </div>
        <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <h3 className="font-bold mb-6 text-lg text-white">Quick Links</h3>
          <ul className="space-y-3">
            <li><a href="/about" className="hover:text-secondary transition-all duration-300 flex items-center text-slate-300 hover:translate-x-1"><span className="mr-2 text-secondary">→</span>About</a></li>
            <li><a href="/testimonials" className="hover:text-secondary transition-all duration-300 flex items-center text-slate-300 hover:translate-x-1"><span className="mr-2 text-secondary">→</span>Testimonials</a></li>
            <li><a href="/academic-profile" className="hover:text-secondary transition-all duration-300 flex items-center text-slate-300 hover:translate-x-1"><span className="mr-2 text-secondary">→</span>Academic Profile</a></li>
            <li><a href="/privacy" className="hover:text-secondary transition-all duration-300 flex items-center text-slate-300 hover:translate-x-1"><span className="mr-2 text-secondary">→</span>Privacy Policy</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-700 mt-12 pt-8 pb-6 relative z-10">
        <p className="text-center text-slate-400 font-light">&copy; 2024 Prof. Peter Odera. All rights reserved. | Made with ❤️ for mental health</p>
      </div>
    </footer>
  );
};

export default Footer;
