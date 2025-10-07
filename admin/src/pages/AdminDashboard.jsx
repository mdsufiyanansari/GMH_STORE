import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalUsers: 0,
    totalProducts: 0,
    totalRevenue: 0,
  });

  const [todayStats, setTodayStats] = useState({
    orders: 0,
    users: 0,
    products: 0,
    revenue: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
       const API = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

        // Total stats
        setStats({
          totalOrders: res.data.totalOrders,
          totalUsers: res.data.totalUsers,
          totalProducts: res.data.totalProducts,
          totalRevenue: res.data.totalRevenue,
        });

        // Today stats
        setTodayStats({
          orders: res.data.todayOrders,
          users: res.data.todayUsers,
          products: res.data.todayProducts,
          revenue: res.data.todayRevenue,
        });
      } catch (err) {
        console.error("Error fetching stats", err);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    { title: "Total Orders", value: stats.totalOrders, color: "text-blue-600", gradient: "from-blue-400 to-blue-600" },
    { title: "Total Users", value: stats.totalUsers, color: "text-green-600", gradient: "from-green-400 to-green-600" },
    { title: "Total Products", value: stats.totalProducts, color: "text-orange-600", gradient: "from-orange-400 to-orange-600" },
    { title: "Revenue", value: `₹${stats.totalRevenue}`, color: "text-purple-600", gradient: "from-purple-400 to-purple-600" },
    { title: "Today's Orders", value: todayStats.orders, color: "text-red-600", gradient: "from-red-400 to-red-600" },
    { title: "Today's Users", value: todayStats.users, color: "text-green-800", gradient: "from-green-500 to-green-700" },
    { title: "Today's Products", value: todayStats.products, color: "text-orange-800", gradient: "from-orange-500 to-orange-700" },
    { title: "Today's Revenue", value: `₹${todayStats.revenue}`, color: "text-purple-800", gradient: "from-purple-500 to-purple-700" },
  ];

  return (
    <div className="p-8 w-[80%] ml-[20vw] bg-gray-100 min-h-screen font-sans">
      <h1 className="text-3xl md:text-4xl font-bold mb-10 text-gray-800 tracking-wide">
        📊 Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`bg-white shadow-xl rounded-xl p-6 text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl`}
          >
            <h2 className={`text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r ${card.gradient}`}>
              {card.title}
            </h2>
            <p className={`text-3xl md:text-4xl font-bold ${card.color} mt-2`}>
              {card.value || 0}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
