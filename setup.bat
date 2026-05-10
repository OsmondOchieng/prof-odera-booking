@echo off
echo 🚀 Prof. Peter Odera's Booking Platform - Setup Script
echo ==================================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js 16+ first.
    exit /b 1
)

REM Check if PostgreSQL is installed
where psql >nul 2>nul
if errorlevel 1 (
    echo ❌ PostgreSQL is not installed. Please install PostgreSQL first.
    exit /b 1
)

echo ✅ Prerequisites found (Node.js and PostgreSQL)
echo.

REM Backend setup
echo 🔧 Setting up Backend...
cd backend

if not exist ".env" (
    echo 📝 Creating .env file from template...
    copy .env.example .env
    echo ⚠️  Please edit backend\.env with your credentials
    pause
)

echo 📦 Installing backend dependencies...
call npm install

echo 🗄️  Setting up database...
psql -U postgres -c "CREATE DATABASE prof_odera_booking;" 2>nul
call npm run migrate
call node scripts/seed.js

cd ..

REM Frontend setup
echo.
echo 🎨 Setting up Frontend...
cd frontend

echo 📝 Creating .env.local file...
(
    echo NEXT_PUBLIC_API_URL=http://localhost:5000/api
    echo NEXT_PUBLIC_STRIPE_KEY=pk_test_your_key_here
) > .env.local

echo 📦 Installing frontend dependencies...
call npm install

cd ..

echo.
echo ✅ Setup Complete!
echo.
echo 📋 Next Steps:
echo   1. Terminal 1: cd backend ^&^& npm run dev
echo   2. Terminal 2: cd frontend ^&^& npm run dev
echo   3. Open http://localhost:3000 in your browser
echo.
echo 🎓 Backend API: http://localhost:5000/api
echo 🌐 Frontend: http://localhost:3000
echo.
pause
