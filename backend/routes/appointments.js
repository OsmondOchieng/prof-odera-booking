const express = require('express');
const pool = require('../config/database');
const { authMiddleware } = require('../middleware/auth');
const nodemailer = require('nodemailer');

const router = express.Router();

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Get available time slots for a specific date
router.get('/available-slots/:date/:service_id', async (req, res) => {
  try {
    const { date, service_id } = req.params;

    // Get service duration
    const serviceResult = await pool.query('SELECT duration_minutes FROM services WHERE id = $1', [service_id]);
    if (serviceResult.rows.length === 0) {
      return res.status(404).json({ error: 'Service not found' });
    }

    const duration = serviceResult.rows[0].duration_minutes;
    const dayOfWeek = new Date(date).getDay();

    // Get availability for the day
    const availResult = await pool.query('SELECT * FROM availability WHERE day_of_week = $1', [dayOfWeek]);
    if (availResult.rows.length === 0) {
      return res.json({ slots: [] });
    }

    const avail = availResult.rows[0];
    const [startHour, startMin] = avail.start_time.split(':');
    const [endHour, endMin] = avail.end_time.split(':');

    // Get booked appointments for the day
    const bookedResult = await pool.query(
      'SELECT appointment_time FROM appointments WHERE appointment_date = $1 AND status != $2',
      [date, 'cancelled']
    );

    const bookedTimes = bookedResult.rows.map(row => row.appointment_time);

    // Generate available slots
    const slots = [];
    let currentTime = new Date(`${date}T${startHour}:${startMin}`);
    const endTime = new Date(`${date}T${endHour}:${endMin}`);

    while (currentTime < endTime) {
      const timeStr = currentTime.toTimeString().slice(0, 5);
      if (!bookedTimes.includes(timeStr)) {
        slots.push(timeStr);
      }
      currentTime.setMinutes(currentTime.getMinutes() + duration);
    }

    res.json({ slots });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch available slots' });
  }
});

// Book appointment
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { service_id, appointment_date, appointment_time, location, session_type, notes } = req.body;

    // Validate input
    if (!service_id || !appointment_date || !appointment_time) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Get service details
    const serviceResult = await pool.query('SELECT * FROM services WHERE id = $1', [service_id]);
    if (serviceResult.rows.length === 0) {
      return res.status(404).json({ error: 'Service not found' });
    }

    const service = serviceResult.rows[0];

    // Create appointment
    const result = await pool.query(
      'INSERT INTO appointments (client_id, service_id, appointment_date, appointment_time, duration_minutes, location, session_type, notes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [req.userId, service_id, appointment_date, appointment_time, service.duration_minutes, location, session_type, notes]
    );

    const appointment = result.rows[0];

    // Get user details
    const userResult = await pool.query('SELECT * FROM users WHERE id = $1', [req.userId]);
    const user = userResult.rows[0];

    // Send confirmation email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: `Appointment Confirmation - ${service.name}`,
      html: `
        <h2>Appointment Confirmation</h2>
        <p>Dear ${user.first_name},</p>
        <p>Your appointment has been successfully booked!</p>
        <h3>Appointment Details:</h3>
        <ul>
          <li><strong>Service:</strong> ${service.name}</li>
          <li><strong>Date:</strong> ${appointment_date}</li>
          <li><strong>Time:</strong> ${appointment_time}</li>
          <li><strong>Duration:</strong> ${service.duration_minutes} minutes</li>
          <li><strong>Location:</strong> ${location || 'Online'}</li>
        </ul>
        <p>Please make payment to confirm your appointment.</p>
        <p>Best regards,<br>Prof. Peter Odera</p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.json(appointment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to book appointment' });
  }
});

// Get user's appointments
router.get('/', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT a.*, s.name as service_name, s.price_kes FROM appointments a JOIN services s ON a.service_id = s.id WHERE a.client_id = $1 ORDER BY a.appointment_date DESC',
      [req.userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

// Cancel appointment
router.put('/:id/cancel', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { cancellation_reason } = req.body;

    const result = await pool.query(
      'UPDATE appointments SET status = $1, cancellation_reason = $2 WHERE id = $3 AND client_id = $4 RETURNING *',
      ['cancelled', cancellation_reason, id, req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to cancel appointment' });
  }
});

module.exports = router;
