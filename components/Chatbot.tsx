"use client"

import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function ChatBot() {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isDocked, setIsDocked] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [width, setWidth] = useState(360);
  const dragRef = useRef<HTMLDivElement>(null);
  const startWidth = useRef(360);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", sender: "bot" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  
  // Initialize after mount
  useEffect(() => {
    setMounted(true);
  }, []);
  
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
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    if (!isDocked) return;
    setIsResizing(true);
    startWidth.current = width;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isResizing && isDocked) {
      const delta = e.clientX - startWidth.current;
      const newWidth = Math.max(300, Math.min(800, startWidth.current + delta));
      setWidth(newWidth);
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
    if (isDocked) setIsDocked(false);
  };

  const toggleDock = () => {
    setIsDocked(!isDocked);
    if (isMaximized) setIsMaximized(false);
    if (!isDocked) {
      setWidth(360); // Reset width when docking
    }
  };

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  // Reset when closing
  const handleClose = () => {
    setIsOpen(false);
    setIsMaximized(false);
    setIsDocked(false);
    setWidth(360);
  };

  // Don't render anything until mounted
  if (!mounted) {
    return null;
  }

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-[#FF4F59] text-[#FFFAF4] p-4 rounded-full shadow-lg hover:bg-[#e64550] transition-all z-50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </button>
    );
  }

  return (
    <div
      ref={dragRef}
      className={`fixed transition-all duration-300 ease-in-out ${
        isMaximized 
          ? 'inset-0 w-full h-full z-50 rounded-none' 
          : isDocked
            ? 'top-0 right-0 h-full z-40'
            : 'w-[360px] h-[500px] z-40'
      }`}
      style={{
        left: isMaximized ? '0' : isDocked ? 'auto' : 'auto',
        right: isMaximized ? '0' : isDocked ? '0' : '20px',
        top: isMaximized ? '0' : isDocked ? '0' : 'auto',
        bottom: isMaximized ? '0' : isDocked ? '0' : '20px',
        width: isMaximized ? '100%' : isDocked ? `${width}px` : '360px',
        height: isMaximized ? '100%' : isDocked ? '100%' : '500px',
        transform: isMaximized ? 'none' : isDocked ? 'none' : 'translateY(0)',
      }}
    >
      <div className={`h-full flex flex-col bg-[#161916] dark:bg-[#161916] light:bg-[#FFFAF4] shadow-lg border border-[#282A27] ${
        isMaximized ? 'rounded-none' : isDocked ? 'rounded-r-none rounded-l-lg' : 'rounded-lg'
      }`}>
        <div className="chatbot-header flex justify-between items-center p-4">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-full bg-[#FF4F59] flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold dark:text-[#FFFAF4] light:text-[#181C23]">SMBA Assistant</h3>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleDock}
              className={`text-[#FFFAF4] hover:text-[#FF4F59] transition-colors p-2 rounded-full hover:bg-[#1d1f1d] flex items-center justify-center ${
                isDocked ? 'text-[#FF4F59]' : ''
              }`}
              title={isDocked ? "Undock" : "Dock to side"}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
              className="text-[#FFFAF4] hover:text-[#FF4F59] transition-colors p-2 rounded-full hover:bg-[#1d1f1d] flex items-center justify-center"
              title={isMaximized ? "Minimize" : "Maximize"}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
              onClick={handleClose}
              className="text-[#FFFAF4] hover:text-[#FF4F59] transition-colors p-2 rounded-full hover:bg-[#1d1f1d] flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`${
                    message.sender === 'user' 
                      ? 'bg-[#FF4F59] text-[#FFFAF4] rounded-tr-none' 
                      : 'bg-[#1d1f1d] text-[#FFFAF4] rounded-tl-none'
                  } rounded-lg p-3 max-w-[80%]`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          <div ref={messagesEndRef} />
        </div>
        <div className="p-4 border-t border-[#282A27]">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 bg-[#1d1f1d] dark:bg-[#1d1f1d] light:bg-[#FFF2DF] px-4 py-2 rounded-lg border border-[#282A27] focus:outline-none focus:border-[#FF4F59] dark:text-[#FFFAF4] light:text-[#181C23]"
            />
            <button 
              onClick={handleSendMessage}
              className="p-2 bg-[#FF4F59] text-[#FFFAF4] rounded-lg hover:bg-[#e64550] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
        {isDocked && (
          <div 
            className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-[#FF4F59] transition-colors"
            onMouseDown={handleResizeMouseDown}
          />
        )}
      </div>
    </div>
  );
}