import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const API = "http://localhost:4000";
      const res = await axios.post(`${API}/api/order/list`);
      if (res.data.success) setOrders(res.data.orders.reverse());
    } catch (err) {
      toast.error(err.message);
    }
  };

  const downloadInvoice = async (orderId) => {
    try {
      const API = "http://localhost:4000";
      const res = await axios.get(`${API}/api/order/invoice/${orderId}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `invoice_${orderId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success("Invoice downloaded!");
    } catch (err) {
      toast.error("Failed to download invoice");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen font-sans">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow-lg rounded-lg p-6 mb-6 border border-gray-200"
          >
            {/* Header: Logo & Store Name */}
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <div className="flex items-center gap-4">
                <img
                  src={assets.scatch1}
                  alt="Store Logo"
                  className="w-20 h-12 object-contain"
                />
                <h1 className="text-2xl font-bold text-gray-800">OnlineCommerce</h1>
              </div>
              <p className="text-gray-600">Invoice ID: {order._id}</p>
            </div>

            {/* Customer & Payment Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="font-semibold text-gray-700 mb-1">Customer Details</h3>
                <p className="text-gray-600">{order.address.firstName} {order.address.lastName}</p>
                <p className="text-gray-600">Phone: {order.address.phone}</p>
                <p className="text-gray-600">
                  Address: {order.address.street}, {order.address.city}, {order.address.state}, {order.address.country} - {order.address.pincode}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-1">Payment & Date</h3>
                <p className="text-gray-600">Payment Method: {order.paymentMethod}</p>
                <p className="text-gray-600">Date: {new Date(order.date).toLocaleDateString()}</p>
                <p className="text-gray-600">Status: {order.status}</p>
              </div>
            </div>

            {/* Items Table */}
            <div className="mb-4">
              <h3 className="font-semibold text-gray-700 mb-2">Order Items</h3>
              <table className="w-full text-left border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-3 py-2 border">#</th>
                    <th className="px-3 py-2 border">Product</th>
                    <th className="px-3 py-2 border">Size</th>
                    <th className="px-3 py-2 border">Qty</th>
                    <th className="px-3 py-2 border">Price</th>
                    <th className="px-3 py-2 border">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, idx) => (
                    <tr key={idx} className="border-b">
                      <td className="px-3 py-2 border">{idx + 1}</td>
                      <td className="px-3 py-2 border">{item.name}</td>
                      <td className="px-3 py-2 border">{item.size}</td>
                      <td className="px-3 py-2 border">{item.quantity}</td>
                      <td className="px-3 py-2 border">₹{item.price}</td>
                      <td className="px-3 py-2 border">₹{item.price * item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Total Amount */}
            <div className="text-right font-semibold text-gray-800 text-lg mb-4">
              Total Amount: ₹{order.amount}
            </div>

            {/* Download Invoice Button */}
            <div className="text-right">
              <button
                onClick={() => downloadInvoice(order._id)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              >
                Download Invoice
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
