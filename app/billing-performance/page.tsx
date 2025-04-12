"use client"

import React, { useState, useEffect } from "react"
import { Bar, Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export default function BillingPerformancePage() {
  const [activeTab, setActiveTab] = useState("month-over-month")
  
  // Customer data for contract level timeliness
  const customerData = [
    { name: "Customer1", onTime: 10, late: 18 },
    { name: "Customer10", onTime: 7, late: 1 },
    { name: "Customer2", onTime: 8, late: 15 },
    { name: "Customer3", onTime: 0, late: 15 },
    { name: "Customer4", onTime: 55, late: 5 },
    { name: "Customer5", onTime: 60, late: 13 },
    { name: "Customer6", onTime: 5, late: 10 },
    { name: "Customer7", onTime: 0, late: 12 },
    { name: "Customer8", onTime: 30, late: 5 },
    { name: "Customer9", onTime: 1, late: 1 }
  ]
  
  // Delay reasons data
  const delayReasons = [
    { reason: "Audit", onTime: 1, late: 0 },
    { reason: "Capacity (Resource)", onTime: 10, late: 42 },
    { reason: "Capacity (Volume)", onTime: 5, late: 13 },
    { reason: "Commercial Data", onTime: 0, late: 1 },
    { reason: "Cost Accumulation Data", onTime: 0, late: 10 },
    { reason: "Customer/CPM", onTime: 5, late: 27 },
    { reason: "Escalation Data", onTime: 1, late: 0 },
    { reason: "On time", onTime: 85, late: 0 },
    { reason: "Other", onTime: 0, late: 7 },
    { reason: "Training Engine Invoice", onTime: 0, late: 1 }
  ]

  // Month over month data with updated colors from the palette
  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Shop1',
        data: [85, 78, 92, 88, 95, 89],
        borderColor: '#FF4F59', // Genpact Coral
        backgroundColor: 'rgba(255, 79, 89, 0.1)',
        tension: 0.3,
      },
      {
        label: 'Shop2',
        data: [75, 82, 78, 85, 80, 83],
        borderColor: '#282A27', // First light 01
        backgroundColor: 'rgba(40, 42, 39, 0.1)',
        tension: 0.3,
      },
      {
        label: 'Shop3',
        data: [70, 75, 82, 79, 88, 85],
        borderColor: '#6D706B', // First light 03
        backgroundColor: 'rgba(109, 112, 107, 0.1)',
        tension: 0.3,
      },
      {
        label: 'Shop4',
        data: [65, 70, 75, 80, 76, 82],
        borderColor: '#444744', // First light 02
        backgroundColor: 'rgba(68, 71, 68, 0.1)',
        tension: 0.3,
      }
    ]
  }

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#FFFAF4' // Sunrise white
        }
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        min: 60,
        max: 100,
        ticks: {
          color: '#FFFAF4' // Sunrise white
        },
        grid: {
          color: 'rgba(255, 250, 244, 0.1)' // Sunrise white with opacity
        }
      },
      x: {
        ticks: {
          color: '#FFFAF4' // Sunrise white
        },
        grid: {
          color: 'rgba(255, 250, 244, 0.1)' // Sunrise white with opacity
        }
      }
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 3,
        hoverRadius: 5
      }
    }
  }

  const renderContent = () => {
    switch(activeTab) {
      case "month-over-month":
        return (
          <div className="h-80">
            <div className="mb-4 flex justify-between items-center">
              <h3 className="text-lg font-medium">Monthly Timeliness Trend</h3>
              <div className="flex items-center">
                <div className="w-6 h-1 bg-[#FF4F59] mr-2"></div>
                <span className="text-sm">Business TAT (85%)</span>
              </div>
            </div>
            <div className="h-64">
              <Line data={monthlyData} options={lineOptions} />
            </div>
          </div>
        )
      case "contract-level":
        return (
          <div>
            <div className="flex justify-between mb-6">
              <h3 className="text-lg font-medium">Contract Level Performance</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[#444744] mr-2"></div>
                  <span className="text-sm">Late</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[#FF4F59] mr-2"></div>
                  <span className="text-sm">On time</span>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-[#6D706B]">
                    <th className="text-left py-3 px-4 font-medium text-sm">Customer</th>
                    <th className="text-left py-3 px-4 font-medium text-sm">Performance</th>
                    <th className="text-right py-3 px-4 font-medium text-sm">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {customerData.map((customer, index) => (
                    <tr key={index} className="border-b border-[#282A27]">
                      <td className="py-3 px-4 text-sm">{customer.name}</td>
                      <td className="py-3 px-4">
                        <div className="flex-1 h-5 w-full bg-[#161916] rounded-sm overflow-hidden">
                          {customer.late > 0 && (
                            <div 
                              className="bg-[#444744] h-full float-left" 
                              style={{ width: `${(customer.late / (customer.onTime + customer.late)) * 100}%` }}
                            ></div>
                          )}
                          {customer.onTime > 0 && (
                            <div 
                              className="bg-[#FF4F59] h-full float-left" 
                              style={{ width: `${(customer.onTime / (customer.onTime + customer.late)) * 100}%` }}
                            ></div>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right text-sm">{customer.onTime + customer.late}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      case "delay-reason":
        // Prepare data for horizontal bar chart with updated colors
        const barData = {
          labels: delayReasons.map(item => item.reason),
          datasets: [
            {
              label: 'On time',
              data: delayReasons.map(item => item.onTime),
              backgroundColor: '#FF4F59', // Genpact Coral
              borderColor: '#FF4F59',
              borderWidth: 1,
            },
            {
              label: 'Late',
              data: delayReasons.map(item => item.late),
              backgroundColor: '#444744', // First light 02
              borderColor: '#444744',
              borderWidth: 1,
            }
          ]
        }
        
        const barOptions = {
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: 'y' as const,
          plugins: {
            legend: {
              position: 'top' as const,
              labels: {
                color: '#FFFAF4' // Sunrise white
              }
            },
            tooltip: {
              mode: 'index' as const,
              intersect: false,
            },
          },
          scales: {
            x: {
              stacked: true,
              ticks: {
                color: '#FFFAF4' // Sunrise white
              },
              grid: {
                color: 'rgba(255, 250, 244, 0.1)' // Sunrise white with opacity
              }
            },
            y: {
              stacked: true,
              ticks: {
                color: '#FFFAF4' // Sunrise white
              },
              grid: {
                color: 'rgba(255, 250, 244, 0.1)' // Sunrise white with opacity
              }
            }
          }
        }
        
        return (
          <div>
            <div className="flex justify-between mb-6">
              <h3 className="text-lg font-medium">Delay Reasons Analysis</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[#444744] mr-2"></div>
                  <span className="text-sm">Late</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[#FF4F59] mr-2"></div>
                  <span className="text-sm">On time</span>
                </div>
              </div>
            </div>
            <div className="h-80">
              <Bar data={barData} options={barOptions} />
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto p-6">
      {/* <h1 className="text-2xl font-bold mb-6">Overall Billing Performance</h1> */}
      
      <div className="flex space-x-4 mb-6 overflow-x-auto">
        <button
          className={`px-6 py-3 rounded-md font-medium whitespace-nowrap ${
            activeTab === "month-over-month" 
              ? "bg-[#FF4F59] text-[#FFFAF4]" 
              : "bg-[#161916] text-[#FFFAF4] hover:bg-[#282A27]"
          }`}
          onClick={() => setActiveTab("month-over-month")}
        >
          Month Over Month Timeliness
        </button>
        
        <button
          className={`px-6 py-3 rounded-md font-medium whitespace-nowrap ${
            activeTab === "contract-level" 
              ? "bg-[#FF4F59] text-[#FFFAF4]" 
              : "bg-[#161916] text-[#FFFAF4] hover:bg-[#282A27]"
          }`}
          onClick={() => setActiveTab("contract-level")}
        >
          Contract Level Timeliness
        </button>
        
        <button
          className={`px-6 py-3 rounded-md font-medium whitespace-nowrap ${
            activeTab === "delay-reason" 
              ? "bg-[#FF4F59] text-[#FFFAF4]" 
              : "bg-[#161916] text-[#FFFAF4] hover:bg-[#282A27]"
          }`}
          onClick={() => setActiveTab("delay-reason")}
        >
          Delay Reason
        </button>
      </div>
      
      <div className="bg-[#161916] rounded-lg p-6 shadow-md text-[#FFFAF4]">
        {renderContent()}
      </div>
    </div>
  )
}