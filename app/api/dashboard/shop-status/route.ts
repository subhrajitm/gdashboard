import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock data - replace with actual data fetching logic
    const shopStatusData = {
      labels: ['Active', 'Inactive', 'Pending'],
      datasets: [
        {
          data: [850, 150, 50],
          backgroundColor: [
            '#4CAF50',
            '#FF4F59',
            '#FFAD28'
          ]
        }
      ]
    };

    return NextResponse.json(shopStatusData);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch shop status data' },
      { status: 500 }
    );
  }
} 