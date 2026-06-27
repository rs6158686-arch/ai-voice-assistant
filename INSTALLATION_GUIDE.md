# 🎤 AI Voice Assistant - Installation Guide

## Prerequisites

- Python 3.8 or higher
- Node.js 14 or higher
- npm or yarn
- OpenAI API key
- Git

## Quick Start (Recommended)

### Windows
```bash
setup.bat
```

### Linux/Mac
```bash
bash setup.sh
```

## Manual Setup

### 1. Clone Repository
```bash
git clone https://github.com/rs6158686-arch/ai-voice-assistant.git
cd ai-voice-assistant
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows
venv\Scripts\activate
# Linux/Mac
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

cd ..
```

### 3. Frontend Setup

```bash
cd frontend-web
npm install
cd ..
```

### 4. Environment Configuration

Create `.env` file from `.env.example`:

```bash
cp .env.example .env
```

Update `.env` with your settings:
```
OPENAI_API_KEY=your_api_key_here
DEBUG=true
HOST=0.0.0.0
PORT=8000
```

## Running the Application

### Option 1: Docker (Easiest)

```bash
docker-compose up
```

Access:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

### Option 2: Manual (Development)

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate  # Windows: venv\Scripts\activate
python main.py
```

**Terminal 2 - Frontend:**
```bash
cd frontend-web
npm start
```

Access:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000

## Configuration

### OpenAI API Key

1. Get your API key from [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Add to `.env` file:
   ```
   OPENAI_API_KEY=sk-...
   ```

### Allowed Applications

Edit `.env` to control which apps can be opened:
```
ALLOWED_APPS=["notepad","calculator","chrome","firefox","vscode"]
```

### Language Setting

Supported languages in Voice Settings:
- English (US, UK)
- Spanish
- French
- German
- Italian
- Japanese
- Chinese
- Hindi

## Troubleshooting

### Microphone Not Working

1. Check browser permissions
2. Ensure microphone is connected
3. Test with system settings

### OpenAI API Error

1. Verify API key is correct
2. Check API usage limits
3. Ensure sufficient credits

### Backend Connection Error

1. Ensure backend is running on port 8000
2. Check CORS settings in `.env`
3. Verify API URL in frontend settings

## Development

### Backend
- Framework: FastAPI
- Language: Python 3.9
- Async support: Yes
- Hot reload: Yes (when DEBUG=true)

### Frontend
- Framework: React 18
- Styling: Tailwind CSS
- Icons: React Icons
- API Client: Axios

## API Endpoints

- `POST /api/voice/transcribe` - Voice to text
- `POST /api/chat/message` - Send message to AI
- `POST /api/system/open-app` - Open application
- `GET /api/system/apps` - Get supported apps
- `GET /api/health` - Health check

## Support

For issues and questions:
1. Check troubleshooting section
2. Review GitHub issues
3. Create new issue with details

---

**Happy coding! 🚀**