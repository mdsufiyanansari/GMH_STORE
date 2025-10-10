import React, { useContext, useEffect, useState, useRef } from "react";
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
  const [loading, setLoading] = useState(true);

  const [showSizeSheet, setShowSizeSheet] = useState(false);

  // ✅ Swiper ref for mobile thumbnails
  const swiperRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      const foundProduct = products.find((p) => p._id === productId);
      if (foundProduct) {
        setProductData(foundProduct);
        setMainImage(foundProduct.image?.[0] || "/placeholder.png");
      }
      setLoading(false);
    }, 600);
    return () => clearTimeout(timeout);
  }, [productId, products]);

  if (loading || !productData) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <img
          src="https://engineermart.in/web/site/assets/img/loader/loading.gif"
          alt="loading"
          className="w-28 h-28"
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mt-28 mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* LEFT */}
        <div>
          {/* Mobile Swiper */}
          <div className="md:hidden">
            <Swiper
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              pagination={{ clickable: true }}
              modules={[Pagination]}
              spaceBetween={20}
              slidesPerView={1}
              className="rounded-2xl shadow-lg"
            >
              {productData.image?.length > 0 ? (
                productData.image.map((img, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={img}
                      alt={`product-${index}`}
                      className="w-full h-80 object-cover rounded-2xl"
                    />
                  </SwiperSlide>
                ))
              ) : (
                <SwiperSlide>
                  <img
                    src="/placeholder.png"
                    alt="placeholder"
                    className="w-full h-80 object-cover rounded-2xl"
                  />
                </SwiperSlide>
              )}
            </Swiper>

            {/* ✅ Bottom Thumbnails for Mobile */}
            <div className="flex gap-3 mt-4 overflow-x-auto justify-center px-2">
              {productData.image?.length > 0 &&
                productData.image.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`thumb-${index}`}
                    onClick={() => {
                      setMainImage(img); // optional for border highlight
                      swiperRef.current?.slideTo(index); // change Swiper slide
                    }}
                    className={`w-20 h-20 rounded-lg object-cover cursor-pointer border transition-all ${
                      mainImage === img
                        ? "border-black shadow-md scale-105"
                        : "border-gray-300 hover:border-black"
                    }`}
                  />
                ))}
            </div>
          </div>

          {/* Desktop */}
          <div className="hidden md:flex border rounded-2xl p-3 gap-6 bg-white shadow">
            {/* Thumbnails */}
            <div className="flex md:flex-col md:w-28 w-full gap-3">
              {productData.image?.length > 0 ? (
                productData.image.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`thumb-${index}`}
                    onClick={() => setMainImage(img)}
                    className={`w-20 h-20 md:w-24 md:h-24 rounded-lg object-cover cursor-pointer border transition-all ${
                      mainImage === img
                        ? "border-black shadow-md scale-105"
                        : "border-gray-300 hover:border-black"
                    }`}
                  />
                ))
              ) : (
                <img
                  src="/placeholder.png"
                  alt="placeholder"
                  className="w-24 h-24 object-cover border-gray-300 rounded-lg"
                />
              )}
            </div>

            {/* Main Image */}
            <div className="flex-1 flex justify-center items-center">
              <img
                src={mainImage}
                alt={productData.name}
                className="w-full max-h-[500px] rounded-2xl object-contain shadow-md"
              />
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col justify-start space-y-6">
          <p className="text-gray-600 leading-relaxed">{productData.description}</p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            {productData.name}
          </h1>

          <div className="flex items-center">
            {Array.from({ length: 5 }, (_, i) =>
              i < rating ? (
                <FaStar key={i} className="text-yellow-400 mr-1" />
              ) : (
                <FaRegStar key={i} className="text-gray-300 mr-1" />
              )
            )}
            <span className="text-gray-600 ml-2 text-sm">({rating}.0)</span>
          </div>

          <p className="text-3xl font-bold text-gray-900 ">
            {currency}
            {productData.price}
          </p>

          <div className="text-gray-600 space-y-1">
            <p>
              <span className="font-semibold">Category:</span> {productData.category}
            </p>
            <p>
              <span className="font-semibold">Type:</span> {productData.subCategory}
            </p>
          </div>

          {/* Sizes (Desktop Only) */}
          <div className="hidden md:block">
            <span className="font-medium text-gray-700">Available Sizes:</span>
            <div className="flex gap-3 mt-3 flex-wrap">
              {productData.sizes?.length > 0 ? (
                productData.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg border font-medium transition-all ${
                      selectedSize === size
                        ? "bg-black text-white border-black shadow-md"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {size.toUpperCase()}
                  </button>
                ))
              ) : (
                <p className="text-gray-500">No sizes available</p>
              )}
            </div>
          </div>

         <div className="hidden md:block">
  <button
    onClick={() => {
      if (window.innerWidth < 768) setShowSizeSheet(true);
      else addToCart(productData._id, selectedSize);
    }}
    className={`px-6 py-3 rounded-xl font-semibold shadow-lg transition-all w-full md:w-auto ${
      selectedSize || window.innerWidth < 768
        ? "bg-black text-white hover:bg-gray-900"
        : "bg-gray-300 text-gray-500 cursor-not-allowed"
    }`}
  >
    Add to Cart
  </button>
</div>

{/* ✅ Mobile Fixed Add to Cart Button */}
<div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t shadow-lg p-4 z-40">
  <button
    onClick={() => setShowSizeSheet(true)}
    className="w-full bg-black text-white font-semibold py-3 rounded-xl hover:bg-gray-900 transition-all"
  >
    Add to Cart
  </button>
  
</div>
        </div>
      </div>

      {/* Bottom Sheet for Mobile */}
      {showSizeSheet && (
        <div className="fixed inset-0 bg-black/60 flex items-end z-50 md:hidden">
          <div className="bg-white w-full rounded-t-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Choose Size</h3>
            <div className="flex gap-3 flex-wrap">
              {productData.sizes?.length > 0 ? (
                productData.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg border font-medium transition-all ${
                      selectedSize === size
                        ? "bg-black text-white border-black shadow-md"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {size.toUpperCase()}
                  </button>
                ))
              ) : (
                <p className="text-gray-500">No sizes available</p>
              )}
            </div>

            <button
              onClick={() => {
                if (selectedSize) {
                  addToCart(productData._id, selectedSize);
                  setShowSizeSheet(false);
                }
              }}
              className={`mt-6 px-6 py-3 rounded-xl font-semibold shadow-lg w-full ${
                selectedSize
                  ? "bg-black text-white hover:bg-gray-900"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Confirm & Add to Cart
            </button>

            <button
              onClick={() => setShowSizeSheet(false)}
              className="mt-3 text-gray-500 w-full text-center"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Related Products */}
      <div className="mt-16">
        <RelatedProducts
          category={productData.category}
          subCategory={productData.subCategory}
        />
      </div>
    </div>
  );
};

export default Product;
