import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';

export default function Home() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const userData = JSON.parse(localStorage.getItem('user'));
      setUser(userData);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/');
  };

  return (
    <>
      <Navbar user={user} onLogout={handleLogout} />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="container text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to Prof. Peter Odera's Practice</h1>
          <p className="text-xl mb-8">Professional Psychology, Counseling, and Educational Guidance</p>
          {!user ? (
            <div className="flex gap-4 justify-center">
              <button onClick={() => router.push('/book')} className="btn bg-white text-primary hover:bg-gray-200 text-lg">
                Book an Appointment
              </button>
              <button onClick={() => router.push('/register')} className="btn bg-secondary hover:bg-blue-700 text-lg">
                Register Now
              </button>
            </div>
          ) : (
            <button onClick={() => router.push('/book')} className="btn bg-white text-primary hover:bg-gray-200 text-lg">
              Book an Appointment
            </button>
          )}
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center">
              <h3 className="text-2xl font-bold mb-4">Individual Counseling</h3>
              <p>One-on-one sessions focused on personal challenges and mental health support</p>
            </div>
            <div className="card text-center">
              <h3 className="text-2xl font-bold mb-4">Career Guidance</h3>
              <p>Expert advice on career paths, subject choices, and professional development</p>
            </div>
            <div className="card text-center">
              <h3 className="text-2xl font-bold mb-4">Trauma Therapy</h3>
              <p>Specialized treatment for trauma, PTSD, and stress management</p>
            </div>
            <div className="card text-center">
              <h3 className="text-2xl font-bold mb-4">Educational Psychology</h3>
              <p>Assessment and support for learning challenges</p>
            </div>
            <div className="card text-center">
              <h3 className="text-2xl font-bold mb-4">Family Counseling</h3>
              <p>Support for relationship issues and family dynamics</p>
            </div>
            <div className="card text-center">
              <h3 className="text-2xl font-bold mb-4">Workshops</h3>
              <p>Group workshops and motivational speaking for organizations</p>
            </div>
          </div>
          <div className="text-center mt-12">
            <button onClick={() => router.push('/services')} className="btn btn-primary">
              View All Services
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-gray-100 py-16">
        <div className="container">
          <h2 className="text-4xl font-bold mb-8">About Prof. Peter Odera</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="mb-4 text-lg">Prof. Peter Odera is an accomplished psychologist with over 25 years of experience in educational psychology, counseling, and academic guidance.</p>
              <p className="mb-4 text-lg">He holds a PhD in Psychology from Aligarh Muslim University and has established himself as a leading expert in:</p>
              <ul className="list-disc list-inside space-y-2 mb-6">
                <li>Educational Psychology</li>
                <li>Trauma and PTSD Counseling</li>
                <li>Career Guidance and Counseling</li>
                <li>Mental Health Support</li>
                <li>Personality Assessment</li>
                <li>Stress Management</li>
              </ul>
              <button onClick={() => router.push('/about')} className="btn btn-primary">
                Learn More About Prof. Odera
              </button>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">Qualifications</h3>
              <ul className="space-y-3">
                <li><strong>PhD in Psychology</strong> - Aligarh Muslim University, 1994</li>
                <li><strong>MPhil in Psychology</strong> - Aligarh Muslim University, 1992</li>
                <li><strong>MA in Psychology</strong> - Aligarh Muslim University, 1989</li>
                <li><strong>BA in Psychology, Sociology & English</strong> - 1987</li>
              </ul>
              <hr className="my-6" />
              <h3 className="text-2xl font-bold mb-4">Current Position</h3>
              <p className="text-lg"><strong>Professor of Psychology</strong></p>
              <p>Department of Educational Psychology</p>
              <p>Masinde Muliro University of Science and Technology</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-16">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8">Take the first step towards better mental health and personal growth</p>
          <button onClick={() => router.push('/book')} className="btn bg-white text-primary hover:bg-gray-200 text-lg">
            Book Your First Appointment Now
          </button>
        </div>
      </section>

      <Footer />
    </>
  );
}
