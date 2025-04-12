"use client"

import { useState, useEffect } from "react"
import Dashboard from "@/components/Dashboard"
import Sidebar from "@/components/Sidebar"
import Header from "@/components/Header"
import Chatbot from "@/components/Chatbot"

export default function Home() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [chatbotOpen, setChatbotOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true)
      }
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const toggleChatbot = () => {
    setChatbotOpen(!chatbotOpen)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <div className="dashboard-container">
      <Sidebar
        collapsed={sidebarCollapsed}
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />
      <div
        className="main-content"
        style={{
          marginLeft: isMobile ? "0" : sidebarCollapsed ? "var(--sidebar-width-collapsed)" : "auto",
          width: isMobile
            ? "100%"
            : sidebarCollapsed
              ? `calc(100% - var(--sidebar-width-collapsed))`
              : `calc(100% - var(--sidebar-width))`,
        }}
      >
        <Header toggleSidebar={toggleSidebar} toggleMobileMenu={toggleMobileMenu} sidebarCollapsed={sidebarCollapsed} />
        <Dashboard />
      </div>
      <Chatbot isOpen={chatbotOpen} toggleChatbot={toggleChatbot} />
    </div>
  )
}
