import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AppointmentBooking from '../components/AppointmentBooking';

export default function BookAppointment() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (!storedToken) {
      router.push('/login');
      return;
    }

    setToken(storedToken);
    setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  if (!token) return <div>Loading...</div>;

  return (
    <>
      <Navbar user={user} onLogout={handleLogout} />

      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-8">Book Your Appointment</h1>

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            {success}
            <button onClick={() => router.push('/dashboard')} className="ml-4 underline font-bold">
              View My Appointments
            </button>
          </div>
        )}

        <AppointmentBooking token={token} onSuccess={setSuccess} />
      </div>

      <Footer />
    </>
  );
}
