import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { IoAddCircleOutline } from "react-icons/io5";
import axios from "axios";
import { toast } from 'react-toastify';

const Add = () => {
  const [image1,setImage1] = useState(false);
  const [image2,setImage2] = useState(false);
  const [image3,setImage3] = useState(false);
  const [image4,setImage4] = useState(false);

  const [name,setName] = useState("");
  const [description,setDescription] = useState("");
  const [price,setPrice] = useState("");
  const [category,setCategory] = useState("Men");
  const [subCategory,setSubCategory] = useState("Topwear");
  const [bestseller,setBestseller] = useState(false);
  const [sizes,setSizes] = useState ([]);

  // Backend URL setup
  const API = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      // No authentication headers
      const response = await axios.post(`${API}/api/product/add`, formData);

      if (response.data.success) {
        toast.success(response.data.message);
        // Reset form
        setName("");
        setDescription("");
        setPrice("");
        setCategory("Men");
        setSubCategory("Topwear");
        setBestseller(false);
        setSizes([]);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="p-6 bg-white max-w-4xl space-y-4 mx-auto">
      {/* ---------------- Upload Images ---------------- */}
      <div className="mb-6">
        <p className="text-lg font-semibold mb-3 text-black">Upload Image</p>
        <div className="flex gap-4 flex-wrap">
          {[image1, image2, image3, image4].map((img, idx) => (
            <label key={idx} htmlFor={`image${idx+1}`} className="cursor-pointer">
              <img
                src={!img ? assets.upload_area : URL.createObjectURL(img)}
                alt=""
                className="w-32 h-32 border border-black object-cover"
              />
              <input
                onChange={(e) => {
                  const files = [setImage1, setImage2, setImage3, setImage4];
                  files[idx](e.target.files[0]);
                }}
                type="file"
                id={`image${idx+1}`}
                hidden
              />
            </label>
          ))}
        </div>
      </div>

      {/* ---------------- Product Name & Description ---------------- */}
      <div className='w-full'>
        <p className='mb-2 font-semibold'>Product Name</p>
        <input onChange={(e)=>setName(e.target.value)} value={name} className='w-full max-w-4xl px-3 py-2' type="text" required />
      </div>

      <div className='w-full'>
        <p className='mb-2 font-semibold'>Text Area</p>
        <textarea onChange={(e)=>setDescription(e.target.value)} value={description} className='w-full max-w-4xl px-3 py-2' required />
      </div>

      {/* ---------------- Category / Subcategory / Price ---------------- */}
      <div className="p-4 flex flex-wrap gap-6 bg-white border border-gray-200 rounded-md max-w-4xl mx-auto">
        <div className="flex flex-col flex-1 min-w-[150px]">
          <p className="text-sm font-medium mb-1 text-black">Product Category</p>
          <select onChange={(e)=>setCategory(e.target.value)} value={category} className="border-b border-black px-2 py-1 focus:outline-none">
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div className="flex flex-col flex-1 min-w-[150px]">
          <p className="text-sm font-medium mb-1 text-black">Sub Category</p>
          <select onChange={(e)=>setSubCategory(e.target.value)} value={subCategory} className="border-b border-black px-2 py-1 focus:outline-none">
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div className="flex flex-col flex-1 min-w-[150px]">
          <p className="text-sm font-medium mb-1 text-black">Product Price</p>
          <input onChange={(e)=>setPrice(e.target.value)} value={price} type="number" className="border-b border-black px-2 py-1 focus:outline-none" />
        </div>
      </div>

      {/* ---------------- Sizes ---------------- */}
      <div className="mb-6">
        <p className="text-sm font-medium mb-2 text-black">Product Sizes</p>
        <div className="flex gap-3 flex-wrap">
          {["S","M","L","XL","XXL"].map(size => (
            <div
              key={size}
              onClick={() => setSizes(prev => prev.includes(size) ? prev.filter(i=>i!==size) : [...prev,size])}
              className={`items-center justify-center border border-black text-black cursor-pointer w-10 h-10 flex ${sizes.includes(size) ? "bg-pink-100" : ""}`}
            >
              <p>{size}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ---------------- Bestseller ---------------- */}
      <div className="flex items-center gap-2 mb-4">
        <input type="checkbox" id="bestseller" checked={bestseller} onChange={() => setBestseller(prev => !prev)} className="w-4 h-4 text-black border-black focus:ring-0"/>
        <label htmlFor="bestseller" className="text-black text-sm cursor-pointer">Add to bestseller</label>
      </div>

      <button type="submit" className="flex items-center gap-2 bg-black text-white px-4 py-2 hover:bg-gray-900 transition-colors duration-200">
        <IoAddCircleOutline className="text-lg" />
        ADD
      </button>
    </form>
  );
};

export default Add;
