import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBoxOpen, FaHeart } from "react-icons/fa";

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-sm p-8 rounded-2xl shadow-lg">
        <div className="flex flex-col items-center">
          {/* 👤 Profile Avatar */}
          <img
            src="https://via.placeholder.com/100"
            alt="User Avatar"
            className="w-24 h-24 rounded-full object-cover border-2 border-indigo-500 mb-3"
          />
          <h2 className="text-xl font-semibold text-gray-800">Md Sufiyan</h2>
          <p className="text-gray-500 text-sm mb-6">example@email.com</p>

          {/* 🧾 Links Section */}
          <div className="flex flex-col gap-4 w-full">
            <button
              onClick={() => navigate("/orders")}
              className="flex items-center justify-between px-5 py-3 border rounded-xl hover:bg-indigo-50 transition"
            >
              <div className="flex items-center gap-3">
                <FaBoxOpen className="text-indigo-600 text-xl" />
                <span className="text-gray-700 font-medium">My Orders</span>
              </div>
              <span className="text-gray-500 text-sm">›</span>
            </button>

            <button
              onClick={() => navigate("/wishlist")}
              className="flex items-center justify-between px-5 py-3 border rounded-xl hover:bg-indigo-50 transition"
            >
              <div className="flex items-center gap-3">
                <FaHeart className="text-pink-500 text-xl" />
                <span className="text-gray-700 font-medium">My Wishlist</span>
              </div>
              <span className="text-gray-500 text-sm">›</span>
            </button>
          </div>

          {/* 🔙 Logout or Back */}
          <button
            onClick={() => navigate("/")}
            className="mt-6 text-gray-500 hover:text-indigo-600 text-sm transition"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
