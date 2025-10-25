import React from "react";
import { Truck, Clock, MapPin, ShieldCheck } from "lucide-react";

const Delivery = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-16 mt-20">
      <div className="max-w-6xl mx-auto px-6 text-gray-800">
        {/* Header */}
        <div className="text-center mb-12">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3082/3082031.png"
            alt="Delivery Illustration"
            className="w-24 mx-auto mb-4"
          />
          <h1 className="text-4xl font-bold text-cyan-700 mb-2">
            Fast & Reliable Delivery
          </h1>
          <p className="text-gray-600 text-lg">
            We ensure your favorite meals arrive fresh and on time.
          </p>
        </div>

        {/* Info Sections */}
        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
            <Truck className="text-cyan-600 w-10 h-10 mb-3" />
            <h2 className="text-xl font-semibold mb-2 text-cyan-700">
              Delivery Charges
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Free delivery on orders above $50</li>
              <li>$5 fee for smaller orders</li>
              <li>Additional charges for remote areas</li>
            </ul>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
            <Clock className="text-cyan-600 w-10 h-10 mb-3" />
            <h2 className="text-xl font-semibold mb-2 text-cyan-700">
              Delivery Time
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Average delivery takes 30–60 minutes depending on distance and
              order volume. You’ll be notified as soon as your food is out for
              delivery!
            </p>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
            <MapPin className="text-cyan-600 w-10 h-10 mb-3" />
            <h2 className="text-xl font-semibold mb-2 text-cyan-700">
              Real-Time Tracking
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Track your order status directly from your account or through the
              tracking ID we send to your email or phone.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
            <ShieldCheck className="text-cyan-600 w-10 h-10 mb-3" />
            <h2 className="text-xl font-semibold mb-2 text-cyan-700">
              Safe & Hygienic
            </h2>
            <p className="text-gray-600 leading-relaxed">
              All our delivery agents follow strict hygiene standards to ensure
              your meals are safe, sealed, and handled with care.
            </p>
          </div>
        </div>

        {/* Bottom Image */}
        {/* <div className="mt-16 text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
            alt="Food Delivery"
            className="w-48 mx-auto"
          />
        </div> */}
      </div>
    </div>
  );
};

export default Delivery;
