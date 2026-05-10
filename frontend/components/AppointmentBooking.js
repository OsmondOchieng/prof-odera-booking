import React, { useState, useEffect } from 'react';
import { appointmentsAPI, servicesAPI } from '../lib/api';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const AppointmentBooking = ({ token, onSuccess }) => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [sessionType, setSessionType] = useState('online');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await servicesAPI.getAll();
        setServices(response.data);
      } catch (err) {
        setError('Failed to load services');
      }
    };
    fetchServices();
  }, []);

  useEffect(() => {
    const fetchSlots = async () => {
      if (selectedService) {
        try {
          const dateStr = selectedDate.toISOString().split('T')[0];
          const response = await appointmentsAPI.getAvailableSlots(dateStr, selectedService.id);
          setAvailableSlots(response.data.slots);
        } catch (err) {
          setError('Failed to load available slots');
        }
      }
    };
    fetchSlots();
  }, [selectedService, selectedDate]);

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!selectedService || !selectedDate || !selectedTime) {
      setError('Please select all required fields');
      return;
    }

    setLoading(true);
    try {
      const dateStr = selectedDate.toISOString().split('T')[0];
      await appointmentsAPI.book({
        service_id: selectedService.id,
        appointment_date: dateStr,
        appointment_time: selectedTime,
        session_type: sessionType,
        location: sessionType === 'online' ? 'Online' : location,
        notes
      }, token);

      onSuccess('Appointment booked successfully!');
      setSelectedService(null);
      setSelectedDate(new Date());
      setSelectedTime(null);
      setNotes('');
    } catch (err) {
      setError(err.response?.data?.error || 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Book an Appointment</h2>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      <form onSubmit={handleBooking} className="space-y-6">
        {/* Service Selection */}
        <div>
          <label className="block text-sm font-medium mb-2">Select Service *</label>
          <select
            value={selectedService?.id || ''}
            onChange={(e) => setSelectedService(services.find(s => s.id == e.target.value))}
            className="input"
            required
          >
            <option value="">Choose a service...</option>
            {services.map(service => (
              <option key={service.id} value={service.id}>
                {service.name} - KES {service.price_kes} ({service.duration_minutes} min)
              </option>
            ))}
          </select>
        </div>

        {/* Date Selection */}
        {selectedService && (
          <div>
            <label className="block text-sm font-medium mb-2">Select Date *</label>
            <Calendar
              value={selectedDate}
              onChange={setSelectedDate}
              minDate={new Date()}
              className="w-full"
            />
          </div>
        )}

        {/* Time Selection */}
        {selectedService && availableSlots.length > 0 && (
          <div>
            <label className="block text-sm font-medium mb-2">Select Time *</label>
            <div className="grid grid-cols-4 gap-2">
              {availableSlots.map(slot => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedTime(slot)}
                  className={`p-2 rounded border ${selectedTime === slot ? 'bg-primary text-white border-primary' : 'border-gray-300'}`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Session Type */}
        <div>
          <label className="block text-sm font-medium mb-2">Session Type *</label>
          <div className="flex gap-4">
            <label>
              <input
                type="radio"
                name="sessionType"
                value="online"
                checked={sessionType === 'online'}
                onChange={(e) => setSessionType(e.target.value)}
              />
              <span className="ml-2">Online</span>
            </label>
            <label>
              <input
                type="radio"
                name="sessionType"
                value="physical"
                checked={sessionType === 'physical'}
                onChange={(e) => setSessionType(e.target.value)}
              />
              <span className="ml-2">Physical</span>
            </label>
          </div>
        </div>

        {/* Location */}
        {sessionType === 'physical' && (
          <div>
            <label className="block text-sm font-medium mb-2">Location *</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="input"
              placeholder="Enter meeting location"
              required
            />
          </div>
        )}

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium mb-2">Additional Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="input"
            placeholder="Any additional information..."
            rows={4}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full"
        >
          {loading ? 'Booking...' : 'Book Appointment'}
        </button>
      </form>
    </div>
  );
};

export default AppointmentBooking;
