export interface DashboardMetrics {
  totalShops: number;
  totalShopsChange: string;
  billingPerformance: number;
  billingPerformanceChange: string;
  serviceVisits: number;
  serviceVisitsChange: string;
  pendingTasks: number;
  pendingTasksChange: string;
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

export interface PerformanceData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    tension: number;
  }[];
}

export interface ShopStatusData {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
}

export interface TaskCompletionData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
  }[];
}

export interface UserProfile {
  name: string;
  email: string;
  role: string;
  department: string;
  joinDate: string;
  avatar: string;
}

export interface UserActivity {
  id: number;
  action: string;
  date: string;
}

export interface UserSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  darkMode: boolean;
  autoRefresh: boolean;
}

export interface Shop {
  id: number;
  name: string;
  status: string;
  location: string;
  rating: number;
  lastUpdated: string;
  owner: string;
  contact: string;
  products: number;
  revenue: string;
}

export interface ShopStatusOption {
  value: string;
  label: string;
} 