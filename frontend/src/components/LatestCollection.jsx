import React, { useState, useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./Productitem";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      setLatestProducts(products.slice(0, 4)); // first 4 products
    }
  }, [products]);

  return (
    <div className="my-16 px-6 md:px-12 lg:px-20">  
      <div className="text-center py-8">
        <h2 className="text-3xl font-bold">
          <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        </h2>
        <p className="max-w-2xl mx-auto mt-4 text-gray-600 text-sm md:text-base leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta iste
          iusto velit accusamus, nemo recusandae.
        </p>
      </div>

      {/* rendering products */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {latestProducts.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            image={item.image[0]} // first image from array
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
