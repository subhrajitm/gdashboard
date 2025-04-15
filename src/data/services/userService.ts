import { UserProfile, UserActivity, UserSettings } from '../types';

export const getUserProfile = async (): Promise<UserProfile> => {
  try {
    const response = await fetch('/api/user/profile');
    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching user profile: ${error.message}`);
    }
    throw new Error('Unknown error occurred while fetching user profile');
  }
};

export const getUserActivity = async (): Promise<UserActivity[]> => {
  try {
    const response = await fetch('/api/user/activity');
    if (!response.ok) {
      throw new Error('Failed to fetch user activity');
    }
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching user activity: ${error.message}`);
    }
    throw new Error('Unknown error occurred while fetching user activity');
  }
};

export const updateUserSettings = async (settings: UserSettings): Promise<UserSettings> => {
  try {
    const response = await fetch('/api/user/settings', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(settings),
    });
    if (!response.ok) {
      throw new Error('Failed to update user settings');
    }
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error updating user settings: ${error.message}`);
    }
    throw new Error('Unknown error occurred while updating user settings');
  }
}; 