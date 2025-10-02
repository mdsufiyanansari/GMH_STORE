import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const ProductItem = ({ id, image, name, price, onAddToCart }) => {
  const { currency } = useContext(ShopContext);

  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300 relative flex flex-col">
      {/* Product Image */}
      <Link to={`/product/${id}`} className="overflow-hidden rounded-t-xl">
        <img
          src={image}
          alt={name}
          className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
        />
      </Link>

      {/* Product Info */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <Link to={`/product/${id}`}>
            <p className="text-gray-800 font-semibold text-lg truncate">{name}</p>
          </Link>
          <p className="text-gray-500 mt-1">{currency}{price}</p>
        </div>

       
      </div>
    </div>
  );
};

export default ProductItem;
