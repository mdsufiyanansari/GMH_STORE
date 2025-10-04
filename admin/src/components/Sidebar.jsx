import React from 'react';
import { IoAddCircleOutline } from "react-icons/io5";
import { FaCalendarCheck } from "react-icons/fa";
import { HiMiniShoppingBag } from "react-icons/hi2";
import { FaList } from "react-icons/fa6";
import { FcAdvertising } from "react-icons/fc";
import { BsFileBarGraphFill } from "react-icons/bs";

import { NavLink } from 'react-router-dom';


const Sidebar = () => {
  return (

    <div className="w-[18%] min-h-screen border-r-2">
    <div className="  flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
      <NavLink
        to="/add"
        className="flex items-center space-x-2 px-3 border-r-0 border border-gray-300 py-2 transition-colors duration-200 hover:bg-gray-100"
      >
        <IoAddCircleOutline className="text-xl" />
        <p className="text-sm font-medium hidden md:block">Add Items</p>
      </NavLink>

       <NavLink
        to="/list"
        className="flex items-center space-x-2 px-3 border-r-0 border border-gray-300 py-2 transition-colors duration-200 hover:bg-gray-100"
      >
        <FaCalendarCheck className="text-xl" />
        <p className="text-sm font-medium hidden md:block">List Items</p>
      </NavLink>

       <NavLink
        to="/orders"
        className="flex items-center space-x-2 px-3 border-r-0 border border-gray-300 py-2 transition-colors duration-200 hover:bg-gray-100"
      >
        <HiMiniShoppingBag className="text-xl" />
        <p className="text-sm font-medium hidden md:block">Orders</p>
      </NavLink>

        <NavLink
        to="/orderlist"
        className="flex items-center space-x-2 px-3 border-r-0 border border-gray-300 py-2 transition-colors duration-200 hover:bg-gray-100"
      >
        <FaList className="text-xl" />
        <p className="text-sm font-medium hidden md:block">Orders-List</p>
      </NavLink>

         <NavLink
        to="/ads"
        className="flex items-center space-x-2 px-3 border-r-0 border border-gray-300 py-2 transition-colors duration-200 hover:bg-gray-100"
      >
        <FcAdvertising className="text-xl" />
        <p className="text-sm font-medium hidden md:block">Ads </p>
      </NavLink>

      <NavLink
        to="/admindashboard"
       className="flex items-center space-x-2 px-3 border-r-0 border border-gray-300 py-2 transition-colors duration-200 hover:bg-gray-100"
      >
        <BsFileBarGraphFill className="text-xl" />
        <p className="text-sm font-medium hidden md:block">Dashboard</p>
      </NavLink>

    </div>
    </div>
  );
};

export default Sidebar;
