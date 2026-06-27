import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import api from '../services/api';

const Settings = ({ onClose }) => {
  const [settings, setSettings] = useState({
    language: 'hi-IN',
    apiUrl: 'http://localhost:8000',
    theme: 'light',
  });
  const [systemInfo, setSystemInfo] = useState(null);
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    const fetchSystemInfo = async () => {
      try {
        const response = await api.get('/system/system-info');
        setSystemInfo(response.data);
      } catch (error) {
        console.error('System info error:', error);
      }
    };

    const fetchLanguages = async () => {
      try {
        const response = await api.get('/voice/supported-languages');
        setLanguages(response.data.languages);
      } catch (error) {
        console.error('Languages error:', error);
      }
    };

    fetchSystemInfo();
    fetchLanguages();
  }, []);

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const saveSettings = () => {
    localStorage.setItem('assistant-settings', JSON.stringify(settings));
    alert('सेटिंग्स सेव हो गई! ✅');
  };

  return (
    <div className="h-screen overflow-auto bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 font-medium"
        >
          <FaArrowLeft /> वापस जाएं
        </button>

        <h2 className="text-3xl font-bold mb-6">⚙️ सेटिंग्स</h2>

        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          {/* Language Setting */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              🗣️ भाषा (Language)
            </label>
            <select
              value={settings.language}
              onChange={(e) => handleSettingChange('language', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">अपनी पसंदीदा भाषा चुनें</p>
          </div>

          {/* Theme Setting */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              🎨 थीम (Theme)
            </label>
            <select
              value={settings.theme}
              onChange={(e) => handleSettingChange('theme', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="light">☀️ Light (हल्का)</option>
              <option value="dark">🌙 Dark (गहरा)</option>
              <option value="auto">🔄 Auto (स्वचालित)</option>
            </select>
          </div>

          {/* API URL Setting */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              🌐 API URL
            </label>
            <input
              type="text"
              value={settings.apiUrl}
              onChange={(e) => handleSettingChange('apiUrl', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="http://localhost:8000"
            />
            <p className="text-xs text-gray-500 mt-1">अपने backend का URL दर्ज करें</p>
          </div>

          {/* System Info */}
          {systemInfo && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-gray-800 mb-3">💻 सिस्टम की जानकारी</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>🖥️ OS:</strong> {systemInfo.os}</p>
                <p><strong>📋 Platform:</strong> {systemInfo.platform}</p>
                <p><strong>⚙️ Processor:</strong> {systemInfo.processor}</p>
                <p><strong>⚡ CPU उपयोग:</strong> {systemInfo.cpu_percent}%</p>
                <p><strong>🧠 Memory:</strong> {(systemInfo.memory.percent).toFixed(1)}%</p>
              </div>
            </div>
          )}

          {/* Tips */}
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h3 className="font-semibold text-gray-800 mb-2">💡 उपयोगी सुझाव:</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>✓ स्पष्ट हिंदी में बोलें</li>
              <li>✓ शांत जगह से रिकॉर्ड करें</li>
              <li>✓ माइक्रोफोन की ओर मुँह करें</li>
              <li>✓ पूरे वाक्य बोलें</li>
            </ul>
          </div>

          {/* Save Button */}
          <button
            onClick={saveSettings}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition font-bold text-lg"
          >
            💾 सेटिंग्स सेव करें
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;