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
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const searchQuery = query.get("search") || "";

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
    setLoading(true);
  }, [location.pathname, location.search]);

  // Combined filter + sort
  useEffect(() => {
    if (products.length > 0) {
      let filtered = products.slice();

      // Search filter
      if (searchQuery) {
        filtered = filtered.filter((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Category filter (case-insensitive)
      if (category.length > 0) {
        filtered = filtered.filter((item) =>
          category.some(
            (c) =>
              c.toLowerCase() === item.category?.toLowerCase().trim()
          )
        );
      }

      // Subcategory filter (case-insensitive)
      if (subCategories.length > 0) {
        filtered = filtered.filter((item) =>
          subCategories.some(
            (s) =>
              s.toLowerCase() === item.subCategory?.toLowerCase().trim()
          )
        );
      }

      // Sorting
      if (sortType === "low-high") filtered.sort((a, b) => a.price - b.price);
      else if (sortType === "high-low") filtered.sort((a, b) => b.price - a.price);

      setFilteredProducts(filtered);

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
    <div className="flex flex-col sm:flex-row  md:px-2 lg:px-2 md:mt-14 md:py-10 py-4 center">
      <div className="flex flex-col sm:flex-row gap-8 px-2 mt-28  w-full">
        {/* Filters Section */}
        <div className="w-full md:mt-6 md:w-[25%]">
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
              {["Men", "Women", "Kids"].map((cat) => (
                <label key={cat} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={cat}
                    onChange={() => toggleCategory(cat)}
                    checked={category.includes(cat)}
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
                    checked={subCategories.includes(sub)}
                  />
                  {sub}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="flex-1 md:w-[75%]">
          <div className="flex flex-col md:text-2xl font-bold text-xl sm:flex-row justify-between items-center mb-6">
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

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
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
    </div>
  );
};

export default Collection;
