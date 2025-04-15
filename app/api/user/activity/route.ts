import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock data - replace with actual data fetching logic
    const activityData = [
      {
        id: 1,
        action: "Logged in",
        timestamp: "2024-04-14T10:30:00Z",
        details: "Successful login from Chrome on Windows"
      },
      {
        id: 2,
        action: "Updated profile",
        timestamp: "2024-04-14T09:15:00Z",
        details: "Changed notification preferences"
      },
      {
        id: 3,
        action: "Viewed dashboard",
        timestamp: "2024-04-14T08:45:00Z",
        details: "Accessed main dashboard"
      },
      {
        id: 4,
        action: "Generated report",
        timestamp: "2024-04-13T16:20:00Z",
        details: "Exported monthly performance report"
      }
    ];

    return NextResponse.json(activityData);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch user activity' },
      { status: 500 }
    );
  }
} 