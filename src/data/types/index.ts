export interface DashboardMetrics {
  totalRevenue: number;
  activeUsers: number;
  conversionRate: number;
  averageOrderValue: number;
}

export interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  lastActive: string;
}

export interface AnalyticsData {
  date: string;
  value: number;
  category: string;
}

export interface PerformanceMetrics {
  metricName: string;
  currentValue: number;
  previousValue: number;
  changePercentage: number;
  trend: 'up' | 'down' | 'stable';
}

export interface DepartmentData {
  id: string;
  name: string;
  headCount: number;
  budget: number;
  projects: number;
} 