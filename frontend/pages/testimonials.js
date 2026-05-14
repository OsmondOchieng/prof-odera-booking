import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const testimonials = [
  {
    quote: 'A compassionate and expert guide through my recovery process, with a strong academic base.',
    name: 'Esther M.',
    role: 'Graduate Student',
  },
  {
    quote: 'His career guidance made my goals clear and actionable. I felt supported every step of the way.',
    name: 'Samuel N.',
    role: 'Young Professional',
  },
  {
    quote: 'Professional, reassuring, and deeply knowledgeable. An excellent choice for trauma and education support.',
    name: 'Grace A.',
    role: 'Educator',
  },
];

export default function Testimonials() {
  return (
    <>
      <Navbar />
      <section className="bg-slate-50 py-24">
        <div className="container">
          <div className="text-center mb-14">
            <p className="text-sm uppercase tracking-[0.35em] text-secondary">What clients say</p>
            <h1 className="mt-4 text-5xl font-bold text-slate-900">Testimonials</h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Real feedback from individuals and professionals who have worked with Prof. Odera.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {testimonials.map((item) => (
              <div key={item.name} className="card border border-slate-200 p-8">
                <p className="text-slate-700 leading-relaxed">“{item.quote}”</p>
                <div className="mt-8">
                  <p className="font-semibold text-slate-900">{item.name}</p>
                  <p className="text-sm text-slate-500">{item.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
