import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import LatestCollection from '../components/LatestCollection';
import BestSeller from '../components/BestSeller';
import OurPolicy from '../components/OurPolicy';
import NewsletterBox from '../components/NewsletterBox';



const Home = () => {
  const navigate = useNavigate();

  const handleCollectionClick = () => {
    navigate('/collection'); // Collection page pe redirect
  };

  return (
    <div className='mt-28 py-10'>
      <div >
      {/* ✅ Banner above Hero */}
      <div
        onClick={handleCollectionClick}
        className="cursor-pointer bg-black text-white text-center py-4  font-semibold hover:bg-gray-700 transition"
      >
        Explore Our Full Collection
      </div>
   
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <NewsletterBox />
      </div>
    </div>
  );
};

export default Home;
