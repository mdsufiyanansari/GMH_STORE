import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const navigate = useNavigate();

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
            item.orderId = order._id;
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
    <div className="px-4 py-10 max-w-6xl mt-28 mx-auto">
      <div className="mb-12 text-center md:text-3xl md:font-bold text-xl">
        <Title text1="MY" text2="ORDERS" />
      </div>

      <div className="space-y-8">
        {orderData && orderData.length > 0 ? (
          orderData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100  hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Product Image */}
              <div className="md:w-1/3 w-full h-60 md:h-auto overflow-hidden bg-gray-50">
                <img
                  src={item.image?.[0] || "/placeholder.jpg"}
                  alt={item.name}
                  className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Details */}
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

                {/* Track Button */}
                <button
                  onClick={() => navigate(`/track/${item.orderId}`)}
                  className="px-5 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 shadow-sm w-max mt-4"
                >
                  Track Order
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="justify-center items-center flex w-full">
            <img src={assets.noorder} alt="No Orders" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
