// src/components/OrderTracker.jsx
import React from "react";

const OrderTracker = ({ orderId, currentStatus, onStatusChange }) => {
  const statuses = [
    "Order Placed",
    "Packing",
    "Shipped",
    "Out for delivery",
    "Delivered",
  ];

  return (
    <div className="flex flex-col items-end gap-2">
      <select
        onChange={(e) => onStatusChange(e, orderId)}
        value={currentStatus}
        className="border border-gray-400 rounded px-3 py-1 w-44 bg-white text-gray-800"
      >
        {statuses.map((status, idx) => (
          <option key={idx} value={status}>
            {status}
          </option>
        ))}
      </select>

      {/* Optional: Visual Progress Bar */}
      <div className="flex gap-2 mt-2">
        {statuses.map((status, index) => (
          <div
            key={status}
            className={`h-2 w-10 rounded-full ${
              statuses.indexOf(currentStatus) >= index
                ? "bg-green-500"
                : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default OrderTracker;
