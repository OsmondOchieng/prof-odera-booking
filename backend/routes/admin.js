const express = require('express');
const pool = require('../config/database');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

const router = express.Router();

// Get dashboard stats
router.get('/stats', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const appointmentsCount = await pool.query('SELECT COUNT(*) FROM appointments');
    const usersCount = await pool.query('SELECT COUNT(*) FROM users WHERE role = $1', ['client']);
    const paymentsTotal = await pool.query('SELECT SUM(amount) FROM payments WHERE payment_status = $1', ['completed']);
    const upcomingAppointments = await pool.query('SELECT COUNT(*) FROM appointments WHERE appointment_date >= CURRENT_DATE AND status = $1', ['confirmed']);

    res.json({
      total_appointments: parseInt(appointmentsCount.rows[0].count),
      total_clients: parseInt(usersCount.rows[0].count),
      revenue: parseFloat(paymentsTotal.rows[0].sum || 0),
      upcoming_appointments: parseInt(upcomingAppointments.rows[0].count)
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// Get all appointments (admin)
router.get('/appointments', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT a.*, u.first_name, u.last_name, u.email, s.name as service_name, s.price_kes
      FROM appointments a
      JOIN users u ON a.client_id = u.id
      JOIN services s ON a.service_id = s.id
      ORDER BY a.appointment_date DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

// Update appointment status
router.put('/appointments/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { status } = req.body;

    const result = await pool.query(
      'UPDATE appointments SET status = $1 WHERE id = $2 RETURNING *',
      [status, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update appointment' });
  }
});

// Get all payments (admin)
router.get('/payments', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.*, u.email, a.appointment_date
      FROM payments p
      JOIN users u ON p.client_id = u.id
      JOIN appointments a ON p.appointment_id = a.id
      ORDER BY p.created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch payments' });
  }
});

// Get testimonials awaiting approval
router.get('/testimonials', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT t.*, u.first_name, u.last_name
      FROM testimonials t
      JOIN users u ON t.client_id = u.id
      WHERE t.is_approved = false
      ORDER BY t.created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
});

// Approve/Reject testimonial
router.put('/testimonials/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { is_approved } = req.body;

    const result = await pool.query(
      'UPDATE testimonials SET is_approved = $1 WHERE id = $2 RETURNING *',
      [is_approved, req.params.id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update testimonial' });
  }
});

// Add resource/blog post
router.post('/resources', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { title, content, category, is_published } = req.body;

    const result = await pool.query(
      'INSERT INTO resources (title, content, category, is_published) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, content, category, is_published]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create resource' });
  }
});

// Update availability
router.put('/availability/:day', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { start_time, end_time, is_available } = req.body;

    const result = await pool.query(
      'UPDATE availability SET start_time = $1, end_time = $2, is_available = $3 WHERE day_of_week = $4 RETURNING *',
      [start_time, end_time, is_available, req.params.day]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update availability' });
  }
});

module.exports = router;
