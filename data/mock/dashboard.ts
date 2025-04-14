export const kpiData = [
  { title: "Total Shops", value: "1,234", change: "+12.5%", trend: "up" },
  { title: "Active Shops", value: "1,012", change: "+8.2%", trend: "up" },
  { title: "Inactive Shops", value: "222", change: "-4.3%", trend: "down" },
  { title: "Average Rating", value: "4.5", change: "+0.2", trend: "up" }
];

export const chartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Active Shops",
      data: [850, 900, 950, 1000, 1050, 1012],
      borderColor: "rgb(59, 130, 246)",
      backgroundColor: "rgba(59, 130, 246, 0.5)",
    },
    {
      label: "Inactive Shops",
      data: [150, 120, 100, 80, 50, 222],
      borderColor: "rgb(239, 68, 68)",
      backgroundColor: "rgba(239, 68, 68, 0.5)",
    }
  ]
};

export const recentActivity = [
  { id: 1, action: "Shop3 status updated", date: "2 hours ago" },
  { id: 2, action: "New shop registered", date: "4 hours ago" },
  { id: 3, action: "Monthly report generated", date: "1 day ago" },
  { id: 4, action: "System maintenance completed", date: "2 days ago" }
]; 