import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { IoIosArrowDropdown } from "react-icons/io";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products } = useContext(ShopContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [sortType, setSortType] = useState("relavent");
  const [showFilter, setShowFilter] = useState(false);
  const [loading, setLoading] = useState(true); // ✅ Loading Added

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const searchQuery = query.get("search") || ""; // URL se search param

  // Toggle Category/Subcategory
  const toggleCategory = (value) => {
    if (category.includes(value))
      setCategory((prev) => prev.filter((c) => c !== value));
    else setCategory((prev) => [...prev, value]);
  };

  const toggleSubCategory = (value) => {
    if (subCategories.includes(value))
      setSubCategories((prev) => prev.filter((s) => s !== value));
    else setSubCategories((prev) => [...prev, value]);
  };

  // Show loading on route change
  useEffect(() => {
    setLoading(true); // ✅ start loading when route/search changes
  }, [location.pathname, location.search]);

  // Combined filter + sort useEffect
  useEffect(() => {
    if (products.length > 0) {
      let filtered = products.slice();

      // Search filter
      if (searchQuery) {
        filtered = filtered.filter((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Category filter
      if (category.length > 0) {
        filtered = filtered.filter((item) => category.includes(item.category));
      }

      // Subcategory filter
      if (subCategories.length > 0) {
        filtered = filtered.filter((item) =>
          subCategories.includes(item.subCategory)
        );
      }

      // Sorting
      if (sortType === "low-high") filtered.sort((a, b) => a.price - b.price);
      else if (sortType === "high-low") filtered.sort((a, b) => b.price - a.price);

      setFilteredProducts(filtered);

      // ✅ Small timeout to simulate loading for UX
      const timer = setTimeout(() => setLoading(false), 600);
      return () => clearTimeout(timer);
    }
  }, [products, category, subCategories, searchQuery, sortType]);

  // Loading screen
  if (loading) {
    return (
      <div className="flex justify-center bg-black items-center h-[60vh]">
         <img
          src="https://engineermart.in/web/site/assets/img/loader/loading.gif"
          alt="loading"
          className="w-40 h-40"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-8 px-6 md:px-12 lg:px-20 my-10">
      {/* Filters Section */}
      <div className="w-full sm:w-1/4">
        <div
          className="flex items-center sm:block cursor-pointer sm:cursor-default"
          onClick={() => setShowFilter(!showFilter)}
        >
          <p className="text-lg font-semibold text-gray-800">FILTERS</p>
          <IoIosArrowDropdown
            className={`ml-2 sm:hidden text-xl transition-transform ${
              showFilter ? "rotate-180" : ""
            }`}
          />
        </div>

        {/* Category */}
        <div
          className={`border border-gray-300 p-5 mt-6 rounded-md ${
            showFilter ? "block" : "hidden"
          } sm:block`}
        >
          <p className="font-medium mb-2">CATEGORIES</p>
          <div className="space-y-2 text-gray-700 text-sm">
            {["Men", "Woman", "Kids"].map((cat) => (
              <label key={cat} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={cat}
                  onChange={() => toggleCategory(cat)}
                />
                {cat}
              </label>
            ))}
          </div>
        </div>

        {/* SubCategory */}
        <div
          className={`border border-gray-300 p-5 mt-6 rounded-md ${
            showFilter ? "block" : "hidden"
          } sm:block`}
        >
          <p className="font-medium mb-2">TYPE</p>
          <div className="space-y-2 text-gray-700 text-sm">
            {["Topwear", "Bottomwear", "Winterwear"].map((sub) => (
              <label key={sub} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={sub}
                  onChange={() => toggleSubCategory(sub)}
                />
                {sub}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 mt-3 sm:mt-0"
          >
            <option value="relavent">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <ProductItem
                key={item._id}
                id={item._id}
                name={item.name}
                price={item.price}
                image={item.image[0]}
              />
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No products found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;
