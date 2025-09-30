import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Hero = () => {
  const [ads, setAds] = useState([]);
  const API_URL = import.meta.env.VITE_BACKEND_URL  || "http://localhost:4000"; // ✅ env se backend URL

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await axios.get(`${API_URL}/ads`); // ✅ localhost hardcode hata diya
        setAds(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAds();
  }, [API_URL]);

  if (ads.length === 0) {
    return <p className="text-gray-500 text-center">No Ads Available</p>;
  }

  return (
    <div className="w-full p-4">
      <Swiper
        modules={[Pagination, Autoplay]}
        slidesPerView={1}                 // ✅ सिर्फ एक banner
        loop={true}                       // ✅ continuously loop
        autoplay={{ delay: 5000 }}        // ✅ 5 सेकंड में auto slide
        pagination={{ clickable: true }}
        className="w-full h-64 md:h-72 lg:h-80 overflow-hidden"
      >
        {ads.map((ad) => (
          <SwiperSlide key={ad._id}>
            <a href={ad.link || "#"} target="_blank" rel="noreferrer">
              <img
                src={ad.image_url}
                alt={`Ad ${ad._id}`}
                className="w-full h-full object-cover"
              />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
