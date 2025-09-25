import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      const bestProduct = products.filter((item) => item.bestseller);
      setBestSeller(bestProduct.slice(0, 4)); // sirf first 4 bestseller products
    }
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={'BEST'} text2={'SELLERS'} />
        <p className="max-w-2xl mx-auto text-gray-600 text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias exercitationem est aliquam modi magni assumenda minus, quia aut voluptatem esse!
        </p>
      </div>

      {/* rendering bestseller products */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {bestSeller.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            image={item.image[0]}  // pehli image dikhayega
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  )
}

export default BestSeller
