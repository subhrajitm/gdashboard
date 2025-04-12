"use client"

import React from "react"

export default function Home() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#212121] rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-white">Active Shops</h2>
          <div className="text-4xl font-bold text-[#ff4f59]">24</div>
          <p className="text-gray-400 mt-2">+2 from last week</p>
        </div>
        
        <div className="bg-[#212121] rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-white">Total Revenue</h2>
          <div className="text-4xl font-bold text-green-500">$124,856</div>
          <p className="text-gray-400 mt-2">+8.2% from last month</p>
        </div>
        
        <div className="bg-[#212121] rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-white">Pending Tasks</h2>
          <div className="text-4xl font-bold text-yellow-500">12</div>
          <p className="text-gray-400 mt-2">-2 from last week</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#212121] rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-white">Performance Overview</h2>
          <div className="h-80 flex items-center justify-center border border-gray-700 rounded-lg">
            <p className="text-gray-400">Performance chart will be displayed here</p>
          </div>
        </div>
        
        <div className="bg-[#212121] rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-white">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex items-center p-3 border border-gray-700 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mr-3">
                  <span className="text-white font-medium">{item}</span>
                </div>
                <div>
                  <h3 className="font-medium text-white">Activity {item}</h3>
                  <p className="text-sm text-gray-400">Updated {item} hour{item !== 1 ? 's' : ''} ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
