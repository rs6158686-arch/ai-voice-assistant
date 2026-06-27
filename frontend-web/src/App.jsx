import React, { useState, useRef, useEffect } from 'react';
import { FaMicrophone, FaPaperPlane, FaCog, FaTrash } from 'react-icons/fa';
import ChatInterface from './components/ChatInterface';
import VoiceButton from './components/VoiceButton';
import Settings from './components/Settings';
import api from './services/api';
import './App.css';

function App() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "नमस्ते! 🎤 मैं आपका AI Voice Assistant हूँ। आप मुझसे कुछ भी पूछ सकते हैं या हिंदी में कमांड दे सकते हैं।",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('hi-IN');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: text,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setLoading(true);

    try {
      // Send to AI
      const response = await api.post('/chat/message', {
        message: text,
        conversation_history: messages.map(m => ({
          role: m.sender === 'user' ? 'user' : 'assistant',
          content: m.text
        }))
      });

      // Add AI response
      const aiMessage = {
        id: messages.length + 2,
        text: response.data.response,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: messages.length + 2,
        text: 'क्षमा करें, एक error आई है। कृपया दोबारा कोशिश करें। ❌',
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleVoiceInput = async (transcript) => {
    setIsListening(false);
    await handleSendMessage(transcript);
  };

  const clearMessages = () => {
    if (window.confirm('क्या आप सभी messages को delete करना चाहते हैं? 🗑️')) {
      setMessages([
        {
          id: 1,
          text: "नमस्ते! 🎤 मैं आपका AI Voice Assistant हूँ। आप मुझसे कुछ भी पूछ सकते हैं या हिंदी में कमांड दे सकते हैं।",
          sender: 'ai',
          timestamp: new Date()
        }
      ]);
    }
  };

  return (
    <div className="App">
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <FaMicrophone className="text-2xl" />
            <h1 className="text-2xl font-bold">🎤 AI Voice Assistant</h1>
            <span className="text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full">हिंदी 🇮🇳</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition"
              title="Settings - सेटिंग्स"
            >
              <FaCog size={20} />
            </button>
            <button
              onClick={clearMessages}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition"
              title="Clear - साफ़ करें"
            >
              <FaTrash size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-hidden">
        {showSettings ? (
          <Settings onClose={() => setShowSettings(false)} />
        ) : (
          <div className="h-screen flex flex-col max-w-6xl mx-auto">
            <ChatInterface
              messages={messages}
              messagesEndRef={messagesEndRef}
              loading={loading}
            />

            <div className="border-t bg-white p-4 shadow-lg">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage(inputText);
                    }
                  }}
                  placeholder="कुछ लिखें या बोलें... 📝"
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-800 placeholder-gray-500"
                  disabled={loading}
                />
                <button
                  onClick={() => handleSendMessage(inputText)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2 font-medium"
                  disabled={loading}
                  title="भेजें"
                >
                  <FaPaperPlane size={16} />
                  भेजें
                </button>
                <VoiceButton
                  onTranscript={handleVoiceInput}
                  isListening={isListening}
                  setIsListening={setIsListening}
                  language={language}
                />
              </div>
              <div className="text-xs text-gray-500 mt-2 text-center">
                💡 बोलें या लिखें - दोनों तरीके से काम करता है!
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;