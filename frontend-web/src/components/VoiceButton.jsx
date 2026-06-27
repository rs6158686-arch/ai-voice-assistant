import React, { useRef } from 'react';
import { FaMicrophone, FaStop } from 'react-icons/fa';
import api from '../services/api';

const VoiceButton = ({ onTranscript, isListening, setIsListening, language = 'hi-IN' }) => {
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        await sendAudioToBackend(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsListening(true);
    } catch (error) {
      console.error('माइक्रोफोन एक्सेस denied:', error);
      alert('कृपया माइक्रोफोन की permission दें 🎤');
    }
  };

  const stopListening = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsListening(false);
    }
  };

  const sendAudioToBackend = async (audioBlob) => {
    try {
      const formData = new FormData();
      formData.append('file', audioBlob, 'audio.wav');
      formData.append('language', language);

      const response = await api.post('/voice/transcribe', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.text) {
        console.log('Transcribed:', response.data.text);
        onTranscript(response.data.text);
      }
    } catch (error) {
      console.error('Audio transcribe error:', error);
      alert('Audio को process करने में error आई ❌');
    }
  };

  return (
    <button
      onClick={isListening ? stopListening : startListening}
      className={`px-6 py-2 rounded-lg transition flex items-center gap-2 font-medium ${
        isListening
          ? 'bg-red-600 hover:bg-red-700 text-white pulse'
          : 'bg-purple-600 hover:bg-purple-700 text-white'
      }`}
      title={isListening ? "रोकें" : "बोलें"}
    >
      {isListening ? (
        <>
          <FaStop size={16} className="animate-spin" />
          रोकें
        </>
      ) : (
        <>
          <FaMicrophone size={16} />
          बोलें
        </>
      )}
    </button>
  );
};

export default VoiceButton;