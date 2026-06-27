@echo off
echo 🎤 AI Voice Assistant - Setup Script (Windows)
echo ===============================================

echo.
echo 📦 Checking Python version...
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed. Please install Python 3.8 or higher.
    exit /b 1
)
echo ✅ Python found

echo.
echo 📦 Checking Node.js version...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js 14 or higher.
    exit /b 1
)
echo ✅ Node.js found

echo.
echo 🐍 Setting up Backend...
cd backend
python -m venv venv
call venv\Scripts\activate.bat
pip install --upgrade pip
pip install -r requirements.txt
cd ..
echo ✅ Backend setup complete

echo.
echo ⚛️  Setting up Frontend...
cd frontend-web
call npm install
cd ..
echo ✅ Frontend setup complete

echo.
echo ⚙️  Setting up environment...
if not exist .env (
    copy .env.example .env
    echo ⚠️  Created .env file. Please update it with your OpenAI API key.
)

echo.
echo ✨ Setup Complete!
echo.
echo To start the application:
echo 1. Update .env with your OpenAI API key
echo 2. Terminal 1 - Backend: cd backend ^&^& venv\Scripts\activate.bat ^&^& python main.py
echo 3. Terminal 2 - Frontend: cd frontend-web ^&^& npm start
echo.
echo Or use Docker: docker-compose up
pause