"use client"

import AdminAuthCheck from "../../components/AdminAuthCheck"
import AdminNav from "../../components/AdminNav"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#181C23]">
      <AdminAuthCheck />
      <AdminNav />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </div>
    </div>
  )
} 