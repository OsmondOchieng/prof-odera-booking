import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Auth API calls
export const authAPI = {
  register: (data) => axios.post(`${API_URL}/auth/register`, data),
  login: (email, password) => axios.post(`${API_URL}/auth/login`, { email, password }),
};

// Services API calls
export const servicesAPI = {
  getAll: () => axios.get(`${API_URL}/services`),
  getById: (id) => axios.get(`${API_URL}/services/${id}`),
};

// Appointments API calls
export const appointmentsAPI = {
  getAvailableSlots: (date, serviceId) => axios.get(`${API_URL}/appointments/available-slots/${date}/${serviceId}`),
  book: (data, token) => axios.post(`${API_URL}/appointments`, data, {
    headers: { Authorization: `Bearer ${token}` }
  }),
  getMyAppointments: (token) => axios.get(`${API_URL}/appointments`, {
    headers: { Authorization: `Bearer ${token}` }
  }),
  cancel: (id, reason, token) => axios.put(`${API_URL}/appointments/${id}/cancel`, { cancellation_reason: reason }, {
    headers: { Authorization: `Bearer ${token}` }
  }),
};

// Payments API calls
export const paymentsAPI = {
  createStripePayment: (data, token) => axios.post(`${API_URL}/payments/stripe`, data, {
    headers: { Authorization: `Bearer ${token}` }
  }),
  confirmStripePayment: (data, token) => axios.post(`${API_URL}/payments/stripe/confirm`, data, {
    headers: { Authorization: `Bearer ${token}` }
  }),
  initiateMPesa: (data, token) => axios.post(`${API_URL}/payments/mpesa`, data, {
    headers: { Authorization: `Bearer ${token}` }
  }),
  getHistory: (token) => axios.get(`${API_URL}/payments`, {
    headers: { Authorization: `Bearer ${token}` }
  }),
};

// Profile API calls
export const profileAPI = {
  getProfessor: () => axios.get(`${API_URL}/profile/professor`),
  getMyProfile: (token) => axios.get(`${API_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` }
  }),
  updateProfile: (data, token) => axios.put(`${API_URL}/profile`, data, {
    headers: { Authorization: `Bearer ${token}` }
  }),
  getTestimonials: () => axios.get(`${API_URL}/profile/testimonials`),
  submitTestimonial: (data, token) => axios.post(`${API_URL}/profile/testimonials`, data, {
    headers: { Authorization: `Bearer ${token}` }
  }),
};

// Admin API calls
export const adminAPI = {
  getStats: (token) => axios.get(`${API_URL}/admin/stats`, {
    headers: { Authorization: `Bearer ${token}` }
  }),
  getAllAppointments: (token) => axios.get(`${API_URL}/admin/appointments`, {
    headers: { Authorization: `Bearer ${token}` }
  }),
  updateAppointmentStatus: (id, status, token) => axios.put(`${API_URL}/admin/appointments/${id}`, { status }, {
    headers: { Authorization: `Bearer ${token}` }
  }),
  getAllPayments: (token) => axios.get(`${API_URL}/admin/payments`, {
    headers: { Authorization: `Bearer ${token}` }
  }),
  getTestimonialsPending: (token) => axios.get(`${API_URL}/admin/testimonials`, {
    headers: { Authorization: `Bearer ${token}` }
  }),
  updateTestimonial: (id, isApproved, token) => axios.put(`${API_URL}/admin/testimonials/${id}`, { is_approved: isApproved }, {
    headers: { Authorization: `Bearer ${token}` }
  }),
};
