import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const MyAccount = () => {
  const { navigate, setToken, setCartItems } = useContext(ShopContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gray-50 text-gray-800">
      <div className="bg-white shadow-md rounded-xl p-8 w-[90%] sm:w-[400px] text-center space-y-4">
        <h2 className="text-2xl font-semibold mb-4">My Account</h2>

        <button
          onClick={() => navigate("/profile")}
          className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
          My Profile
        </button>

        <button
          onClick={() => navigate("/orders")}
          className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
          My Orders
        </button>

        <button
          onClick={logout}
          className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default MyAccount;
