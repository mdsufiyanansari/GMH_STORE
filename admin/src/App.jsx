import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Login from "./components/Login";
import AdsManager from "./pages/AdsManager";
  import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = "₹" 

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token")?localStorage.getItem("token"):"");

  useEffect(()=>{
    localStorage.setItem("token",token)

  },[token])

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer/>
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr />
          <div className="flex w-full">
            <Sidebar />
            {/* Main content area */}
            <div className="flex-1 p-4">
              <Routes>
                <Route path="/add" element={<Add  token={token}/>} />
                <Route path="/list" element={<List token={token}/>} />
                <Route path="/orders" element={<Orders token={token}/>} />
                 <Route path="/ads" element={<AdsManager />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
