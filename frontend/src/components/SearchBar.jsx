import React, { useState, useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { IoMdClose } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);

  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname.includes("collection") && showSearch) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location, showSearch]);

  if (!visible) return null;

  // ✅ Search button click par navigate karo collection page pe
  const handleSearch = () => {
    if (search.trim() !== "") {
      navigate(`/collection?search=${search}`); // query param ke saath
      setShowSearch(false); // search modal band ho jaye
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center z-50">
      <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mt-28 p-6">
        <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 p-5 animate-fadeIn">
          {/* Close Button */}
          <button
            onClick={() => setShowSearch(false)}
            className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-black transition"
          >
            <IoMdClose />
          </button>

          {/* Input + Search Button */}
          <div className="flex items-center gap-3 border border-gray-300 rounded-full px-5 py-3 shadow-inner bg-gray-50">
            <CiSearch className="text-xl text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for products..."
              autoFocus
              className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()} // enter press bhi chalega
            />
            {/* ✅ Search Button */}
            <button
              onClick={handleSearch}
              className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
