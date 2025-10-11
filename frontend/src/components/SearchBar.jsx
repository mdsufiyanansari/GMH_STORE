import React, { useState, useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { IoMdClose } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const { products, setShowSearch, showSearch } = useContext(ShopContext);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!showSearch) setSearch("");
  }, [showSearch]);

  // live filter products
  useEffect(() => {
    if (search.trim() === "") {
      setSuggestions([]);
    } else {
      const filtered = products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5)); // max 5 suggestions
    }
  }, [search, products]);

  const handleSearch = (item) => {
    navigate(`/product/${item._id}`);
    setShowSearch(false);
    setSearch("");
  };

  if (!showSearch) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center z-50">
      <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mt-28 p-6">
        <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 p-5 animate-fadeIn">
          <button
            onClick={() => setShowSearch(false)}
            className="absolute bottom-8 right-1 mr-10 text-2xl text-gray-500 hover:text-black transition"
          >
            <IoMdClose />
          </button>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 border border-gray-300 rounded-full px-5 py-3 shadow-inner bg-gray-50">
              <CiSearch className="text-xl text-gray-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for products..."
                autoFocus
                className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
              />
            </div>

            {/* live suggestions with images */}
            {suggestions.length > 0 && (
              <ul className="bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-y-auto shadow-md">
                {suggestions.map((item) => (
                  <li
                    key={item._id}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSearch(item)}
                  >
                    <img
                      src={item.image[0]} // assuming image is array
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <span className="text-gray-700">{item.name}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
