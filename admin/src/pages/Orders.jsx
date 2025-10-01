import React, { useEffect, useState } from 'react';
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from '../assets/assets';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  // Fetch all orders
  const fetchAllOrders = async () => {
    try {
      const API = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
      const response = await axios.post(`${API}/api/order/list`); // Fixed missing API call
      if (response.data.success) setOrders(response.data.orders.reverse());
      else toast.error(response.data.message);
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  // Update order status
  const statusHandler = async (event, orderId) => {
    try {
      const API = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
      const response = await axios.post(`${API}/api/order/status`, {
        orderId,
        status: event.target.value
      });

      if (response.data.success) fetchAllOrders();
      else toast.error(response.data.message);
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="bg-white text-black min-h-screen p-8 font-sans">
      <h3 className="text-2xl font-bold mb-6 border-b border-black pb-2">Orders Page</h3>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="border border-black rounded-lg p-5 mb-6 flex justify-between gap-5 shadow-sm">

            {/* Display first item image safely */}
            <img
              src={order.items?.[0]?.image || assets.parcel_icon} 
              alt={order.items?.[0]?.name || "parcel"}
              className="w-16 h-16 object-contain"
            />

            <div className="flex-1 flex flex-col gap-3">
              <div>
                <strong>Items:</strong>
                <div className="flex flex-wrap gap-1">
                  {order.items?.map((item, idx) => (
                    <span key={idx}>
                      {item.name} x {item.quantity} ({item.size})
                      {idx !== order.items.length - 1 && ","}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <strong>Customer:</strong>
                <p>{order.address.firstName} {order.address.lastName}</p>
                <p>{order.address.street}, {order.address.city}, {order.address.state}, {order.address.country}, {order.address.pincode}</p>
                <p>Phone: {order.address.phone}</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 items-end">
              <p><strong>Amount:</strong> {currency}{order.amount}</p>
              <p><strong>Payment:</strong> {order.payment ? "Done" : "Pending"}</p>
              <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
              <select
                onChange={(e) => statusHandler(e, order._id)}
                value={order.status}
                className="border border-black rounded px-3 py-1 w-44 bg-white text-black"
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
