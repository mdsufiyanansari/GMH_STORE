import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import AdsManager from "./pages/AdsManager";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OrdersList from "./pages/OrdersList";
import AdminDashboard from "./pages/AdminDashboard";


export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "₹";

const App = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="flex w-full">
        <Sidebar />
        {/* Main content area */}
        <div className="flex-1 p-4">
          <Routes>
            <Route path="/add" element={<Add />} />
            <Route path="/list" element={<List />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/ads" element={<AdsManager />} />
            <Route path="/orderlist" element={<OrdersList/>}/>
          <Route path="/admindashboard" element={<AdminDashboard />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
