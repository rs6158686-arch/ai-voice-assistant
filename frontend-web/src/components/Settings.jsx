import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import api from '../services/api';

const Settings = ({ onClose }) => {
  const [settings, setSettings] = useState({
    language: 'en-US',
    apiUrl: 'http://localhost:8000',
    theme: 'light',
  });
  const [systemInfo, setSystemInfo] = useState(null);

  useEffect(() => {
    const fetchSystemInfo = async () => {
      try {
        const response = await api.get('/system/system-info');
        setSystemInfo(response.data);
      } catch (error) {
        console.error('Error fetching system info:', error);
      }
    };
    fetchSystemInfo();
  }, []);

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const saveSettings = () => {
    localStorage.setItem('assistant-settings', JSON.stringify(settings));
    alert('Settings saved!');
  };

  return (
    <div className="h-screen overflow-auto bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
        >
          <FaArrowLeft /> Back
        </button>

        <h2 className="text-3xl font-bold mb-6">Settings</h2>

        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          {/* Language Setting */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language
            </label>
            <select
              value={settings.language}
              onChange={(e) => handleSettingChange('language', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="en-US">English (US)</option>
              <option value="en-GB">English (UK)</option>
              <option value="es-ES">Spanish</option>
              <option value="fr-FR">French</option>
              <option value="de-DE">German</option>
              <option value="hi-IN">Hindi</option>
            </select>
          </div>

          {/* Theme Setting */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Theme
            </label>
            <select
              value={settings.theme}
              onChange={(e) => handleSettingChange('theme', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto</option>
            </select>
          </div>

          {/* API URL Setting */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              API URL
            </label>
            <input
              type="text"
              value={settings.apiUrl}
              onChange={(e) => handleSettingChange('apiUrl', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* System Info */}
          {systemInfo && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">System Information</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p><strong>OS:</strong> {systemInfo.os}</p>
                <p><strong>Platform:</strong> {systemInfo.platform}</p>
                <p><strong>Processor:</strong> {systemInfo.processor}</p>
                <p><strong>CPU Usage:</strong> {systemInfo.cpu_percent}%</p>
                <p><strong>Memory:</strong> {(systemInfo.memory.percent).toFixed(1)}%</p>
              </div>
            </div>
          )}

          {/* Save Button */}
          <button
            onClick={saveSettings}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
