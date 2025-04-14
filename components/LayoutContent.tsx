"use client"

import { usePathname } from "next/navigation"
import Sidebar from "./Sidebar"
import Header from "./Header"

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdminPage = pathname?.startsWith("/admin") || pathname?.startsWith("/settings")

  return (
    <div className="flex">
      {!isAdminPage && <Sidebar />}
      <div className={`${!isAdminPage ? "ml-64" : ""} flex-1`}>
        {!isAdminPage && <Header />}
        <main className="dark:bg-midnight light:bg-sunrise-white">
          {children}
        </main>
      </div>
    </div>
  )
} 