import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock data - replace with actual data fetching logic
    const taskCompletionData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Completed Tasks',
          data: [120, 150, 180, 200, 220, 250],
          backgroundColor: '#FF4F59'
        }
      ]
    };

    return NextResponse.json(taskCompletionData);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch task completion data' },
      { status: 500 }
    );
  }
} 