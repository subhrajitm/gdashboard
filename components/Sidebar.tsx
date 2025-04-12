"use client"

import { useState } from "react"
import { BarChart2, Activity } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface SidebarProps {
  collapsed: boolean
  mobileOpen: boolean
  onCloseMobile: () => void
}

export default function Sidebar({ collapsed, mobileOpen, onCloseMobile }: SidebarProps) {
  const [activeItem, setActiveItem] = useState("shop-status")

  const menuItems = [
    { id: "shop-status", label: "Shop Status", icon: Activity },
    { id: "billing-performance", label: "Overall Billing Performance", icon: BarChart2 },
  ]

  return (
    <div className={cn("sidebar", collapsed && "collapsed", mobileOpen ? "open" : "", "md:transform-none")}>
      <div className="sidebar-header">
        <div className="flex items-center">
          {collapsed ? (
            <div className="w-10 h-10 flex items-center justify-center">
              <Image src="/genpact-logo.svg" alt="Genpact" width={32} height={32} className="min-w-[32px]" />
            </div>
          ) : (
            <div className="flex items-center">
              <Image src="/genpact-logo.svg" alt="Genpact" width={130} height={40} className="min-w-[130px]" />
            </div>
          )}
        </div>
      </div>
      <div className="sidebar-content">
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  className={cn(
                    "flex items-center w-full p-3 rounded-md transition-colors",
                    activeItem === item.id
                      ? "bg-[#212121] text-[#ff4f59] border-l-4 border-[#ff4f59]"
                      : "text-white hover:bg-[#212121]",
                    collapsed ? "justify-center" : "",
                  )}
                  onClick={() => setActiveItem(item.id)}
                >
                  <item.icon className={cn("w-5 h-5", activeItem === item.id ? "text-[#ff4f59]" : "")} />
                  {!collapsed && (
                    <span className="ml-3 transition-opacity duration-200 whitespace-nowrap overflow-hidden text-ellipsis">
                      {item.label}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}
