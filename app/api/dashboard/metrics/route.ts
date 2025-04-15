import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock data - replace with actual data fetching logic
    const metrics = {
      totalShops: 1234,
      totalShopsChange: "+12.5%",
      billingPerformance: 85.5,
      billingPerformanceChange: "+2.3%",
      serviceVisits: 456,
      serviceVisitsChange: "-1.2%",
      pendingTasks: 23,
      pendingTasksChange: "-5.1%"
    };

    return NextResponse.json(metrics);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch dashboard metrics' },
      { status: 500 }
    );
  }
} 