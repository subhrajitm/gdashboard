"use client"

import React, { useState, useRef, useEffect } from 'react';
import { useNotification } from '../context/NotificationContext';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! How can I help you today?", isUser: false, timestamp: new Date() }
  ]);
  const [inputText, setInputText] = useState("");
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { addNotification } = useNotification();

  // Add this near your other refs
  const lastMessageNotified = useRef<string | null>(null);

  // Auto-scroll to bottom of messages and handle unread count
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
    
    // Only show notification for new bot messages when chat is closed
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && !lastMessage.isUser && !isOpen && messages.length > 1) {
      // Use a ref to track if we've already shown a notification for this message
      if (!lastMessageNotified.current || lastMessageNotified.current !== lastMessage.text) {
        setUnreadCount(prev => prev + 1);
        // Show notification for new message
        addNotification(lastMessage.text, 'info');
        lastMessageNotified.current = lastMessage.text;
      }
    }
  }, [messages, isOpen]);  // Remove addNotification from dependencies

  // Reset unread count when opening chat
  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
    }
  }, [isOpen]);

  const handleSendMessage = () => {
    if (inputText.trim() === "") return;
    
    // Add user message
    const userMessage: Message = {
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponses = [
        "I'll look into that for you.",
        "Let me check the latest data on that.",
        "I can help you with billing performance analysis.",
        "Would you like me to show you the shop status details?",
        "Is there anything specific about the reports you'd like to know?"
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage: Message = {
        text: randomResponse,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#FF4F59] text-[#FFFAF4] rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-[#e64550] transition-colors relative"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            {unreadCount > 0 && (
              <div className="absolute -top-1 -right-1 bg-[#FFAD28] text-[#161916] rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {unreadCount}
              </div>
            )}
          </>
        )}
      </button>
      
      {/* Chat window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 h-96 bg-[#161916] rounded-md shadow-xl border border-[#282A27] flex flex-col overflow-hidden">
          {/* Header - Updated styling */}
          <div className="bg-[#282A27] px-4 py-3 flex justify-between items-center border-b border-[#444744]">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-[#FF4F59] rounded-full mr-2"></div>
              <h3 className="text-[#FFFAF4] font-medium">Genpact Assistant</h3>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-[#FFFAF4] hover:text-[#FF4F59] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`mb-3 flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-lg px-3 py-2 ${
                    message.isUser 
                      ? 'bg-[#FF4F59] text-[#FFFAF4]' 
                      : 'bg-[#282A27] text-[#FFFAF4]'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1 text-right">
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input */}
          <div className="border-t border-[#282A27] p-3">
            <div className="flex">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 bg-[#282A27] text-[#FFFAF4] rounded-l-md px-3 py-2 focus:outline-none"
              />
              <button
                onClick={handleSendMessage}
                className="bg-[#FF4F59] text-[#FFFAF4] rounded-r-md px-4 hover:bg-[#e64550] transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
