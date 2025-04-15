import { DashboardMetrics, UserData, AnalyticsData, PerformanceMetrics, DepartmentData, PerformanceData, ShopStatusData, TaskCompletionData } from '../types';
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
  try {
    const response = await fetch('/api/dashboard/metrics');
    if (!response.ok) {
      throw new Error('Failed to fetch dashboard metrics');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching dashboard metrics:', error);
    throw error;
  }
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

export const getPerformanceData = async (): Promise<PerformanceData> => {
  try {
    const response = await fetch('/api/dashboard/performance');
    if (!response.ok) {
      throw new Error('Failed to fetch performance data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching performance data:', error);
    throw error;
  }
};

export const getShopStatusData = async (): Promise<ShopStatusData> => {
  try {
    const response = await fetch('/api/dashboard/shop-status');
    if (!response.ok) {
      throw new Error('Failed to fetch shop status data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching shop status data:', error);
    throw error;
  }
};

export const getTaskCompletionData = async (): Promise<TaskCompletionData> => {
  try {
    const response = await fetch('/api/dashboard/task-completion');
    if (!response.ok) {
      throw new Error('Failed to fetch task completion data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching task completion data:', error);
    throw error;
  }
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