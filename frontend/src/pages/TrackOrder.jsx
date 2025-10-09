import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

const TrackOrder = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  const steps = ["Order Placed", "Packing", "Shipped", "Out for delivery", "Delivered"];

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        if (!token) return;
        const res = await fetch(`${backendUrl}/api/order/userorders`, {
          method: "POST",
          headers: { "Content-Type": "application/json", token },
        });
        const data = await res.json();
        if (data.success) {
          const currentOrder = data.orders.find((o) => o._id === orderId);
          setOrder(currentOrder || null); // make sure null if not found
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrder();
  }, [backendUrl, token, orderId]);

  if (!order) return <p className="text-center mt-10">Loading or Order not found...</p>;

  const activeStep = steps.indexOf(order.status);

  return (
    <div className="p-8 max-w-4xl mt-24 mx-auto">
      <div className="mb-12 text-center md:text-3xl md:font-bold text-xl">
        <Title text1="TRACK" text2="ORDERS" />
      </div>

      {order.items.map((item, idx) => (
        <div
          key={idx}
          className="mb-8 bg-white shadow-lg p-6 rounded-2xl flex flex-col md:flex-row items-center md:items-start"
        >
          {/* Product Image */}
          <div className="md:w-1/4 w-1/2 h-40 md:h-32 overflow-hidden bg-gray-50 rounded-lg mb-4 md:mb-0">
            <img
              src={item.image?.[0] || "/placeholder.jpg"}
              alt={item.name}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Product Info & Tracker */}
          <div className="md:w-3/4 md:pl-6 flex flex-col">
            <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
            <p className="text-gray-700 font-medium mb-2">
              {currency} {item.price} x {item.quantity}
            </p>

            {/* Tracker Steps */}
            <div className="flex  mb-4">
              {steps.map((step, index) => (
                <div key={index} className="flex-1 relative text-center">
                  {index < steps.length - 1 && (
                    <div
                      className={`absolute  top-1/2 left-9 w-full h-1 transform-translate-y-1/2 ${
                        index < activeStep ? "bg-green-600" : "bg-gray-300"
                      }`}
                    ></div>
                  )}
                  <div
                    className={`w-6 h-6 mx-auto rounded-full border-2 md:ml-6 md:mt-10 mt-14 relative  ${
                      index <= activeStep
                        ? "bg-green-600 border-green-600"
                        : "bg-white border-gray-300"
                    }`}
                  ></div>

                  <div className=" mt-6"> <p className="text-xs mt-2">{step}</p></div>
                 
                </div>
              ))}
            </div>
               
            <p className="text-sm text-gray-500 mb-4">
              Current Status: <span className="font-medium text-green-700">{order.status}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrackOrder;
