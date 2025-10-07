import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <div className='flex flex-col '>
      <div className="bg-white md:h-[25vw] h-[70vw]  shadow-md  overflow-hidden hover:shadow-xl transition-shadow duration-300 relative flex flex-col">
        {/* Product Image */}
        <Link to={`/product/${id}`} className="overflow-hidden  h-[70%] ">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Product Info */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div className=' '>
            <Link to={`/product/${id}`}>
              <p className="text-gray-800 font-semibold text-lg truncate">{name}</p>
            </Link>
            <p className="text-gray-500 mt-1">{currency}{price}</p>
          </div>
        </div>
      </div>

      {/* Buy Button */}
      <Link to={`/product/${id}`}>
        <button
          className="px-8 py-3 w-full border border-black font-semibold hover:bg-white bg-black text-white hover:text-black transition ease-in-out duration-500"
        >
          Buy
        </button>
      </Link>
    </div>
  );
};

export default ProductItem;
