#!/bin/bash
set -e

echo "🎤 AI Voice Assistant - Setup Script"
echo "====================================="

# Check Python version
echo "\n📦 Checking Python version..."
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi
echo "✅ Python 3 found: $(python3 --version)"

# Check Node version
echo "\n📦 Checking Node.js version..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 14 or higher."
    exit 1
fi
echo "✅ Node.js found: $(node --version)"

# Setup Backend
echo "\n🐍 Setting up Backend..."
cd backend
python3 -m venv venv
source venv/bin/activate || . venv/Scripts/activate
pip install --upgrade pip
pip install -r requirements.txt
cd ..
echo "✅ Backend setup complete"

# Setup Frontend
echo "\n⚛️  Setting up Frontend..."
cd frontend-web
npm install
cd ..
echo "✅ Frontend setup complete"

# Setup Environment
echo "\n⚙️  Setting up environment..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo "⚠️  Created .env file. Please update it with your OpenAI API key."
fi

echo "\n✨ Setup Complete!"
echo "\nTo start the application:"
echo "1. Update .env with your OpenAI API key"
echo "2. Terminal 1 - Backend: cd backend && source venv/bin/activate && python main.py"
echo "3. Terminal 2 - Frontend: cd frontend-web && npm start"
echo "\nOr use Docker: docker-compose up"