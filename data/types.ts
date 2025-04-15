import { ChartData, Point } from 'chart.js';

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

export type PerformanceData = ChartData<'line', (number | Point | null)[], unknown>;
export type ShopStatusData = ChartData<'doughnut', number[], unknown>;
export type TaskCompletionData = ChartData<'bar', number[], unknown>; 