import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const List = () => {
  const [list, setList] = useState([])

  // Fetch all products
  const fetchList = async () => {
    try {
      const API = import.meta.env.VITE_BACKEND_URL || backendUrl || "http://localhost:4000";
      const response = await axios.get(`${API}/api/product/list`)  // No token required

      if (response.data.success) {
        setList(response.data.products)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  // Remove product without authentication
  const removeProduct = async (id) => {
    try {
      const API = import.meta.env.VITE_BACKEND_URL || backendUrl || "http://localhost:4000";
      const response = await axios.post(`${API}/api/product/remove`, { id })  // No headers

      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className="p-6">
      <p className="text-xl font-semibold mb-4">All Products List</p>

      <div className="overflow-x-auto">
        <div className="min-w-full bg-white shadow-md rounded-lg">
          {/* Table Header */}
          <div className="grid grid-cols-5 gap-4 p-4 border-b font-medium text-gray-700">
            <span>Image</span>
            <span>Name</span>
            <span>Category</span>
            <span>Price</span>
            <span>Action</span>
          </div>

          {/* Product List */}
          {
            list.map((item, index) => (
              <div key={index} className="grid grid-cols-5 gap-4 p-4 border-b items-center hover:bg-gray-50 transition">
                <img src={item.image?.[0] || ""} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>{currency}{item.price}</p>
                <button
                  onClick={() => removeProduct(item._id)}
                  className="text-red-500 font-bold hover:text-red-700 transition"
                >
                  X
                </button>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default List
