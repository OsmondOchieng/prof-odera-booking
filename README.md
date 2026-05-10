# Prof. Peter Odera's Booking & Counseling Platform

A complete web platform for booking counseling sessions, therapy appointments, and professional consultations with Prof. Peter Odera.

## Features

- ✅ User Registration & Authentication (JWT)
- ✅ Professional profile showcasing qualifications
- ✅ Service catalog with pricing
- ✅ Interactive appointment booking with calendar
- ✅ Real-time availability checking
- ✅ Multiple payment methods (Stripe, M-Pesa, PayPal)
- ✅ Admin dashboard for managing appointments
- ✅ Email confirmations
- ✅ Responsive design (Mobile, Tablet, Desktop)
- ✅ Testimonials & Reviews system
- ✅ Availability management

## Tech Stack

### Frontend
- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Calendar**: React Calendar
- **Payment**: Stripe.js

### Backend
- **Server**: Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Payment Processing**: Stripe, M-Pesa API, PayPal
- **Email**: Nodemailer

### Deployment
- **Frontend**: Vercel or Netlify
- **Backend**: Heroku, Railway, or self-hosted VPS

## Project Structure

```
prof-odera-booking/
├── frontend/                 # Next.js Frontend
│   ├── pages/               # Next.js pages/routes
│   ├── components/          # Reusable React components
│   ├── lib/                 # API calls & utilities
│   ├── styles/              # CSS & global styles
│   └── public/              # Static assets
├── backend/                 # Express.js Backend
│   ├── config/              # Database configuration
│   ├── models/              # Database models
│   ├── routes/              # API routes
│   ├── controllers/         # Business logic
│   ├── middleware/          # Auth & validation
│   └── scripts/             # Database migrations & seeding
└── docs/                    # Documentation
```

## Installation & Setup

### Prerequisites
- Node.js 16+ and npm/yarn
- PostgreSQL 12+
- Stripe Account (for payments)
- Gmail Account (for emails)

### Step 1: Clone the Repository
```bash
cd /path/to/prof-odera-booking
```

### Step 2: Backend Setup

```bash
cd backend

# 1. Install dependencies
npm install

# 2. Create .env file from example
cp .env.example .env

# 3. Edit .env with your credentials
# - PostgreSQL connection details
# - JWT secret key
# - Stripe keys
# - M-Pesa credentials
# - Gmail credentials
# - Admin email/password
```

**Edit `backend/.env`** with:
```env
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=prof_odera_booking

JWT_SECRET=your_super_secret_jwt_key_here

STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_PUBLIC_KEY=pk_test_xxxxx

MPESA_CONSUMER_KEY=xxxxx
MPESA_CONSUMER_SECRET=xxxxx
MPESA_BUSINESS_SHORT_CODE=xxxxx
MPESA_PASSKEY=xxxxx

PAYPAL_CLIENT_ID=xxxxx
PAYPAL_CLIENT_SECRET=xxxxx

EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Step 3: Database Setup

```bash
cd backend

# 1. Create PostgreSQL database
createdb prof_odera_booking

# 2. Run migrations
npm run migrate

# 3. Seed initial data (services, availability)
node scripts/seed.js
```

### Step 4: Start Backend Server

```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

### Step 5: Frontend Setup

```bash
cd frontend

# 1. Install dependencies
npm install

# 2. Create .env.local file
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_STRIPE_KEY=pk_test_xxxxx
EOF

# 3. Start development server
npm run dev
# Frontend runs on http://localhost:3000
```

## Getting Payment Credentials

### Stripe
1. Go to [stripe.com](https://stripe.com)
2. Create account → Go to Dashboard
3. Copy API Keys (Publishable & Secret)
4. Add to `.env` file

### M-Pesa (Safaricom)
1. Visit Safaricom Developer Portal
2. Create API app
3. Get Consumer Key & Secret
4. Configure Business Short Code & Pass Key

### PayPal
1. Go to [developer.paypal.com](https://developer.paypal.com)
2. Create app
3. Get Client ID & Secret

### Gmail (for Email)
1. Go to Google Account → Security
2. Enable 2-Factor Authentication
3. Generate App Password
4. Use app password in `.env`

## API Documentation

### Authentication
```
POST /api/auth/register
POST /api/auth/login
```

### Services
```
GET /api/services
GET /api/services/:id
```

### Appointments
```
GET /api/appointments/available-slots/:date/:service_id
POST /api/appointments
GET /api/appointments
PUT /api/appointments/:id/cancel
```

### Payments
```
POST /api/payments/stripe
POST /api/payments/stripe/confirm
POST /api/payments/mpesa
POST /api/payments/mpesa/callback
GET /api/payments
```

### Profile
```
GET /api/profile/professor
GET /api/profile
PUT /api/profile
GET /api/profile/testimonials
POST /api/profile/testimonials
```

### Admin
```
GET /api/admin/stats
GET /api/admin/appointments
PUT /api/admin/appointments/:id
GET /api/admin/payments
GET /api/admin/testimonials
PUT /api/admin/testimonials/:id
PUT /api/admin/availability/:day
```

## Services Available

1. **Individual Counseling Session** - KES 2,000 (60 min)
2. **Career Guidance Consultation** - KES 1,500 (45 min)
3. **Educational Psychology Assessment** - KES 3,000 (90 min)
4. **Trauma & PTSD Therapy** - KES 2,500 (60 min)
5. **Family/Relationship Counseling** - KES 2,200 (75 min)
6. **Academic Performance Coaching** - KES 1,200 (45 min)
7. **Personality Development** - KES 1,800 (60 min)
8. **Group Workshop - Stress Management** - KES 500 (120 min)
9. **Motivational Speaking/Training** - KES 5,000 (120 min)
10. **Institutional Consultation** - KES 10,000 (120 min)

## Admin Setup

### First Time Admin Setup
```bash
# The first admin should be created manually via database:
psql prof_odera_booking

INSERT INTO users (first_name, last_name, email, phone, password_hash, role)
VALUES ('Admin', 'User', 'admin@profodera.com', '+254700000000', '[HASHED_PASSWORD]', 'admin');
```

Generate bcrypt hash:
```javascript
const bcrypt = require('bcryptjs');
const hash = bcrypt.hashSync('your_password', 10);
console.log(hash);
```

## Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
# Push to GitHub → Connect to Vercel → Auto-deploy
```

### Backend (Railway.app)
```bash
# Install Railway CLI
npm i -g @railway/cli

cd backend
railway login
railway init
railway up
```

### Environment Variables (Production)
- Set all `.env` variables in deployment platform
- Update `FRONTEND_URL` for production domain
- Use production Stripe/M-Pesa/PayPal keys

## Troubleshooting

### Database connection error
```
Check PostgreSQL is running
psql -U postgres -c "SELECT 1"
```

### Port already in use
```
# Change PORT in .env or
# Kill process: sudo lsof -ti:5000 | xargs kill -9
```

### Email not sending
```
Check Gmail App Password is correct
Enable "Less Secure Apps" if needed
```

### CORS errors
```
Ensure FRONTEND_URL in backend .env matches frontend domain
```

## Support & Contact

- **Email**: podera@mmust.ac.ke
- **Phone**: +254-XXX-XXXXXX
- **Institution**: Masinde Muliro University of Science and Technology

## License

This project is private and for Prof. Peter Odera's practice.

---

**Created for Prof. Peter Odera's Professional Psychology Practice**
Last Updated: 2024
