"use client"

import React, { useState } from "react";
import { format } from "date-fns";

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("all");
  
  // Sample notification data
  const notifications = [
    {
      id: 1,
      type: "alert",
      title: "Shop1 has 2 past due service visits",
      message: "There are 2 service visits that are past due for Shop1. Please review and take action.",
      date: new Date(2023, 6, 15, 9, 30),
      read: false
    },
    {
      id: 2,
      type: "info",
      title: "Billing performance improved",
      message: "The overall billing performance has improved by 5% compared to last month.",
      date: new Date(2023, 6, 14, 14, 45),
      read: true
    },
    {
      id: 3,
      type: "alert",
      title: "Shop3 has 1 past due service visit",
      message: "There is 1 service visit that is past due for Shop3. Please review and take action.",
      date: new Date(2023, 6, 13, 11, 20),
      read: false
    },
    {
      id: 4,
      type: "info",
      title: "New report available",
      message: "The monthly performance report for June 2023 is now available for review.",
      date: new Date(2023, 6, 10, 8, 15),
      read: true
    },
    {
      id: 5,
      type: "alert",
      title: "System maintenance scheduled",
      message: "System maintenance is scheduled for July 20, 2023 from 2:00 AM to 4:00 AM EST. The system may be unavailable during this time.",
      date: new Date(2023, 6, 8, 16, 0),
      read: true
    }
  ];
  
  // Filter notifications based on active tab
  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return !notification.read;
    if (activeTab === "alerts") return notification.type === "alert";
    return true;
  });
  
  // Mark notification as read
  const markAsRead = (id: number) => {
    console.log(`Marking notification ${id} as read`);
    // In a real app, you would update the notification in your state/database
  };
  
  // Clear all notifications
  const clearAll = () => {
    console.log("Clearing all notifications");
    // In a real app, you would clear all notifications from your state/database
  };
  
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 rounded-md font-medium ${
              activeTab === "all" 
                ? "bg-[#FF4F59] text-[#FFFAF4]" 
                : "bg-[#161916] text-[#FFFAF4] hover:bg-[#282A27]"
            }`}
            onClick={() => setActiveTab("all")}
          >
            All
          </button>
          
          <button
            className={`px-4 py-2 rounded-md font-medium ${
              activeTab === "unread" 
                ? "bg-[#FF4F59] text-[#FFFAF4]" 
                : "bg-[#161916] text-[#FFFAF4] hover:bg-[#282A27]"
            }`}
            onClick={() => setActiveTab("unread")}
          >
            Unread
          </button>
          
          <button
            className={`px-4 py-2 rounded-md font-medium ${
              activeTab === "alerts" 
                ? "bg-[#FF4F59] text-[#FFFAF4]" 
                : "bg-[#161916] text-[#FFFAF4] hover:bg-[#282A27]"
            }`}
            onClick={() => setActiveTab("alerts")}
          >
            Alerts
          </button>
        </div>
        
        <button
          className="px-4 py-2 text-[#FFFAF4] hover:text-[#FF4F59] transition-colors"
          onClick={clearAll}
        >
          Clear All
        </button>
      </div>
      
      <div className="space-y-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <div 
              key={notification.id}
              className={`bg-[#161916] rounded-lg p-4 border-l-4 ${
                notification.type === "alert" 
                  ? "border-[#FFAD28]" 
                  : "border-[#FF4F59]"
              } ${
                !notification.read ? "bg-opacity-100" : "bg-opacity-80"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-[#FFFAF4] mb-1">
                    {notification.title}
                  </h3>
                  <p className="text-[#FFFAF4] opacity-80 mb-2">
                    {notification.message}
                  </p>
                  <p className="text-sm text-[#FFFAF4] opacity-60">
                    {format(notification.date, "MMM d, yyyy 'at' h:mm a")}
                  </p>
                </div>
                
                {!notification.read && (
                  <button
                    className="text-[#FF4F59] hover:text-[#FFAD28] transition-colors text-sm"
                    onClick={() => markAsRead(notification.id)}
                  >
                    Mark as read
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="bg-[#161916] rounded-lg p-6 text-center">
            <p className="text-[#FFFAF4] opacity-80">No notifications found</p>
          </div>
        )}
      </div>
    </div>
  );
}