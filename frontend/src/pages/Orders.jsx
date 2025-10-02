import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import { assets } from "../assets/assets";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  // Order steps for tracking
  const steps = ["Order Placed", "Packing", "Shipped", "Out for delivery", "Delivered"];

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

  const getStepIndex = (status) => steps.indexOf(status);

  return (
    <div className="px-4 py-10 max-w-6xl mx-auto">
      {/* Page Title */}
      <div className="mb-12 text-center">
        <Title text1="MY" text2="ORDERS" />
      </div>

      {/* Orders list */}
      <div className="space-y-8">
        {orderData && orderData.length > 0 ? (
          orderData.map((item, index) => {
            const activeStep = getStepIndex(item.status);
            return (
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

                  {/* ---------------- Status + Progress Tracker ---------------- */}
                  <div className="mt-6 flex flex-col space-y-4">
                    <p className="text-sm font-semibold cursor-pointer hover:text-green-700 text-green-600 uppercase">
                      {item.status}
                    </p>

                    <div className="flex justify-between items-center relative">
                      {steps.map((step, idx) => (
                        <div key={idx} className="flex-1 relative">
                          {/* Connector Line */}
                          {idx < steps.length - 1 && (
                            <div
                              className={`absolute top-1/2 left-1/2 md:mt-[-14px] md:ml-20 mt-[-24px] ml-7 w-full h-1 transform -translate-y-1/2 -translate-x-1/2 ${
                                idx < activeStep ? "bg-green-600" : "bg-gray-300"
                              }`}
                              style={{ zIndex: 0 }}
                            ></div>
                          )}

                          {/* Circle */}
                          <div
                            className={`relative z-10 w-6 h-6  mx-auto md:mt-[-10px] mt-[12px]  rounded-full border-2  ml-22 ${
                              idx <= activeStep
                                ? "bg-green-600 border-green-600"
                                : "bg-white  border-gray-300"
                            }`}
                          ></div>

                          {/* Step Label */}
                          <div className="w-full h-12 md:h-4 "><p className="text-center text-sm font-semibold md:mt-1 mt-4 ">{step}</p></div>
                          
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={loadOrderData}
                      className="px-5 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 shadow-sm w-max"
                    >
                      Track Order
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="justify-center  items-center flex w-full">
            <img src={assets.noorder} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
