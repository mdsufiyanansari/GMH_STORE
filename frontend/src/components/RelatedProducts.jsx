import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import Title from "./Title";

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Filter related products
  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.filter(
        (item) =>
          item.category === category && item.subCategory === subCategory
      );

      setRelated(productsCopy);
      setVisibleProducts(productsCopy.slice(0, 8)); // starting me 8 dikhao
      setPage(1);
    }
  }, [products, category, subCategory]);

  // Infinite Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100
      ) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [related, visibleProducts, page]);

  const loadMore = () => {
    if (loading || related.length === 0) return;
    setLoading(true);

    setTimeout(() => {
      let nextPage = page + 1;
      let newProducts = related.slice(0, nextPage * 8);

      // agar products khatam ho gaye to repeat karke infinite banado
      if (newProducts.length < nextPage * 8) {
        newProducts = [
          ...visibleProducts,
          ...related,
        ];
      }

      setVisibleProducts(newProducts);
      setPage(nextPage);
      setLoading(false);
    }, 1000); 
  };

  if (visibleProducts.length === 0) return null;

  return (
    <div className="mt-12">
      <h1 className="text-3xl text-center p-4">
      <Title text1={'RELATED'} text2={'PRODUCTS'}/>
     </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {visibleProducts.map((item, index) => (
          <Link
            to={`/product/${item._id}`}
            key={`${item._id}-${index}`}
            className="border rounded-xl p-4 hover:shadow-lg transition bg-white"
          >
            <img
              src={item.image[0]}
              alt={item.name}
              className="w-full h-48 object-cover rounded-lg"
            />
            <h3 className="mt-3 text-lg font-semibold text-gray-800">
              {item.name}
            </h3>
            <p className="text-gray-600 text-sm mt-1 truncate">
              {item.description}
            </p>
            <p className="text-xl font-bold text-black mt-2">₹{item.price}</p>
          </Link>
        ))}
      </div>

      {/* Loading spinner */}
      {loading && (
        <div className="flex justify-center items-center mt-6">
         <img
  src="https://cdn.pixabay.com/animation/2023/08/15/07/22/07-22-02-443_512.gif"
  alt="loading"
  className="w-40 h-24"
  style={{ animation: "wave 1s infinite ease-in-out" }}
/>

        </div>
      )}
    </div>
  );
};

export default RelatedProducts;
