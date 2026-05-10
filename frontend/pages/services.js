import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { servicesAPI } from '../lib/api';
import { useRouter } from 'next/router';

export default function Services() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await servicesAPI.getAll();
      setServices(response.data);
    } catch (err) {
      console.error('Failed to fetch services', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  if (loading) return <div>Loading...</div>;

  // Group services by category
  const categories = [...new Set(services.map(s => s.category))];

  return (
    <>
      <Navbar user={user} onLogout={handleLogout} />

      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-4">Our Services</h1>
        <p className="text-lg text-gray-600 mb-12">Professional counseling and psychology services tailored to your needs</p>

        {categories.map(category => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-primary border-b pb-3">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.filter(s => s.category === category).map(service => (
                <div key={service.id} className="card border-l-4 border-primary">
                  <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Duration: {service.duration_minutes} minutes</p>
                      <p className="text-2xl font-bold text-primary">KES {service.price_kes}</p>
                    </div>
                    <button
                      onClick={() => {
                        if (!user) {
                          router.push('/login');
                        } else {
                          router.push('/book');
                        }
                      }}
                      className="btn btn-primary"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="bg-primary text-white p-8 rounded-lg mt-12">
          <h2 className="text-2xl font-bold mb-4">Ready to Book?</h2>
          <p className="mb-6">Select any service above and book your appointment now.</p>
          <button
            onClick={() => router.push(user ? '/book' : '/login')}
            className="btn bg-white text-primary hover:bg-gray-200"
          >
            Get Started
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}
