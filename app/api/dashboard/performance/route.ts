import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock data - replace with actual data fetching logic
    const performanceData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Billing Performance',
          data: [75, 78, 82, 80, 85, 88],
          borderColor: '#FF4F59',
          backgroundColor: 'rgba(255, 79, 89, 0.1)',
          tension: 0.4
        }
      ]
    };

    return NextResponse.json(performanceData);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch performance data' },
      { status: 500 }
    );
  }
} 