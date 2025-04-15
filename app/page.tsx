"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  Point,
} from 'chart.js';
import { getDashboardMetrics, getPerformanceData, getShopStatusData, getTaskCompletionData } from '@/data/services/dashboardService';
import { DashboardMetrics, PerformanceData, ShopStatusData, TaskCompletionData } from '@/data/types';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface KPIData {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
}

const defaultPerformanceData: ChartData<'line', (number | Point | null)[], unknown> = {
  labels: [],
  datasets: []
};

const defaultShopStatusData: ChartData<'doughnut', number[], unknown> = {
  labels: [],
  datasets: []
};

const defaultTaskCompletionData: ChartData<'bar', number[], unknown> = {
  labels: [],
  datasets: []
};

export default function Dashboard() {
  const [kpiData, setKpiData] = useState<KPIData[]>([]);
  const [performanceData, setPerformanceData] = useState<ChartData<'line', (number | Point | null)[], unknown>>(defaultPerformanceData);
  const [shopStatusData, setShopStatusData] = useState<ChartData<'doughnut', number[], unknown>>(defaultShopStatusData);
  const [taskCompletionData, setTaskCompletionData] = useState<ChartData<'bar', number[], unknown>>(defaultTaskCompletionData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          metrics,
          performance,
          shopStatus,
          taskCompletion
        ] = await Promise.all([
          getDashboardMetrics(),
          getPerformanceData(),
          getShopStatusData(),
          getTaskCompletionData()
        ]);

        setKpiData([
          { 
            title: "Total Shops", 
            value: metrics.totalShops.toString(), 
            change: metrics.totalShopsChange, 
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            )
          },
          { 
            title: "Billing Performance", 
            value: `${metrics.billingPerformance}%`, 
            change: metrics.billingPerformanceChange, 
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="20" x2="12" y2="10"></line>
                <line x1="18" y1="20" x2="18" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="16"></line>
              </svg>
            )
          },
          { 
            title: "Service Visits", 
            value: metrics.serviceVisits.toString(), 
            change: metrics.serviceVisitsChange, 
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            )
          },
          { 
            title: "Pending Tasks", 
            value: metrics.pendingTasks.toString(), 
            change: metrics.pendingTasksChange, 
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            )
          }
        ]);

        setPerformanceData(performance as ChartData<'line', (number | Point | null)[], unknown>);
        setShopStatusData(shopStatus as ChartData<'doughnut', number[], unknown>);
        setTaskCompletionData(taskCompletion as ChartData<'bar', number[], unknown>);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Chart options
  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: { color: '#FFFAF4' }
      },
    },
    scales: {
      y: {
        min: 70,
        max: 100,
        ticks: { color: '#FFFAF4' },
        grid: { color: 'rgba(255, 250, 244, 0.1)' }
      },
      x: {
        ticks: { color: '#FFFAF4' },
        grid: { color: 'rgba(255, 250, 244, 0.1)' }
      }
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: { color: '#FFFAF4' }
      },
    },
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: { color: '#FFFAF4' }
      },
    },
    scales: {
      y: {
        ticks: { color: '#FFFAF4' },
        grid: { color: 'rgba(255, 250, 244, 0.1)' }
      },
      x: {
        ticks: { color: '#FFFAF4' },
        grid: { color: 'rgba(255, 250, 244, 0.1)' }
      }
    },
  };

  // Recent activity data
  const recentActivity = [
    { id: 1, action: "Shop3 service visit completed", time: "2 hours ago", status: "completed" },
    { id: 2, action: "New billing report available", time: "5 hours ago", status: "info" },
    { id: 3, action: "Shop1 has 2 pending tasks", time: "Yesterday", status: "pending" },
    { id: 4, action: "Monthly performance review", time: "2 days ago", status: "info" },
  ];

  return (
    <div className="container mx-auto p-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiData.map((kpi, index) => (
          <div key={index} className="bg-[#161916] p-6 rounded-lg shadow-md border border-[#282A27] hover:border-[#FF4F59] transition-colors">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[#FFFAF4] opacity-80 mb-1">{kpi.title}</p>
                <h3 className="text-3xl font-bold text-[#FFFAF4]">{kpi.value}</h3>
                <span className={`text-sm ${kpi.change.startsWith('+') ? 'text-green-400' : 'text-[#FF4F59]'}`}>
                  {kpi.change} from last month
                </span>
              </div>
              <div className="p-3 bg-[#1d1f1d] rounded-lg text-[#FF4F59]">
                {kpi.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Performance Trend */}
        <div className="bg-[#161916] p-6 rounded-lg shadow-md border border-[#282A27]">
          <h3 className="text-xl font-bold text-[#FFFAF4] mb-4">Billing Performance Trend</h3>
          <div className="h-80">
            <Line data={performanceData} options={lineOptions} />
          </div>
        </div>

        {/* Shop Status */}
        <div className="bg-[#161916] p-6 rounded-lg shadow-md border border-[#282A27]">
          <h3 className="text-xl font-bold text-[#FFFAF4] mb-4">Shop Status Overview</h3>
          <div className="h-80 flex items-center justify-center">
            <Doughnut data={shopStatusData} options={doughnutOptions} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Task Completion */}
        <div className="bg-[#161916] p-6 rounded-lg shadow-md border border-[#282A27] lg:col-span-2">
          <h3 className="text-xl font-bold text-[#FFFAF4] mb-4">Monthly Task Completion</h3>
          <div className="h-80">
            <Bar data={taskCompletionData} options={barOptions} />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-[#161916] p-6 rounded-lg shadow-md border border-[#282A27]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-[#FFFAF4]">Recent Activity</h3>
            <Link href="/notifications" className="text-[#FF4F59] hover:underline text-sm">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="border-l-4 pl-4 py-2" 
                style={{ 
                  borderColor: activity.status === 'completed' 
                    ? '#4CAF50' 
                    : activity.status === 'pending' 
                      ? '#FFAD28' 
                      : '#FF4F59' 
                }}>
                <p className="text-[#FFFAF4]">{activity.action}</p>
                <p className="text-[#FFFAF4] opacity-60 text-sm">{activity.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
