#!/bin/bash

echo "🚀 Prof. Peter Odera's Booking Platform - Setup Script"
echo "=================================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    exit 1
fi

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL is not installed. Please install PostgreSQL first."
    exit 1
fi

echo "✅ Prerequisites found (Node.js and PostgreSQL)"
echo ""

# Backend setup
echo "🔧 Setting up Backend..."
cd backend

if [ ! -f ".env" ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please edit backend/.env with your credentials"
    echo "   - Database credentials"
    echo "   - Stripe keys"
    echo "   - M-Pesa credentials"
    echo "   - Gmail credentials"
    read -p "Press Enter when you've edited .env..."
fi

echo "📦 Installing backend dependencies..."
npm install

echo "🗄️  Setting up database..."
createdb prof_odera_booking 2>/dev/null || true
npm run migrate
node scripts/seed.js

cd ..

# Frontend setup
echo ""
echo "🎨 Setting up Frontend..."
cd frontend

echo "📝 Creating .env.local file..."
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_STRIPE_KEY=pk_test_your_key_here
EOF

echo "📦 Installing frontend dependencies..."
npm install

cd ..

echo ""
echo "✅ Setup Complete!"
echo ""
echo "📋 Next Steps:"
echo "  1. Terminal 1: cd backend && npm run dev"
echo "  2. Terminal 2: cd frontend && npm run dev"
echo "  3. Open http://localhost:3000 in your browser"
echo ""
echo "🎓 Backend API: http://localhost:5000/api"
echo "🌐 Frontend: http://localhost:3000"
echo ""
