"use client"

import React from "react"

export default function BillingPerformancePage() {
  // Create fixed data for shops to avoid hydration errors
  const shopData = [
    { id: 1, revenue: 5743.19, growth: 8.2 },
    { id: 2, revenue: 4982.50, growth: 6.7 },
    { id: 3, revenue: 3871.25, growth: 5.3 },
    { id: 4, revenue: 6254.80, growth: 9.1 },
    { id: 5, revenue: 4125.60, growth: 7.4 }
  ]

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Overall Billing Performance</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#212121] rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-white">Total Revenue</h2>
          <div className="text-4xl font-bold text-green-500">$124,856</div>
          <p className="text-gray-400 mt-2">+8.2% from last month</p>
        </div>
        
        <div className="bg-[#212121] rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-white">Average Billing</h2>
          <div className="text-4xl font-bold text-[#ff4f59]">$4,624</div>
          <p className="text-gray-400 mt-2">+3.1% from last month</p>
        </div>
        
        <div className="bg-[#212121] rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-white">Pending Invoices</h2>
          <div className="text-4xl font-bold text-yellow-500">12</div>
          <p className="text-gray-400 mt-2">-2 from last month</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#212121] rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-white">Monthly Revenue Trend</h2>
          <div className="h-80 flex items-center justify-center border border-gray-700 rounded-lg">
            <p className="text-gray-400">Revenue chart will be displayed here</p>
          </div>
        </div>
        
        <div className="bg-[#212121] rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-white">Top Performing Shops</h2>
          <div className="space-y-4">
            {shopData.map((shop) => (
              <div key={shop.id} className="flex items-center justify-between p-3 border border-gray-700 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mr-3">
                    <span className="text-white font-medium">{shop.id}</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Shop {shop.id}</h3>
                    <p className="text-sm text-gray-400">ID: SH-{1000 + shop.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-white">${shop.revenue.toFixed(2)}</div>
                  <div className="text-sm text-green-500">+{shop.growth.toFixed(1)}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}