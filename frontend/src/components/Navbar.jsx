import { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { AiOutlineUser } from "react-icons/ai";
import { FaOpencart } from "react-icons/fa6";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

  const logout = () => {  
    navigate("/login")
    localStorage.removeItem("token")
    setToken("")
    setCartItems({})
  
  }

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "COLLECTION", path: "/collection" },
    { name: "ABOUT", path: "/about" },
    { name: "CONTACT", path: "/contact" },
  ];

  return (
    <div className="flex items-center py-5 justify-around h-28 font-medium z-50 fixed top-0 left-0 w-full  backdrop-blur-lg bg-[#F2F2EB]/50 ">
      <Link to="/">
        <img src={assets.scatch1} className="w-32" alt="logo" />
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        {navLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className="flex flex-col items-center gap-1"
          >
            <p>{link.name}</p>
            <hr className="w-2/3 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        ))}
      </ul>

      {/* Icons + Mobile Toggle */}
      <div className="flex items-center gap-6">
        {/* 🔍 Search Icon */}
        <CiSearch
          className="text-3xl cursor-pointer"
          onClick={() => setShowSearch(true)}
        />

        {/* User Dropdown */}
        <div className="group relative">
          
          <AiOutlineUser onClick={()=> token ? null : navigate("/login")} className="text-3xl cursor-pointer" />
         {/* dropdown menu */}
         {token &&
          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-700 rounded-md">
              <p onClick={()=>navigate('/profile')}  className="cursor-pointer hover:text-black">My Profile</p>
              <p onClick={()=>navigate('/orders')} className="cursor-pointer hover:text-black">Orders</p>
              <p onClick={logout} className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>
         }
        </div>

        {/* Cart Icon */}
        <Link to="/cart" className="relative">
          <FaOpencart className="text-3xl" />
          <p className="absolute right-[-5px] bottom-[-5px] font-semibold w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[10px]">
            {getCartCount()}
          </p>
        </Link>

        {/* Mobile Menu Button */}
        <div className="sm:hidden">
          {menuOpen ? (
            <HiX
              className="text-3xl cursor-pointer"
              onClick={() => setMenuOpen(false)}
            />
          ) : (
            <HiMenuAlt3
              className="text-3xl cursor-pointer"
              onClick={() => setMenuOpen(true)}
            />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`sm:hidden fixed top-0 right-0 h-screen w-full bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-between items-center p-6 border-b">
          <img src={assets.scatch1} className="w-28" alt="logo" />
          <HiX
            className="text-3xl cursor-pointer"
            onClick={() => setMenuOpen(false)}
          />
        </div>

        {/* Links with Divider */}
        <ul className="flex flex-col text-gray-500 text-lg">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `px-6 py-4 border-b hover:text-black ${
                  isActive ? "text-white bg-black font-semibold" : ""
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
