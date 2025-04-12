"use client"

import React, { useState } from "react"

export default function ShopStatusPage() {
  const [activeTab, setActiveTab] = useState("my-queue")
  
  const shopData = [
    { shop: "Shop2", totalSV: 16, pastDue: 0, upcoming: 3, noDue: 13 },
    { shop: "Shop1", totalSV: 27, pastDue: 2, upcoming: 5, noDue: 20 },
    { shop: "Shop3", totalSV: 16, pastDue: 1, upcoming: 0, noDue: 15 },
    { shop: "Total", totalSV: 59, pastDue: 3, upcoming: 8, noDue: 48 }
  ]

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-[#FFFAF4]">Shop Status</h1>
      
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-6 py-3 rounded-md font-medium ${
            activeTab === "my-queue" 
              ? "bg-[#FF4F59] text-[#FFFAF4]" 
              : "bg-[#161916] text-[#FFFAF4] hover:bg-[#282A27]"
          }`}
          onClick={() => setActiveTab("my-queue")}
        >
          My Queue
        </button>
        
        <button
          className={`px-6 py-3 rounded-md font-medium ${
            activeTab === "overall-queue" 
              ? "bg-[#FF4F59] text-[#FFFAF4]" 
              : "bg-[#161916] text-[#FFFAF4] hover:bg-[#282A27]"
          }`}
          onClick={() => setActiveTab("overall-queue")}
        >
          Overall Queue
        </button>
      </div>
      
      <div className="bg-[#161916] rounded-lg p-6 shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-[#6D706B]">
                <th className="text-left py-3 px-4 font-medium text-sm text-[#FFFAF4]">Shop</th>
                <th className="text-center py-3 px-4 font-medium text-sm text-[#FFFAF4]">Total SV</th>
                <th className="text-center py-3 px-4 font-medium text-sm text-[#FFAD28]">Past Due</th>
                <th className="text-center py-3 px-4 font-medium text-sm text-[#FFF2DF]">Upcoming</th>
                <th className="text-center py-3 px-4 font-medium text-sm text-[#FFFAF4]">No Due</th>
              </tr>
            </thead>
            <tbody>
              {shopData.map((row, index) => (
                <tr 
                  key={index} 
                  className={`border-b border-[#282A27] ${index === shopData.length - 1 ? "font-medium" : ""}`}
                >
                  <td className="py-3 px-4 text-[#FFFAF4]">{row.shop}</td>
                  <td className="py-3 px-4 text-center text-[#FFFAF4]">{row.totalSV}</td>
                  <td className="py-3 px-4 text-center text-[#FFFAF4]">{row.pastDue}</td>
                  <td className="py-3 px-4 text-center text-[#FFFAF4]">{row.upcoming}</td>
                  <td className="py-3 px-4 text-center text-[#FFFAF4]">{row.noDue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}