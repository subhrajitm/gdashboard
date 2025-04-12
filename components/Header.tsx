"use client"

import { Bell, Search, Menu, ChevronLeft, ChevronRight } from "lucide-react"

interface HeaderProps {
  toggleSidebar: () => void
  toggleMobileMenu: () => void
  sidebarCollapsed: boolean
}

export default function Header({ toggleSidebar, toggleMobileMenu, sidebarCollapsed }: HeaderProps) {
  return (
    <header className="header">
      <button className="md:hidden mr-4 text-white" onClick={toggleMobileMenu}>
        <Menu />
      </button>

      <button
        className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-[#212121] text-white mr-4 hover:bg-[#303030] transition-colors"
        onClick={toggleSidebar}
        aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      <h1 className="text-xl font-bold">Dashboard</h1>

      <div className="ml-auto flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="bg-[#212121] text-white rounded-full py-2 px-4 pl-10 text-sm focus:outline-none focus:ring-1 focus:ring-[#ff4f59] w-[200px]"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        </div>

        <button className="relative p-2 rounded-full hover:bg-[#212121] transition-colors">
          <Bell className="text-white w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#ff4f59] rounded-full"></span>
        </button>

        <div className="flex items-center">
          <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#ff4f59] to-[#ff727a] flex items-center justify-center">
            <span className="text-[#161916] font-medium">JD</span>
          </div>
        </div>
      </div>
    </header>
  )
}
