"use client"

import React, { useState, useRef, useEffect } from 'react';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isDocked, setIsDocked] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", sender: "bot" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  
  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;
    
    // Add user message
    const newUserMessage = { id: messages.length + 1, text: inputValue, sender: "user" };
    setMessages([...messages, newUserMessage]);
    setInputValue("");
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponses = [
        "I'm looking into that for you.",
        "Let me check the dashboard data for more information.",
        "I can help you with that. What specific details do you need?",
        "Based on the recent data, I recommend reviewing the shop status page.",
        "The billing performance has improved by 2% since last month."
      ];
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      const newBotMessage = { id: messages.length + 2, text: randomResponse, sender: "bot" };
      setMessages(prevMessages => [...prevMessages, newBotMessage]);
    }, 1000);
  };
  
  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
    if (isDocked) setIsDocked(false);
  };
  
  const toggleDock = () => {
    setIsDocked(!isDocked);
    if (isMaximized) setIsMaximized(false);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-[#FF4F59] text-white p-4 rounded-full shadow-lg hover:bg-[#e64550] transition-all z-50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </button>
    );
  }
  
  return (
    <div 
      className={`
        fixed bg-[#161916] border border-[#282A27] rounded-lg shadow-xl z-50 transition-all duration-300 overflow-hidden
        ${isMaximized ? 'inset-4' : isDocked ? 'top-24 bottom-24 right-4 w-96' : 'bottom-6 right-6 w-96 h-[500px]'}
      `}
    >
      <div className="flex flex-col h-full">
        {/* Chat header */}
        <div className="flex items-center justify-between p-4 border-b border-[#282A27] bg-[#1d1f1d] rounded-t-lg">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-[#FF4F59] flex items-center justify-center text-white mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <h3 className="text-[#FFFAF4] font-medium">SMBA Assistant</h3>
          </div>
          
          {/* Controls remain the same */}
        </div>
        
        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.sender === 'user' 
                    ? 'bg-[#FF4F59] text-white rounded-tr-none' 
                    : 'bg-[#282A27] text-[#FFFAF4] rounded-tl-none'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Chat input */}
        <div className="border-t border-[#282A27] p-4">
          <div className="flex items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-grow bg-[#1d1f1d] text-[#FFFAF4] p-3 rounded-l-lg focus:outline-none placeholder:text-gray-400 h-12"
            />
            <button
              onClick={handleSendMessage}
              className="bg-[#FF4F59] text-white p-3 rounded-r-lg hover:bg-[#e64550] transition-colors h-12 flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
