import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock data - replace with actual data fetching logic
    const notificationsData = [
      {
        id: 1,
        action: "Shop3 service visit completed",
        time: "2 hours ago",
        status: "completed",
        timestamp: "2024-04-14T08:00:00Z"
      },
      {
        id: 2,
        action: "New billing report available",
        time: "5 hours ago",
        status: "info",
        timestamp: "2024-04-14T05:00:00Z"
      },
      {
        id: 3,
        action: "Shop1 has 2 pending tasks",
        time: "Yesterday",
        status: "pending",
        timestamp: "2024-04-13T14:30:00Z"
      },
      {
        id: 4,
        action: "Monthly performance review",
        time: "2 days ago",
        status: "info",
        timestamp: "2024-04-12T10:00:00Z"
      }
    ];

    return NextResponse.json(notificationsData);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch notifications' },
      { status: 500 }
    );
  }
} 