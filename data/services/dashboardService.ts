import { DashboardMetrics, PerformanceData, ShopStatusData, TaskCompletionData } from '../types';

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
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
}

export async function getPerformanceData(): Promise<PerformanceData> {
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
}

export async function getShopStatusData(): Promise<ShopStatusData> {
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
}

export async function getTaskCompletionData(): Promise<TaskCompletionData> {
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
} 