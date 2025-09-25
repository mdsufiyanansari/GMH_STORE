import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { RiArrowLeftLine, RiDeleteBin6Line } from "react-icons/ri"; // 👈 added icons
import { assets } from "../assets/assets";

const Cart = () => {
  const { cartItems, products, currency, updateQuantity, getCartAmount, navigate } =
    useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    let tempData = [];

    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems, products]);

  return (
    <div className="bg-white text-black min-h-screen py-10 px-4">
      {/* Back Button */}
      <button
        onClick={() => navigate("/collection")}
        className="flex items-center gap-2 border border-black px-4 py-2 rounded-md hover:bg-black hover:text-white transition"
      >
        <RiArrowLeftLine className="text-xl" />
      </button>

      {/* Title */}
      <div className="text-3xl font-bold text-center my-10">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      {/* Cart Items */}
      <div className="max-w-5xl mx-auto space-y-6">
        {cartData.length === 0 ? (
          <div className="w-full h-1/2  justify-center items-center flex flex-col">
          <img src={assets.cartlogo} alt="" />
          <p className="text-center text-xl ml-14 text-gray-600">Your cart is empty.</p>
          </div>
        ) : (
          cartData.map((item, index) => {
            const productData = products.find(
              (product) => product._id === item._id
            );

            return (
              <div
                key={index}
                className="flex items-center justify-between border border-black rounded-xl p-4"
              >
                {/* Left - Product Info */}
                <div className="flex items-center gap-6">
                  <img
                    onClick={() => navigate(`/product/${productData._id}`)}
                    src={productData.image[0]}
                    alt={productData.name}
                    className="w-24 h-24 object-cover border border-black rounded-lg cursor-pointer hover:opacity-80 transition"
                  />
                  <div>
                    <p className="font-semibold text-xl">{productData.name}</p>
                    <div className="flex gap-6 text-sm mt-2">
                      <p className="font-medium">
                        {currency}
                        {productData.price}
                      </p>
                      <p className="border px-2 py-1 rounded-md text-xs font-semibold">
                        Size: {item.size.toUpperCase()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right - Quantity & Delete */}
                <div className="flex items-center gap-4">
                  <input
                    onChange={(e) =>
                      e.target.value === "" || e.target.value === "0"
                        ? null
                        : updateQuantity(
                            item._id,
                            item.size,
                            Number(e.target.value)
                          )
                    }
                    type="number"
                    min={1}
                    defaultValue={item.quantity}
                    className="w-16 border border-black rounded-lg px-2 py-1 text-center focus:outline-none"
                  />

                  <button
                    onClick={() => updateQuantity(item._id, item.size, 0)}
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
