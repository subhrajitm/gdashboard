import { ChartData } from 'chart.js';

declare module 'react-chartjs-2' {
  export interface LineProps {
    data: ChartData<'line', (number | Point | null)[], unknown>;
    options?: any;
  }

  export interface DoughnutProps {
    data: ChartData<'doughnut', number[], unknown>;
    options?: any;
  }

  export interface BarProps {
    data: ChartData<'bar', number[], unknown>;
    options?: any;
  }
} 