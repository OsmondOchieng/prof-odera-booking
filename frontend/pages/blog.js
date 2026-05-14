'use client';

import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Blog() {
  return (
    <>
      <Navbar />
      <section className="bg-slate-50 py-24">
        <div className="container">
          <div className="text-center mb-14">
            <p className="text-sm uppercase tracking-[0.35em] text-secondary">Insights & updates</p>
            <h1 className="mt-4 text-5xl font-bold text-slate-900">From the practice</h1>
            <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">Academic reflections, counseling tips, and professional psychology guidance for students, families and organizations.</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            <article className="card border border-slate-200 p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Building resilience after trauma</h2>
              <p className="mt-4 text-slate-600">Explore evidence-informed practices for recovery, coping, and long-term wellbeing.</p>
            </article>
            <article className="card border border-slate-200 p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Career planning for students</h2>
              <p className="mt-4 text-slate-600">How to choose the right academic path and transition confidently into professional life.</p>
            </article>
            <article className="card border border-slate-200 p-8">
              <h2 className="text-2xl font-semibold text-slate-900">The role of educational psychology</h2>
              <p className="mt-4 text-slate-600">Practical approaches to improve learning, motivation, and classroom success.</p>
            </article>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
