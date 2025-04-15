import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock data - replace with actual data fetching logic
    const profileData = {
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Administrator",
      department: "Operations",
      lastLogin: "2024-04-14T10:30:00Z",
      avatar: "/avatars/default.png",
      preferences: {
        theme: "dark",
        notifications: true,
        language: "en"
      }
    };

    return NextResponse.json(profileData);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch user profile' },
      { status: 500 }
    );
  }
} 