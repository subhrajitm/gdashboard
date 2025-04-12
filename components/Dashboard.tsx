"use client"

import type React from "react"
import { Activity, Users, DollarSign, TrendingUp } from "lucide-react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"
import { Line, Pie } from "react-chartjs-2"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend, Filler)

export default function Dashboard() {
  // Revenue chart data
  const revenueData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Revenue",
        data: [18500, 19200, 18800, 24000, 23000, 25500, 24345],
        borderColor: "#ff4f59",
        backgroundColor: "rgba(255, 79, 89, 0.1)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#ff4f59",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: "Last Week",
        data: [17000, 18500, 17800, 22000, 21500, 23000, 22500],
        borderColor: "rgba(255, 255, 255, 0.3)",
        borderDash: [5, 5],
        tension: 0.4,
        pointRadius: 0,
        fill: false,
      },
    ],
  }

  // Revenue chart options
  const revenueOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "#fff",
          boxWidth: 10,
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: "#212121",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "#303030",
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context: any) => `$${context.raw.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: "#9aa1a7",
        },
      },
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.05)",
          drawBorder: false,
        },
        ticks: {
          color: "#9aa1a7",
          callback: (value: any) => "$" + value.toLocaleString(),
        },
        beginAtZero: true,
      },
    },
  }

  // Traffic sources data
  const trafficData = {
    labels: ["Direct", "Social", "Email", "Organic", "Referral"],
    datasets: [
      {
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          "#ff4f59", // Primary - Genpact red
          "#ffad28", // Secondary - Genpact yellow
          "#00aecf", // Blue
          "#2e872e", // Green
          "#9747FF", // Purple
        ],
        borderColor: "#212121",
        borderWidth: 2,
        hoverOffset: 10,
      },
    ],
  }

  // Traffic chart options
  const trafficOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          color: "#fff",
          boxWidth: 12,
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: "#212121",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "#303030",
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context: any) => `${context.label}: ${context.raw}%`,
        },
      },
    },
  }

  return (
    <div className="content">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Welcome back, John</h2>
        <p className="text-gray-400">Here's what's happening with your projects today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<Activity className="text-[#ff4f59]" />}
          label="Total Revenue"
          value="$24,345"
          change="+2.5%"
          positive={true}
        />
        <StatCard
          icon={<Users className="text-[#ffad28]" />}
          label="Total Users"
          value="1,234"
          change="+5.2%"
          positive={true}
        />
        <StatCard
          icon={<DollarSign className="text-[#00aecf]" />}
          label="Average Order"
          value="$340"
          change="-0.8%"
          positive={false}
        />
        <StatCard
          icon={<TrendingUp className="text-[#2e872e]" />}
          label="Conversion Rate"
          value="2.4%"
          change="+1.2%"
          positive={true}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Revenue Overview</h3>
            <select className="bg-[#303030] text-white border-none rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#ff4f59]">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
          <div className="h-[300px]">
            <Line data={revenueData} options={revenueOptions} />
          </div>
        </div>

        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Traffic Sources</h3>
            <select className="bg-[#303030] text-white border-none rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#ff4f59]">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
          <div className="h-[300px] flex items-center justify-center">
            <Pie data={trafficData} options={trafficOptions} />
          </div>
        </div>
      </div>

      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Recent Activity</h3>
          <button className="text-[#ff4f59] text-sm hover:text-[#ff727a] transition-colors">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-700">
                <th className="pb-3 font-medium">Event</th>
                <th className="pb-3 font-medium">User</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  event: "New order placed",
                  user: "John Doe",
                  date: "Today, 2:30 PM",
                  status: "Completed",
                  statusColor: "green",
                },
                {
                  event: "Payment received",
                  user: "Sarah Smith",
                  date: "Today, 1:45 PM",
                  status: "Completed",
                  statusColor: "green",
                },
                {
                  event: "Order cancelled",
                  user: "Michael Brown",
                  date: "Today, 12:30 PM",
                  status: "Cancelled",
                  statusColor: "red",
                },
                {
                  event: "New user registered",
                  user: "Emily Johnson",
                  date: "Today, 11:15 AM",
                  status: "Completed",
                  statusColor: "green",
                },
                {
                  event: "Payment pending",
                  user: "Robert Wilson",
                  date: "Today, 10:00 AM",
                  status: "Pending",
                  statusColor: "yellow",
                },
              ].map((item, index) => (
                <tr key={index} className="border-b border-gray-800 hover:bg-[#1d1d1d] transition-colors">
                  <td className="py-4">{item.event}</td>
                  <td className="py-4">{item.user}</td>
                  <td className="py-4">{item.date}</td>
                  <td className="py-4">
                    <span
                      className={`px-3 py-1 text-xs rounded-full ${
                        item.statusColor === "green"
                          ? "bg-green-900/30 text-green-400"
                          : item.statusColor === "red"
                            ? "bg-red-900/30 text-red-400"
                            : "bg-yellow-900/30 text-yellow-400"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

interface StatCardProps {
  icon: React.ReactNode
  label: string
  value: string
  change: string
  positive: boolean
}

function StatCard({ icon, label, value, change, positive }: StatCardProps) {
  return (
    <div className="stat-card hover:border-[#303030] border border-transparent transition-colors">
      <div className="flex justify-between">
        <span className="stat-label">{label}</span>
        <div
          className="w-10 h-10 rounded-full bg-opacity-10 flex items-center justify-center"
          style={{ backgroundColor: `${positive ? "rgba(46, 135, 46, 0.1)" : "rgba(255, 79, 89, 0.1)"}` }}
        >
          {icon}
        </div>
      </div>
      <div className="stat-value">{value}</div>
      <div className={`text-sm flex items-center ${positive ? "text-green-400" : "text-red-400"}`}>
        {positive ? (
          <TrendingUp className="w-4 h-4 mr-1" />
        ) : (
          <TrendingUp className="w-4 h-4 mr-1 transform rotate-180" />
        )}
        {change} from last week
      </div>
    </div>
  )
}
