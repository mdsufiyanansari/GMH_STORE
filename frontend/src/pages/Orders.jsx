import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return null;

      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item.status = order.status;
            item.payment = order.payment;
            item.paymentMethod = order.paymentMethod;
            item.date = order.date;
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error("Error loading orders:", error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="px-4 py-10 max-w-6xl mx-auto">
      {/* Page Title */}
      <div className="mb-12 text-center">
        <Title text1="MY" text2="ORDERS" />
      </div>

      {/* Orders list */}
      <div className="space-y-8">
        {orderData && orderData.length > 0 ? (
          orderData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow duration-300"
            >
              {/* ---------------- LEFT SIDE (Product Image) ---------------- */}
              <div className="md:w-1/3 w-full h-60 md:h-auto overflow-hidden bg-gray-50">
                <img
                  src={item.image?.[0] || "/placeholder.jpg"}
                  alt={item.name}
                  className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* ---------------- RIGHT SIDE (Details) ---------------- */}
              <div className="md:w-2/3 w-full p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                    {item.name}
                  </h3>
                  <div className="text-gray-700 space-y-1 mb-4">
                    <p className="font-medium text-lg">
                      {currency}
                      {item.price}
                    </p>
                    <p className="text-sm">
                      Quantity: <span className="font-medium">{item.quantity}</span>
                    </p>
                    <p className="text-sm">
                      Size: <span className="font-medium">{item.size}</span>
                    </p>
                  </div>
                  <p className="text-sm text-gray-500 mb-1">
                    Date:{" "}
                    <span className="font-medium text-gray-700">
                      {new Date(item.date).toDateString()}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Payment:{" "}
                    <span className="font-medium text-gray-700">{item.paymentMethod}</span>
                  </p>
                </div>
              </div>

              {/* Status + Track Button */}
              <div className="md:w-[80%] w-full p-6 flex flex-col md:flex-row items-start md:items-center justify-between border-t md:border-t-0 md:border-l border-gray-100 bg-gray-50 space-y-4 md:space-y-0">
                <p className="text-sm font-semibold cursor-pointer hover:text-green-700 text-green-600 uppercase">
                  {item.status}
                </p>
                <button
                  onClick={loadOrderData}
                  className="px-5 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 shadow-sm"
                >
                  Track Order
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 text-lg">No orders yet</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
