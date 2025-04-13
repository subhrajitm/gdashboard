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
        className="fixed bottom-6 right-6 bg-coral text-white p-4 rounded-full shadow-lg hover:bg-[#e64550] transition-all z-50"
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
        fixed bg-[#282A27] dark:bg-[#282A27] light:bg-[#FFF2DF] border dark:border-first-light-2 light:border-first-light-2 rounded-lg shadow-xl z-50 transition-all duration-300 overflow-hidden
        ${isMaximized ? 'inset-4' : isDocked ? 'top-24 bottom-24 right-4 w-96' : 'bottom-6 right-6 w-96 h-[500px]'}
      `}
    >
      <div className="flex flex-col h-full">
        {/* Chat header */}
        <div className="flex items-center justify-between p-4 border-b dark:border-first-light-2 light:border-first-light-2 bg-[#1d1f1d] dark:bg-[#1d1f1d] light:bg-[#FFF2DF] rounded-t-lg">
          {/* Rest of header content */}
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-coral flex items-center justify-center text-white mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <h3 className="dark:text-sunrise-white light:text-midnight font-medium">SMBA Assistant</h3>
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={toggleDock}
              className={`p-1.5 rounded hover:bg-first-light-2 transition-colors ${isDocked ? 'text-coral' : 'dark:text-sunrise-white light:text-midnight'}`}
              title={isDocked ? "Undock" : "Dock to side"}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                <rect x="9" y="9" width="6" height="6"></rect>
                <line x1="9" y1="1" x2="9" y2="4"></line>
                <line x1="15" y1="1" x2="15" y2="4"></line>
                <line x1="9" y1="20" x2="9" y2="23"></line>
                <line x1="15" y1="20" x2="15" y2="23"></line>
                <line x1="20" y1="9" x2="23" y2="9"></line>
                <line x1="20" y1="14" x2="23" y2="14"></line>
                <line x1="1" y1="9" x2="4" y2="9"></line>
                <line x1="1" y1="14" x2="4" y2="14"></line>
              </svg>
            </button>
            
            <button 
              onClick={toggleMaximize}
              className={`p-1.5 rounded hover:bg-first-light-2 transition-colors ${isMaximized ? 'text-coral' : 'dark:text-sunrise-white light:text-midnight'}`}
              title={isMaximized ? "Minimize" : "Maximize"}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {isMaximized ? (
                  <>
                    <polyline points="4 14 10 14 10 20"></polyline>
                    <polyline points="20 10 14 10 14 4"></polyline>
                    <line x1="14" y1="10" x2="21" y2="3"></line>
                    <line x1="3" y1="21" x2="10" y2="14"></line>
                  </>
                ) : (
                  <>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <polyline points="9 21 3 21 3 15"></polyline>
                    <line x1="21" y1="3" x2="14" y2="10"></line>
                    <line x1="3" y1="21" x2="10" y2="14"></line>
                  </>
                )}
              </svg>
            </button>
            
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded hover:bg-first-light-2 dark:text-sunrise-white light:text-midnight transition-colors"
              title="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
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
                    ? 'bg-coral text-white rounded-tr-none' 
                    : 'dark:bg-first-light-2 light:bg-[#e6e0d4] dark:text-sunrise-white light:text-midnight rounded-tl-none'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Chat input */}
        <div className="border-t dark:border-first-light-2 light:border-first-light-2 p-4">
          <div className="flex items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-grow dark:bg-[#181C23] light:bg-[#FFFAF4] dark:text-[#FFFAF4] light:text-[#181C23] p-3 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-coral placeholder:dark:text-gray-500 placeholder:light:text-gray-400 h-12"
            />
            <button
              onClick={handleSendMessage}
              className="bg-coral text-white p-3 rounded-r-lg hover:bg-[#e64550] transition-colors h-12 flex items-center justify-center"
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
