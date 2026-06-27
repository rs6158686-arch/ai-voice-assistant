# 🎤 AI Voice Assistant - Usage Guide

## Getting Started

### 1. Opening the Application

**Web App:**
- Navigate to http://localhost:3000

**Desktop App:**
- Run the Electron app executable

### 2. Voice Commands

#### Recording Voice
1. Click the **"Speak"** button (purple microphone icon)
2. Speak clearly into your microphone
3. Click **"Stop"** or wait for auto-stop
4. The assistant will transcribe and respond

#### Text Input
1. Type your message in the text box
2. Press **Enter** or click **Send**
3. Wait for AI response

## Features

### 1. Voice-to-Text
- Real-time transcription
- Multiple language support
- High accuracy with Google Speech Recognition

### 2. AI Chat
- Context-aware responses
- Conversation history
- Multiple AI models available

### 3. System Control
- Open applications (Chrome, Firefox, VS Code, etc.)
- Launch files and folders
- Execute system commands
- View system information

### 4. Settings
- Change language
- Switch themes
- Configure API endpoints
- View system info

## Example Commands

### General Chat
- "What is the weather like?"
- "Tell me a joke"
- "Explain machine learning"
- "Calculate 15 * 25"

### System Control
- "Open Chrome"
- "Open Visual Studio Code"
- "Open Calculator"
- "Open Settings"
- "Open my files"

### Information
- "What time is it?"
- "Tell me about Python"
- "How do I learn web development?"

## Best Practices

### 1. Voice Recording
✅ DO:
- Speak clearly and slowly
- Use a quiet environment
- Face the microphone
- Use full sentences

❌ DON'T:
- Speak too fast
- Use noisy surroundings
- Whisper or mumble
- Interrupt yourself

### 2. System Commands
✅ DO:
- Use app names you know are installed
- Give clear, specific commands
- Wait for response before new command

❌ DON'T:
- Try to execute unknown apps
- Issue multiple commands at once
- Use unsupported commands

### 3. AI Queries
✅ DO:
- Ask specific questions
- Provide context when needed
- Break complex questions into parts

❌ DON'T:
- Ask extremely vague questions
- Expect real-time data
- Request inappropriate content

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Enter` | Send message |
| `Shift + Enter` | New line |
| `Ctrl + Shift + D` | Clear chat history |
| `Ctrl + Shift + S` | Open settings |

## Settings Guide

### Language
Select your preferred language for voice recognition and responses.

### Theme
- **Light**: Bright interface (default)
- **Dark**: Dark interface for low light
- **Auto**: Follows system settings

### API URL
Change if running backend on different server:
```
http://your-server:8000/api
```

## Conversation Management

### Saving Conversations
1. Use "Export Chat" button
2. Conversations are automatically saved locally

### Clearing History
1. Click trash icon in header
2. Confirm deletion

### Starting Fresh
1. Click "New Conversation"
2. Or clear all history

## Advanced Features

### System Information
In Settings → System Information:
- OS type
- CPU usage
- Memory usage
- Processor info

### Custom Commands
You can teach the assistant custom commands:
- Save as templates
- Quick access buttons
- Macro automation

## Troubleshooting

### Microphone Not Detected
1. Check browser permissions
2. Refresh page
3. Test microphone in system settings

### Slow Response
1. Check internet connection
2. Verify API key validity
3. Restart application

### Commands Not Working
1. Ensure applications are installed
2. Check system permissions
3. Try different command phrasing

## Tips & Tricks

💡 **Tip 1**: Use natural language, not technical commands
- Good: "Open my projects folder"
- Bad: "C:\\Users\\Projects"

💡 **Tip 2**: Give context for better responses
- Good: "I'm learning Python, suggest a good project"
- Bad: "Project ideas?"

💡 **Tip 3**: Chain commands logically
- Open app → Use app → Ask assistant for help

💡 **Tip 4**: Customize your language and theme for comfort

💡 **Tip 5**: Check conversation history for past solutions

## Privacy & Security

- Voice data is processed locally by default
- Chat history stored in browser (can be cleared)
- OpenAI API processes chat data
- No data sold to third parties
- Always review API key security

## Support

For help:
1. Check this guide
2. Review FAQ section
3. Open GitHub issue
4. Contact support

---

**Enjoy your AI Voice Assistant! 🚀**