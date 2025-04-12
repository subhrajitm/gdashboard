"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { MessageSquare, Send, X } from "lucide-react"
import Image from "next/image"

interface ChatbotProps {
  isOpen: boolean
  toggleChatbot: () => void
}

interface Message {
  id: number
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function Chatbot({ isOpen, toggleChatbot }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponses = [
        "I'll look into that for you.",
        "Thanks for your question. Let me check that.",
        "I understand what you're asking. Here's what I found.",
        "That's a good question. Let me help you with that.",
        "I'm processing your request now.",
      ]

      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)]

      const botMessage: Message = {
        id: messages.length + 2,
        text: randomResponse,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <>
      <div className={`chatbot-toggle ${isOpen ? "hidden" : ""}`} onClick={toggleChatbot}>
        <MessageSquare className="text-[#161916]" />
      </div>

      <div className={`chatbot-container ${!isOpen ? "chatbot-hidden" : ""}`}>
        <div className="chatbot-header">
          <div className="flex items-center">
            <Image src="/genpact-logo.svg" alt="Genpact" width={24} height={24} className="mr-2" />
            <span>Genpact Assistant</span>
          </div>
          <button className="text-[#161916] hover:text-[#303030]" onClick={toggleChatbot}>
            <X size={18} />
          </button>
        </div>

        <div className="chatbot-messages">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.sender === "user" ? "message-user" : "message-bot"}`}>
              {message.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="chatbot-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleSendMessage}>
            <Send size={16} className="text-[#161916]" />
          </button>
        </div>
      </div>
    </>
  )
}
