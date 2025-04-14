import { DashboardMetrics, UserData, AnalyticsData, PerformanceMetrics, DepartmentData } from '../types';
import {
  dashboardMetrics as mockDashboardMetrics,
  userData as mockUserData,
  analyticsData as mockAnalyticsData,
  performanceMetrics as mockPerformanceMetrics,
  departmentData as mockDepartmentData,
} from '../mock/dashboardData';

// In a real application, these would be API calls
// For now, we're using mock data

export const getDashboardMetrics = async (): Promise<DashboardMetrics> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockDashboardMetrics;
};

export const getUsers = async (): Promise<UserData[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockUserData;
};

export const getAnalyticsData = async (): Promise<AnalyticsData[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockAnalyticsData;
};

export const getPerformanceMetrics = async (): Promise<PerformanceMetrics[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockPerformanceMetrics;
};

export const getDepartments = async (): Promise<DepartmentData[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockDepartmentData;
};

// Example of how to implement a real API call
/*
export const getDashboardMetrics = async (): Promise<DashboardMetrics> => {
  const response = await fetch('/api/dashboard/metrics');
  if (!response.ok) {
    throw new Error('Failed to fetch dashboard metrics');
  }
  return response.json();
};
*/ 