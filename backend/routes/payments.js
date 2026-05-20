const express = require('express');
const pool = require('../config/database');
const { authMiddleware } = require('../middleware/auth');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const axios = require('axios');

const router = express.Router();

// Create Stripe payment intent
router.post('/stripe', authMiddleware, async (req, res) => {
  try {
    const { appointment_id, amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
      metadata: { appointment_id, user_id: req.userId }
    });

    // Create payment record
    await pool.query(
      'INSERT INTO payments (appointment_id, client_id, amount, currency, payment_method, payment_status, stripe_payment_id) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [appointment_id, req.userId, amount, 'USD', 'stripe', 'pending', paymentIntent.id]
    );

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Payment creation failed' });
  }
});

// Confirm Stripe payment
router.post('/stripe/confirm', authMiddleware, async (req, res) => {
  try {
    const { paymentIntentId, appointment_id } = req.body;

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      // Update payment status
      await pool.query(
        'UPDATE payments SET payment_status = $1 WHERE stripe_payment_id = $2',
        ['completed', paymentIntentId]
      );

      // Update appointment status
      await pool.query(
        'UPDATE appointments SET status = $1 WHERE id = $2',
        ['confirmed', appointment_id]
      );

      res.json({ status: 'success' });
    } else {
      res.status(400).json({ error: 'Payment not completed' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Payment confirmation failed' });
  }
});

// M-Pesa payment
router.post('/mpesa', authMiddleware, async (req, res) => {
  try {
    const { appointment_id, phone_number, amount } = req.body;

    const missingMpesaConfig = !process.env.MPESA_CONSUMER_KEY || !process.env.MPESA_CONSUMER_SECRET || !process.env.MPESA_BUSINESS_SHORT_CODE || !process.env.MPESA_PASSKEY || !process.env.MPESA_CALLBACK_URL ||
      process.env.MPESA_CONSUMER_KEY === 'your_mpesa_consumer_key' || process.env.MPESA_CONSUMER_SECRET === 'your_mpesa_consumer_secret' ||
      process.env.MPESA_BUSINESS_SHORT_CODE === 'your_business_short_code' || process.env.MPESA_PASSKEY === 'your_mpesa_passkey';

    if (missingMpesaConfig) {
      return res.status(400).json({
        error: 'M-Pesa sandbox credentials are not configured. Set MPESA_CONSUMER_KEY, MPESA_CONSUMER_SECRET, MPESA_BUSINESS_SHORT_CODE, MPESA_PASSKEY, and MPESA_CALLBACK_URL in .env.'
      });
    }

    // Get M-Pesa token
    const auth = Buffer.from(`${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`).toString('base64');

    const tokenResponse = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
      headers: { Authorization: `Basic ${auth}` }
    });

    const token = tokenResponse.data.access_token;

    // M-Pesa STK push request
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
    const password = Buffer.from(`${process.env.MPESA_BUSINESS_SHORT_CODE}${process.env.MPESA_PASSKEY}${timestamp}`).toString('base64');

    const mpesaResponse = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      {
        BusinessShortCode: process.env.MPESA_BUSINESS_SHORT_CODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: Math.round(amount),
        PartyA: phone_number,
        PartyB: process.env.MPESA_BUSINESS_SHORT_CODE,
        PhoneNumber: phone_number,
        CallBackURL: process.env.MPESA_CALLBACK_URL,
        AccountReference: `APPT${appointment_id}`,
        TransactionDesc: 'Appointment Payment'
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // Create payment record
    await pool.query(
      'INSERT INTO payments (appointment_id, client_id, amount, currency, payment_method, payment_status) VALUES ($1, $2, $3, $4, $5, $6)',
      [appointment_id, req.userId, amount, 'KES', 'mpesa', 'pending']
    );

    res.json({ CheckoutRequestID: mpesaResponse.data.CheckoutRequestID });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'M-Pesa payment initiation failed' });
  }
});

// M-Pesa callback
router.post('/mpesa/callback', async (req, res) => {
  try {
    const Body = req.body.Body.stkCallback;
    
    if (Body.ResultCode === 0) {
      const metadata = Body.CallbackMetadata.Item;
      const receiptNumber = metadata[1].Value;
      const appointmentId = Body.AccountReference.replace('APPT', '');

      await pool.query(
        'UPDATE payments SET payment_status = $1, mpesa_receipt_number = $2 WHERE appointment_id = $3',
        ['completed', receiptNumber, appointmentId]
      );

      await pool.query(
        'UPDATE appointments SET status = $1 WHERE id = $2',
        ['confirmed', appointmentId]
      );
    }

    res.json({ ResultCode: 0, ResultDesc: 'Accepted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Callback processing failed' });
  }
});

// Get payment history
router.get('/', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM payments WHERE client_id = $1 ORDER BY created_at DESC',
      [req.userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch payments' });
  }
});

module.exports = router;
