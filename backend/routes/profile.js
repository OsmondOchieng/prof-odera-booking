const express = require('express');
const pool = require('../config/database');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Get Prof. Odera's profile
router.get('/professor', async (req, res) => {
  try {
    res.json({
      name: 'Prof. Peter Odera, PhD',
      title: 'Professor of Psychology',
      department: 'Department of Educational Psychology',
      institution: 'Masinde Muliro University of Science and Technology',
      bio: 'Prof. Peter Odera is an accomplished psychologist with over 25 years of experience in educational psychology, counseling, and academic guidance. He holds a PhD in Psychology from Aligarh Muslim University and has established himself as a leading expert in trauma counseling, career guidance, and educational psychology in East Africa.',
      expertise: [
        'Educational Psychology',
        'Guidance and Counseling',
        'Trauma & PTSD Therapy',
        'Career Counseling',
        'Mental Health Consulting',
        'Personality Assessment',
        'Academic Performance Coaching',
        'Stress Management'
      ],
      email: 'podera@mmust.ac.ke',
      phone: '+254-XXX-XXXXXX',
      image: '/images/prof-odera.jpg',
      qualifications: [
        'PhD in Psychology (1994) - Aligarh Muslim University',
        'MPhil in Psychology (1992) - Aligarh Muslim University',
        'MA in Psychology (1989) - Aligarh Muslim University',
        'BA in Psychology, Sociology & English (1987)'
      ]
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Get user profile
router.get('/', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, first_name, last_name, email, phone, role, created_at FROM users WHERE id = $1',
      [req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Update user profile
router.put('/', authMiddleware, async (req, res) => {
  try {
    const { first_name, last_name, phone } = req.body;

    const result = await pool.query(
      'UPDATE users SET first_name = $1, last_name = $2, phone = $3 WHERE id = $4 RETURNING id, first_name, last_name, email, phone, role',
      [first_name, last_name, phone, req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Get testimonials
router.get('/testimonials', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT t.*, u.first_name, u.last_name FROM testimonials t JOIN users u ON t.client_id = u.id WHERE t.is_approved = true ORDER BY t.created_at DESC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
});

// Submit testimonial
router.post('/testimonials', authMiddleware, async (req, res) => {
  try {
    const { rating, review } = req.body;

    const result = await pool.query(
      'INSERT INTO testimonials (client_id, rating, review, is_approved) VALUES ($1, $2, $3, $4) RETURNING *',
      [req.userId, rating, review, false]
    );

    res.json({ message: 'Testimonial submitted and awaiting approval', data: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to submit testimonial' });
  }
});

module.exports = router;
