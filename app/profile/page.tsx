"use client"

import React, { useState, useEffect } from 'react';
import { getUserProfile, getUserActivity, updateUserSettings } from '../../src/data/services/userService';
import { UserProfile, UserActivity, UserSettings } from '../../src/data/types';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("personal");
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [recentActivity, setRecentActivity] = useState<UserActivity[]>([]);
  const [settings, setSettings] = useState<UserSettings>({
    emailNotifications: true,
    pushNotifications: false,
    darkMode: true,
    autoRefresh: true
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profile, activity] = await Promise.all([
          getUserProfile(),
          getUserActivity()
        ]);
        setUserData(profile);
        setRecentActivity(activity);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSettingChange = async (setting: string) => {
    try {
      const newSettings = {
        ...settings,
        [setting]: !settings[setting as keyof typeof settings]
      };
      await updateUserSettings(newSettings);
      setSettings(newSettings);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!userData) return <div>No user data found</div>;

  const renderContent = () => {
    switch(activeTab) {
      case "personal":
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-4 mb-8">
              <div className="h-20 w-20 rounded-full bg-[#282A27] flex items-center justify-center text-[#FFFAF4] text-2xl">
                {userData.avatar}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#FFFAF4]">{userData.name}</h2>
                <p className="text-[#FFFAF4] opacity-80">{userData.role}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#1d1f1d] p-4 rounded-lg">
                <h3 className="text-[#FF4F59] font-medium mb-2">Email</h3>
                <p className="text-[#FFFAF4]">{userData.email}</p>
              </div>
              
              <div className="bg-[#1d1f1d] p-4 rounded-lg">
                <h3 className="text-[#FF4F59] font-medium mb-2">Department</h3>
                <p className="text-[#FFFAF4]">{userData.department}</p>
              </div>
              
              <div className="bg-[#1d1f1d] p-4 rounded-lg">
                <h3 className="text-[#FF4F59] font-medium mb-2">Join Date</h3>
                <p className="text-[#FFFAF4]">{userData.joinDate}</p>
              </div>
              
              <div className="bg-[#1d1f1d] p-4 rounded-lg">
                <h3 className="text-[#FF4F59] font-medium mb-2">Last Login</h3>
                <p className="text-[#FFFAF4]">Today, 9:30 AM</p>
              </div>
            </div>
          </div>
        );
      
      case "activity":
        return (
          <div>
            <h2 className="text-xl font-bold text-[#FFFAF4] mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map(activity => (
                <div key={activity.id} className="bg-[#1d1f1d] p-4 rounded-lg">
                  <div className="flex justify-between">
                    <p className="text-[#FFFAF4]">{activity.action}</p>
                    <p className="text-[#FFFAF4] opacity-60 text-sm">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case "settings":
        return (
          <div>
            <h2 className="text-xl font-bold text-[#FFFAF4] mb-4">Settings</h2>
            <div className="space-y-4">
              <div className="bg-[#1d1f1d] p-4 rounded-lg flex justify-between items-center">
                <div>
                  <h3 className="text-[#FFFAF4] font-medium">Email Notifications</h3>
                  <p className="text-[#FFFAF4] opacity-60 text-sm">Receive email notifications</p>
                </div>
                <button 
                  onClick={() => handleSettingChange('emailNotifications')}
                  className={`w-12 h-6 rounded-full relative ${settings.emailNotifications ? 'bg-[#FF4F59]' : 'bg-[#282A27]'}`}
                >
                  <span className={`absolute top-1 w-4 h-4 rounded-full bg-[#FFFAF4] transition-all ${settings.emailNotifications ? 'right-1' : 'left-1'}`}></span>
                </button>
              </div>
              
              <div className="bg-[#1d1f1d] p-4 rounded-lg flex justify-between items-center">
                <div>
                  <h3 className="text-[#FFFAF4] font-medium">Push Notifications</h3>
                  <p className="text-[#FFFAF4] opacity-60 text-sm">Receive push notifications</p>
                </div>
                <button 
                  onClick={() => handleSettingChange('pushNotifications')}
                  className={`w-12 h-6 rounded-full relative ${settings.pushNotifications ? 'bg-[#FF4F59]' : 'bg-[#282A27]'}`}
                >
                  <span className={`absolute top-1 w-4 h-4 rounded-full bg-[#FFFAF4] transition-all ${settings.pushNotifications ? 'right-1' : 'left-1'}`}></span>
                </button>
              </div>
              
              <div className="bg-[#1d1f1d] p-4 rounded-lg flex justify-between items-center">
                <div>
                  <h3 className="text-[#FFFAF4] font-medium">Dark Mode</h3>
                  <p className="text-[#FFFAF4] opacity-60 text-sm">Use dark theme</p>
                </div>
                <button 
                  onClick={() => handleSettingChange('darkMode')}
                  className={`w-12 h-6 rounded-full relative ${settings.darkMode ? 'bg-[#FF4F59]' : 'bg-[#282A27]'}`}
                >
                  <span className={`absolute top-1 w-4 h-4 rounded-full bg-[#FFFAF4] transition-all ${settings.darkMode ? 'right-1' : 'left-1'}`}></span>
                </button>
              </div>
              
              <div className="bg-[#1d1f1d] p-4 rounded-lg flex justify-between items-center">
                <div>
                  <h3 className="text-[#FFFAF4] font-medium">Auto Refresh</h3>
                  <p className="text-[#FFFAF4] opacity-60 text-sm">Automatically refresh data</p>
                </div>
                <button 
                  onClick={() => handleSettingChange('autoRefresh')}
                  className={`w-12 h-6 rounded-full relative ${settings.autoRefresh ? 'bg-[#FF4F59]' : 'bg-[#282A27]'}`}
                >
                  <span className={`absolute top-1 w-4 h-4 rounded-full bg-[#FFFAF4] transition-all ${settings.autoRefresh ? 'right-1' : 'left-1'}`}></span>
                </button>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className="container mx-auto p-6">
      <div className="flex space-x-4 mb-6 overflow-x-auto">
        <button
          className={`px-6 py-3 rounded-md font-medium whitespace-nowrap ${
            activeTab === "personal" 
              ? "bg-[#FF4F59] text-[#FFFAF4]" 
              : "bg-[#161916] text-[#FFFAF4] hover:bg-[#282A27]"
          }`}
          onClick={() => setActiveTab("personal")}
        >
          Personal Info
        </button>
        
        <button
          className={`px-6 py-3 rounded-md font-medium whitespace-nowrap ${
            activeTab === "activity" 
              ? "bg-[#FF4F59] text-[#FFFAF4]" 
              : "bg-[#161916] text-[#FFFAF4] hover:bg-[#282A27]"
          }`}
          onClick={() => setActiveTab("activity")}
        >
          Activity
        </button>
        
        <button
          className={`px-6 py-3 rounded-md font-medium whitespace-nowrap ${
            activeTab === "settings" 
              ? "bg-[#FF4F59] text-[#FFFAF4]" 
              : "bg-[#161916] text-[#FFFAF4] hover:bg-[#282A27]"
          }`}
          onClick={() => setActiveTab("settings")}
        >
          Settings
        </button>
      </div>
      
      <div className="bg-[#161916] rounded-lg p-6 shadow-md text-[#FFFAF4]">
        {renderContent()}
      </div>
    </div>
  );
}