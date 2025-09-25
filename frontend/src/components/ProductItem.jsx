import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link 
      className="block text-gray-700 cursor-pointer hover:shadow-lg rounded-lg p-3 transition"
      to={`/product/${id}`}
    >
      <div className="overflow-hidden rounded-lg">
        <img
          className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500"
          src={image}
          alt={name}
        />
      </div>
      <p className="mt-3 font-semibold text-gray-800 truncate">{name}</p>
      <p className="text-gray-600 text-sm">{currency}{price}</p>
    </Link>
  );
};

export default ProductItem;
