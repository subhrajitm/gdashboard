"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Home() {
  const router = useRouter()
  
  useEffect(() => {
    // Redirect to shop-status page when accessing the root
    router.push("/shop-status")
  }, [router])
  
  // Return a simple loading state while redirecting
  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-6 text-white">Welcome to Genpact Dashboard</h2>
          <p className="text-gray-400 mb-6">Redirecting to Shop Status...</p>
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    </div>
  )
}
