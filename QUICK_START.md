# QUICK START GUIDE

## 5-Minute Setup

### Step 1: Backend Setup (Terminal 1)
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials
npm run migrate
node scripts/seed.js
npm run dev
```

### Step 2: Frontend Setup (Terminal 2)
```bash
cd frontend
npm install
echo 'NEXT_PUBLIC_API_URL=http://localhost:5000/api' > .env.local
npm run dev
```

### Step 3: Access Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api

## Test Credentials

After seeding, use:
- **Email**: any email you registered with
- **Password**: any password you set

## Database Reset
```bash
dropdb prof_odera_booking
createdb prof_odera_booking
cd backend && npm run migrate && node scripts/seed.js
```

## Common Issues

| Issue | Solution |
|-------|----------|
| Port 5000 already in use | Change PORT in backend/.env |
| Database connection error | Check PostgreSQL is running |
| Module not found | Run `npm install` in both folders |
| Email not sending | Check Gmail app password in .env |

## Next Steps

1. Get payment credentials (Stripe, M-Pesa, PayPal)
2. Update environment variables
3. Configure admin account
4. Deploy to production
5. Set up SSL certificate

See README.md for full documentation!
