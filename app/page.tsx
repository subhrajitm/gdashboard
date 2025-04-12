"use client"

import React from "react"
import Link from "next/link"
import { useState } from "react"
import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { useNotification } from "../context/NotificationContext"

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const { addNotification } = useNotification()
  
  // Sample shop data for the dashboard
  const shopData = [
    { shop: "Shop2", totalSV: 16, pastDue: 0, upcoming: 3, noDue: 13 },
    { shop: "Shop1", totalSV: 27, pastDue: 2, upcoming: 5, noDue: 20 },
    { shop: "Shop3", totalSV: 16, pastDue: 1, upcoming: 0, noDue: 15 },
  ]
  
  // Sample billing performance data
  const billingData = {
    labels: ['Shop1', 'Shop2', 'Shop3', 'Shop4'],
    datasets: [
      {
        label: 'On Time',
        data: [85, 75, 82, 70],
        backgroundColor: '#FF4F59',
      },
      {
        label: 'Late',
        data: [15, 25, 18, 30],
        backgroundColor: '#444744',
      }
    ]
  }
  
  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
        ticks: { color: '#FFFAF4' },
        grid: { color: 'rgba(255, 250, 244, 0.1)' }
      },
      y: {
        stacked: true,
        ticks: { color: '#FFFAF4' },
        grid: { color: 'rgba(255, 250, 244, 0.1)' }
      }
    },
    plugins: {
      legend: {
        position: 'top',
        labels: { color: '#FFFAF4' }
      }
    }
  }
  
  return (
    <div>
      {/* <h1 className="text-2xl font-bold mb-6 text-[#FFFAF4]">Overview</h1> */}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Shop Status Summary */}
        <div className="bg-[#161916] rounded-lg p-6 shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-[#FFFAF4]">Shop Status</h2>
            <Link href="/shop-status" className="text-[#FF4F59] hover:underline text-sm">
              View Details →
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-[#6D706B]">
                  <th className="text-left py-3 px-4 font-medium text-sm text-[#FFFAF4]">Shop</th>
                  <th className="text-center py-3 px-4 font-medium text-sm text-[#FFFAF4]">Total</th>
                  <th className="text-center py-3 px-4 font-medium text-sm text-[#FFAD28]">Past Due</th>
                  <th className="text-center py-3 px-4 font-medium text-sm text-[#FFF2DF]">Upcoming</th>
                </tr>
              </thead>
              <tbody>
                {shopData.map((row, index) => (
                  <tr key={index} className="border-b border-[#282A27]">
                    <td className="py-2 px-4 text-[#FFFAF4]">{row.shop}</td>
                    <td className="py-2 px-4 text-center text-[#FFFAF4]">{row.totalSV}</td>
                    <td className="py-2 px-4 text-center text-[#FFFAF4]">{row.pastDue}</td>
                    <td className="py-2 px-4 text-center text-[#FFFAF4]">{row.upcoming}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Billing Performance Summary */}
        <div className="bg-[#161916] rounded-lg p-6 shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-[#FFFAF4]">Billing Performance</h2>
            <Link href="/billing-performance" className="text-[#FF4F59] hover:underline text-sm">
              View Details →
            </Link>
          </div>
          
          <div className="h-64">
            <Bar data={billingData} options={barOptions} />
          </div>
          
          <div className="flex justify-center mt-4 space-x-6">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-[#FF4F59] mr-2"></div>
              <span className="text-sm text-[#FFFAF4]">On Time</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-[#444744] mr-2"></div>
              <span className="text-sm text-[#FFFAF4]">Late</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Link href="/shop-status" className="bg-[#161916] hover:bg-[#282A27] rounded-md p-5 text-center transition-colors flex flex-col justify-center items-center h-24">
          <h3 className="text-lg font-medium text-[#FFFAF4] mb-2">Shop Status</h3>
          <p className="text-sm text-[#FFFAF4] opacity-75">View detailed shop status and queue information</p>
        </Link>
        
        <Link href="/billing-performance" className="bg-[#161916] hover:bg-[#282A27] rounded-md p-5 text-center transition-colors flex flex-col justify-center items-center h-24">
          <h3 className="text-lg font-medium text-[#FFFAF4] mb-2">Billing Performance</h3>
          <p className="text-sm text-[#FFFAF4] opacity-75">Analyze billing timeliness and performance metrics</p>
        </Link>
        
        <Link href="/reports" className="bg-[#161916] hover:bg-[#282A27] rounded-md p-5 text-center transition-colors flex flex-col justify-center items-center h-24">
          <h3 className="text-lg font-medium text-[#FFFAF4] mb-2">Reports</h3>
          <p className="text-sm text-[#FFFAF4] opacity-75">Access detailed reports and analytics</p>
        </Link>
      </div>
    </div>
  )
}
