"use client"

import { useRouter } from "next/navigation"
import { FaHome, FaCog, FaSignOutAlt, FaFileAlt, FaBars } from "react-icons/fa"
import Link from "next/link"
import { useState } from "react"

export default function AdminNav() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("adminAuth")
    router.push("/admin/login")
  }

  const navItems = [
    { href: "/admin/dashboard", icon: <FaHome />, label: "Dashboard" },
    { href: "/admin/pages", icon: <FaFileAlt />, label: "Pages" },
    { href: "/admin/settings", icon: <FaCog />, label: "Settings" },
  ]

  return (
    <nav className="bg-[#181C23] border-b border-[#FF4F59]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-white">
                Admin Panel
              </span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-white hover:text-[#FFAD28] hover:border-[#FFAD28] text-sm font-medium transition-colors duration-200"
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-[#FF4F59] hover:bg-[#FF4F59]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF4F59] transition-colors duration-200"
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-[#FFAD28] hover:bg-[#FF4F59]/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#FF4F59] transition-colors duration-200"
            >
              <FaBars className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-[#181C23]">
          <div className="pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-white hover:text-[#FFAD28] hover:border-[#FFAD28] text-base font-medium transition-colors duration-200"
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="block w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-[#FF4F59] hover:text-[#FF4F59]/90 hover:border-[#FF4F59] text-base font-medium transition-colors duration-200"
            >
              <span className="mr-2">
                <FaSignOutAlt />
              </span>
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  )
} 