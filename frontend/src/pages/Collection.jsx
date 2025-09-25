import React, { useState, useContext, useEffect } from "react";
import { IoIosArrowDropdown } from "react-icons/io";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductItem from "../components/Productitem";

const Collection = () => {
  const { products, search } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  

  // Toggle Category
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  // Toggle SubCategory
  const toggleSubCategory = (e) => {
    if (subCategories.includes(e.target.value)) {
      setSubCategories((prev) =>
        prev.filter((item) => item !== e.target.value)
      );
    } else {
      setSubCategories((prev) => [...prev, e.target.value]);
    }
  };

  // ✅ Apply Filter
  const applyFilter = () => {
    let productsCopy = products.slice();

    // Search filter (sirf search value check hoga, showSearch nahi)
    if (search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategories.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategories.includes(item.subCategory)
      );
    }

    setFilteredProducts(productsCopy);
  };

  // Sort Products
  const sortProduct = () => {
    let fpCopy = filteredProducts.slice();

    switch (sortType) {
      case "low-high":
        setFilteredProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilteredProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategories, search, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

   


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

        {/* Category Filter */}
        <div
          className={`border border-gray-300 p-5 mt-6 rounded-md ${
            showFilter ? "block" : "hidden"
          } sm:block`}
        >
          <p className="font-medium mb-2">CATEGORIES</p>
          <div className="space-y-2 text-gray-700 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" value={"Men"} onChange={toggleCategory} />
              Men
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" value={"Woman"} onChange={toggleCategory} />
              Woman
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" value={"Kids"} onChange={toggleCategory} />
              Kids
            </label>
          </div>
        </div>

        {/* SubCategories Filter */}
        <div
          className={`border border-gray-300 p-5 mt-6 rounded-md ${
            showFilter ? "block" : "hidden"
          } sm:block`}
        >
          <p className="font-medium mb-2">TYPE</p>
          <div className="space-y-2 text-gray-700 text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                value={"Topwear"}
                onChange={toggleSubCategory}
              />
              Topwear
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                value={"Bottomwear"}
                onChange={toggleSubCategory}
              />
              Bottomwear
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                value={"Winterwear"}
                onChange={toggleSubCategory}
              />
              Winterwear
            </label>
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

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item, index) => (
              <ProductItem
                key={index}
                name={item.name}
                id={item._id}
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
