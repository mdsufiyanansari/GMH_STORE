import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { RiArrowLeftLine, RiDeleteBin6Line } from "react-icons/ri";
import { assets } from "../assets/assets";

const Cart = () => {
  const { cartItems, products, currency, updateQuantity, getCartAmount, navigate } =
    useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  // Convert cartItems object to array for easier mapping
  useEffect(() => {
    const tempData = Object.keys(cartItems).flatMap((productId) =>
      Object.keys(cartItems[productId]).map((size) => ({
        productId,
        size,
        quantity: cartItems[productId][size],
      }))
    );
    setCartData(tempData);
  }, [cartItems]);

  if (!products.length) {
    // Wait until products are loaded
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading cart...</p>
      </div>
    );
  }

  return (
    <div className="bg-white text-black min-h-screen py-10 px-4">
      {/* Back Button */}
      <button
        onClick={() => navigate("/collection")}
        className="flex items-center gap-2 border border-black px-4 py-2 rounded-md hover:bg-black hover:text-white transition"
      >
        <RiArrowLeftLine className="text-xl" />
        Back to Collection
      </button>

      {/* Title */}
      <div className="text-3xl font-bold text-center my-10">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      {/* Cart Items */}
      <div className="max-w-5xl mx-auto space-y-6">
        {cartData.length === 0 ? (
          <div className="w-full h-1/2 flex flex-col justify-center items-center">
            <img src={assets.cartlogo} alt="Empty Cart" />
            <p className="text-center text-xl text-gray-600 mt-4">
              Your cart is empty.
            </p>
          </div>
        ) : (
          cartData.map((item, index) => {
            const productData = products.find((p) => p._id === item.productId);
            if (!productData) return null; // Skip if product not found

            return (
              <div
                key={index}
                className="flex flex-col md:flex-row items-center justify-between border border-black rounded-xl p-4 gap-4"
              >
                {/* Left - Product Info */}
                <div className="flex items-center gap-6 w-full md:w-auto">
                  <img
                    onClick={() => productData && navigate(`/product/${productData._id}`)}
                    src={productData?.image?.[0] || "/placeholder.jpg"}
                    alt={productData?.name || "Product"}
                    className="w-24 h-24 object-cover border border-black rounded-lg cursor-pointer hover:opacity-80 transition"
                  />
                  <div>
                    <p className="font-semibold text-xl">{productData?.name || "Product"}</p>
                    <div className="flex gap-6 text-sm mt-2">
                      <p className="font-medium">
                        {currency}
                        {productData?.price || 0}
                      </p>
                      <p className="border px-2 py-1 rounded-md text-xs font-semibold">
                        Size: {item.size.toUpperCase()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right - Quantity & Delete */}
                <div className="flex items-center gap-4 mt-4 md:mt-0">
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (val > 0) updateQuantity(item.productId, item.size, val);
                    }}
                    className="w-16 border border-black rounded-lg px-2 py-1 text-center focus:outline-none"
                  />

                  <button
                    onClick={() => updateQuantity(item.productId, item.size, 0)}
                    className="p-2 border border-black rounded-md hover:bg-black transition"
                  >
                    <RiDeleteBin6Line className="text-red-500 hover:text-red-700 text-xl" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Cart Total + Checkout */}
      {cartData.length > 0 && (
        <div className="max-w-5xl mx-auto mt-12 border-t border-black pt-8">
          <CartTotal />
          <div className="text-center mt-6">
            <button
              onClick={() => navigate("/place-order")}
              className="px-8 py-3 border border-black rounded-md font-semibold hover:bg-black hover:text-white transition"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
