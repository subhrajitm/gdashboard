import { DashboardMetrics, UserData, AnalyticsData, PerformanceMetrics, DepartmentData } from '../types';

export const dashboardMetrics: DashboardMetrics = {
  totalRevenue: 1250000,
  activeUsers: 2450,
  conversionRate: 3.2,
  averageOrderValue: 89.99,
};

export const userData: UserData[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@genpact.com',
    role: 'Manager',
    department: 'Operations',
    lastActive: '2024-03-15T10:30:00Z',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@genpact.com',
    role: 'Analyst',
    department: 'Analytics',
    lastActive: '2024-03-15T09:15:00Z',
  },
  // Add more mock users as needed
];

export const analyticsData: AnalyticsData[] = [
  { date: '2024-03-01', value: 1200, category: 'Revenue' },
  { date: '2024-03-02', value: 1350, category: 'Revenue' },
  { date: '2024-03-03', value: 1500, category: 'Revenue' },
  // Add more data points as needed
];

export const performanceMetrics: PerformanceMetrics[] = [
  {
    metricName: 'Customer Satisfaction',
    currentValue: 4.5,
    previousValue: 4.2,
    changePercentage: 7.14,
    trend: 'up',
  },
  {
    metricName: 'Process Efficiency',
    currentValue: 85,
    previousValue: 82,
    changePercentage: 3.66,
    trend: 'up',
  },
  // Add more metrics as needed
];

export const departmentData: DepartmentData[] = [
  {
    id: '1',
    name: 'Operations',
    headCount: 150,
    budget: 5000000,
    projects: 25,
  },
  {
    id: '2',
    name: 'Analytics',
    headCount: 75,
    budget: 2500000,
    projects: 15,
  },
  // Add more departments as needed
]; 