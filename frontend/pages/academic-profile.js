import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AcademicProfile() {
  return (
    <>
      <Navbar />
      <section className="bg-white py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-sm uppercase tracking-[0.35em] text-secondary">Academic Profile</p>
              <h1 className="mt-4 text-5xl font-bold text-slate-900">Prof. Peter Odera</h1>
              <p className="mt-4 text-lg text-slate-600">Psychologist, educator and researcher with extensive experience in counseling, trauma therapy, career guidance and educational psychology.</p>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-start">
              <div className="space-y-6">
                <div className="card border border-slate-200 p-8">
                  <h2 className="text-2xl font-semibold text-slate-900">Academic credentials</h2>
                  <ul className="mt-4 list-disc list-inside space-y-3 text-slate-600">
                    <li>PhD in Psychology, Aligarh Muslim University</li>
                    <li>Over 25 years in educational psychology and counseling</li>
                    <li>Published research in trauma, learning and career development</li>
                  </ul>
                </div>
                <div className="card border border-slate-200 p-8">
                  <h2 className="text-2xl font-semibold text-slate-900">Professional focus</h2>
                  <p className="mt-4 text-slate-600">Specialized in trauma-informed therapy, academic performance support, career planning, family counseling and institutional training.</p>
                </div>
              </div>

              <div className="card border border-slate-200 p-8 bg-slate-50">
                <h2 className="text-2xl font-semibold text-slate-900">Download Full CV</h2>
                <p className="mt-4 text-slate-600">Access a complete academic and professional portfolio with research, teaching and counseling credentials.</p>
                <a href="/CV.txt" download className="mt-8 inline-block btn btn-secondary">
                  Download Full CV
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
