import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { FaStar, FaRegStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [mainImage, setMainImage] = useState("/placeholder.png");
  const [selectedSize, setSelectedSize] = useState("");
  const [rating, setRating] = useState(4);

  const [loading, setLoading] = useState(true); // ✅ loading state

  useEffect(() => {
    setLoading(true); // start loading

    // ✅ artificial delay to show loading GIF
    const timeout = setTimeout(() => {
      const foundProduct = products.find((p) => p._id === productId);
      if (foundProduct) {
        setProductData(foundProduct);
        setMainImage(foundProduct.image?.[0] || "/placeholder.png");
      }
      setLoading(false); // stop loading
    }, 600); 

    return () => clearTimeout(timeout);
  }, [productId, products]);

  // ✅ Loading GIF overlay
  if (loading || !productData) {
    return (
      <div className="fixed inset-0 bg-white  flex items-center justify-center z-50">
        <img
          src="https://cdn.pixabay.com/animation/2023/08/15/07/22/07-22-02-443_512.gif"
          alt="loading"
          className="w-40 h-24"
        />
      </div>
    );
  }

  return (
    <div className="max-w-full mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* LEFT */}
        <div>
          {/* Mobile Swiper */}
          <div className="md:hidden">
            <Swiper
              pagination={{ clickable: true }}
              modules={[Pagination]}
              spaceBetween={20}
              slidesPerView={1}
              className="rounded-xl shadow-lg"
            >
              {productData.image?.length > 0
                ? productData.image.map((img, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={img}
                        alt={`product-${index}`}
                        className="w-full h-80 object-cover rounded-xl"
                      />
                    </SwiperSlide>
                  ))
                : (
                  <SwiperSlide>
                    <img
                      src="/placeholder.png"
                      alt="placeholder"
                      className="w-full h-80 object-cover rounded-xl"
                    />
                  </SwiperSlide>
                )}
            </Swiper>
          </div>

          {/* Desktop */}
          <div className="hidden md:flex border p-1 gap-6">
            {/* Thumbnails */}
            <div className="flex md:flex-col md:w-36 w-full justify-center md:justify-start">
              {productData.image?.length > 0
                ? productData.image.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`thumb-${index}`}
                      onClick={() => setMainImage(img)}
                      className={`sm:w-40 sm:h-40 h-20 w-20 object-cover cursor-pointer border transition ${
                        mainImage === img
                          ? "border-black shadow-lg"
                          : "border-gray-300"
                      }`}
                    />
                  ))
                : (
                  <img
                    src="/placeholder.png"
                    alt="placeholder"
                    className="h-20 w-20 object-cover border-gray-300"
                  />
                )}
            </div>

            {/* Main Image */}
            <div className="flex-1 flex justify-center items-center p-1">
              <img
                src={mainImage}
                alt={productData.name}
                className="w-full h-full rounded-xl object-contain"
              />
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col justify-start">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            {productData.name}
          </h1>

          <div className="flex items-center mt-2">
            {Array.from({ length: 5 }, (_, i) =>
              i < rating ? (
                <FaStar key={i} className="text-yellow-400 mr-1" />
              ) : (
                <FaRegStar key={i} className="text-gray-300 mr-1" />
              )
            )}
            <span className="text-gray-500 ml-2">({rating}.0)</span>
          </div>

          <p className="text-3xl font-bold text-black mt-4">
            {currency}{productData.price}
          </p>

          <div className="mt-4 text-gray-500">
            <p><span className="font-medium">Category:</span> {productData.category}</p>
            <p><span className="font-medium">Type:</span> {productData.subCategory}</p>
          </div>

          {/* Sizes */}
          <div className="mt-4">
            <span className="font-medium text-gray-700">Size:</span>
            <div className="flex gap-3 mt-2 flex-wrap">
              {productData.sizes?.length > 0
                ? productData.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-lg cursor-pointer transition ${
                        selectedSize === size
                          ? "bg-black text-white"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {size.toUpperCase()}
                    </button>
                  ))
                : <p className="text-gray-500">No sizes available</p>
              }
            </div>
          </div>

          {/* Add to Cart */}
          <div className="flex gap-4 mt-6 flex-wrap">
            <button
              onClick={() => addToCart(productData._id, selectedSize)}
              className={`px-6 py-3 rounded-lg shadow w-full md:w-auto transition ${
                selectedSize
                  ? "bg-black text-white hover:bg-gray-800"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Product Description</h2>
        <p className="text-gray-600 mb-6">{productData.description}</p>
      </div>

      {/* Related Products */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  );
};

export default Product;
