import React from 'react';

const ChatInterface = ({ messages, messagesEndRef, loading }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex message-enter ${
            message.sender === 'user' ? 'justify-end' : 'justify-start'
          }`}
        >
          <div
            className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
              message.sender === 'user'
                ? 'bg-blue-600 text-white rounded-br-none'
                : 'bg-gray-200 text-gray-900 rounded-bl-none'
            }`}
          >
            <p className="text-sm">{message.text}</p>
            <span className="text-xs opacity-70 mt-1 block">
              {message.timestamp.toLocaleTimeString()}
            </span>
          </div>
        </div>
      ))}

      {loading && (
        <div className="flex justify-start">
          <div className="bg-gray-200 text-gray-900 px-4 py-3 rounded-lg rounded-bl-none">
            <div className="flex items-center gap-2">
              <div className="loading-spinner"></div>
              <span className="text-sm">Thinking...</span>
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatInterface;
