"use client"

import { useState } from "react"
import { BarChart2, Activity } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface SidebarProps {
  collapsed: boolean
  mobileOpen: boolean
  onCloseMobile: () => void
}

export default function Sidebar({ collapsed, mobileOpen, onCloseMobile }: SidebarProps) {
  const pathname = usePathname()
  
  const menuItems = [
    { id: "shop-status", label: "Shop Status", icon: Activity, href: "/shop-status" },
    { id: "billing-performance", label: "Overall Billing Performance", icon: BarChart2, href: "/billing-performance" },
  ]

  return (
    <div className={cn("sidebar", collapsed && "collapsed", mobileOpen ? "open" : "", "md:transform-none")}>
      <div className="sidebar-header" style={{ minHeight: '120px', display: 'flex', alignItems: 'center' }}>
        <div className="flex items-center">
          {collapsed ? (
            <div className="w-10 h-10 flex items-center justify-center">
              <Link href="/">
                <Image src="/genpact-logo.svg" alt="Genpact" width={32} height={32} className="min-w-[32px]" />
              </Link>
              <div className="mx-2 h-4 w-[1px] bg-white"></div>
              <span className="font-bold text-white">SMBA</span>
            </div>
          ) : (
            <div className="flex items-center">
              <Link href="/">
                <Image src="/genpact-logo.svg" alt="Genpact" width={130} height={40} className="min-w-[130px]" />
              </Link>
              <div className="mx-3 h-6 w-[1px] bg-white"></div>
              <span className="font-bold text-white text-xl">SMBA</span>
            </div>
          )}
        </div>
      </div>
      <div className="sidebar-content">
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <Link href={item.href} className="block">
                  <button
                    className={cn(
                      "flex items-center w-full p-3 rounded-md transition-colors",
                      pathname === item.href
                        ? "bg-[#212121] text-[#ff4f59] border-l-4 border-[#ff4f59]"
                        : "text-white hover:bg-[#212121]",
                      collapsed ? "justify-center" : "",
                    )}
                    onClick={onCloseMobile}
                  >
                    <item.icon className={cn("w-5 h-5", pathname === item.href ? "text-[#ff4f59]" : "")} />
                    {!collapsed && (
                      <span className="ml-3 transition-opacity duration-200 whitespace-nowrap overflow-hidden text-ellipsis">
                        {item.label}
                      </span>
                    )}
                  </button>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}
