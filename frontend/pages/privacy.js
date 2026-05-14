import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Privacy() {
  return (
    <>
      <Navbar />
      <section className="bg-white py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-sm uppercase tracking-[0.35em] text-secondary">Privacy policy</p>
            <h1 className="mt-4 text-5xl font-bold text-slate-900">Your privacy is respected</h1>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">We protect personal and appointment information with secure handling and responsible use.</p>
          </div>
          <div className="space-y-6 text-slate-700 leading-relaxed">
            <p><strong>Data collection:</strong> We collect only information needed to support appointments, user accounts, and communication.</p>
            <p><strong>Security:</strong> Your details are kept confidential and handled with care in accordance with professional standards.</p>
            <p><strong>Contact:</strong> If you have questions about privacy, please contact: podera@mmust.ac.ke.</p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
