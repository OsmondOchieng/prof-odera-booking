import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { appointmentsAPI, profileAPI } from '../lib/api';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (!storedToken) {
      router.push('/login');
      return;
    }

    setToken(storedToken);
    setUser(JSON.parse(storedUser));
    fetchAppointments(storedToken);
  }, []);

  const fetchAppointments = async (token) => {
    try {
      const response = await appointmentsAPI.getMyAppointments(token);
      setAppointments(response.data);
    } catch (err) {
      console.error('Failed to fetch appointments', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  const handleCancelAppointment = async (appointmentId) => {
    if (!confirm('Are you sure you want to cancel this appointment?')) return;

    try {
      await appointmentsAPI.cancel(appointmentId, 'Cancelled by client', token);
      fetchAppointments(token);
      alert('Appointment cancelled successfully');
    } catch (err) {
      alert('Failed to cancel appointment');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Navbar user={user} onLogout={handleLogout} />

      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-8">Your Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <div className="card bg-blue-50">
            <h3 className="text-gray-600 text-sm">Welcome</h3>
            <p className="text-2xl font-bold">{user?.first_name}</p>
          </div>
          <div className="card bg-green-50">
            <h3 className="text-gray-600 text-sm">Total Appointments</h3>
            <p className="text-2xl font-bold">{appointments.length}</p>
          </div>
          <div className="card bg-yellow-50">
            <h3 className="text-gray-600 text-sm">Upcoming</h3>
            <p className="text-2xl font-bold">{appointments.filter(a => a.status === 'confirmed').length}</p>
          </div>
          <div className="card bg-purple-50">
            <h3 className="text-gray-600 text-sm">Email</h3>
            <p className="text-sm font-bold truncate">{user?.email}</p>
          </div>
        </div>

        <div className="card mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Your Appointments</h2>
            <button
              onClick={() => router.push('/book')}
              className="btn btn-primary"
            >
              Book New Appointment
            </button>
          </div>

          {appointments.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No appointments booked yet. <button onClick={() => router.push('/book')} className="text-primary font-bold">Book one now!</button></p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left">Service</th>
                    <th className="px-4 py-2 text-left">Date</th>
                    <th className="px-4 py-2 text-left">Time</th>
                    <th className="px-4 py-2 text-left">Type</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Amount</th>
                    <th className="px-4 py-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map(apt => (
                    <tr key={apt.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2">{apt.service_name}</td>
                      <td className="px-4 py-2">{new Date(apt.appointment_date).toLocaleDateString()}</td>
                      <td className="px-4 py-2">{apt.appointment_time}</td>
                      <td className="px-4 py-2 capitalize">{apt.session_type}</td>
                      <td className="px-4 py-2">
                        <span className={`px-3 py-1 rounded text-white text-xs font-bold ${
                          apt.status === 'confirmed' ? 'bg-green-500' :
                          apt.status === 'pending' ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}>
                          {apt.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-4 py-2">KES {apt.price_kes}</td>
                      <td className="px-4 py-2">
                        {apt.status !== 'cancelled' && (
                          <button
                            onClick={() => handleCancelAppointment(apt.id)}
                            className="btn btn-danger text-xs"
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
