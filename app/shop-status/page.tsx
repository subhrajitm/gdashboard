"use client"

import React from "react"

export default function ShopStatusPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Shop Status</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-[#212121] rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-white">Active Shops</h2>
          <div className="text-4xl font-bold text-[#ff4f59]">24</div>
          <p className="text-gray-400 mt-2">+2 from last week</p>
        </div>
        
        <div className="bg-[#212121] rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-white">Inactive Shops</h2>
          <div className="text-4xl font-bold text-yellow-500">3</div>
          <p className="text-gray-400 mt-2">-1 from last week</p>
        </div>
        
        <div className="bg-[#212121] rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-white">Total Shops</h2>
          <div className="text-4xl font-bold text-blue-500">27</div>
          <p className="text-gray-400 mt-2">+1 from last week</p>
        </div>
      </div>
      
      <div className="mt-8 bg-[#212121] rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-white">Shop Status Overview</h2>
        <div className="h-80 flex items-center justify-center border border-gray-700 rounded-lg">
          <p className="text-gray-400">Shop status chart will be displayed here</p>
        </div>
      </div>
    </div>
  )
}