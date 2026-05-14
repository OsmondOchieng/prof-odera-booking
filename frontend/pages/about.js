import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function About() {
  return (
    <>
      <Navbar />
      <section className="bg-white py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-secondary">About the practice</p>
            <h1 className="mt-4 text-5xl font-bold text-slate-900">A modern academic approach to counseling and psychology</h1>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              Prof. Peter Odera combines research-driven practice with compassionate care to deliver counseling, trauma therapy, career guidance and educational psychology across institutions and communities.
            </p>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            <div className="card border border-slate-200 p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Vision</h2>
              <p className="mt-4 text-slate-600">To make academic-quality psychological care accessible, practical and supportive for every client.</p>
            </div>
            <div className="card border border-slate-200 p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Mission</h2>
              <p className="mt-4 text-slate-600">To lead with evidence-based counseling, trauma-informed practice and career development support.</p>
            </div>
            <div className="card border border-slate-200 p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Values</h2>
              <p className="mt-4 text-slate-600">Professionalism, empathy, inclusion, academic rigor and measurable progress.</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
