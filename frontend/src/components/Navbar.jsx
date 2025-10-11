import { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink, useLocation } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { AiOutlineUser } from "react-icons/ai";
import { FaOpencart } from "react-icons/fa6";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { ShopContext } from "../context/ShopContext";
import { MdHome, MdShoppingBag, MdStorefront } from "react-icons/md";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } =
    useContext(ShopContext);

  const location = useLocation(); // current path
  const showCart = location.pathname.startsWith("/product"); // product page par cart dikhana

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "COLLECTION", path: "/collection" },
    { name: "ABOUT", path: "/about" },
    { name: "CONTACT", path: "/contact" },
  ];

  return (
    <>
      {/* 💻 Desktop Navbar */}
      <div className="hidden sm:flex items-center py-5 justify-around h-28 font-medium z-50 fixed top-0 left-0 w-full backdrop-blur-lg bg-white">
        <Link to="/">
          <h1 className="md:text-2xl text-xl font-bold text-[#DDC4DD] tracking-wider">
            <span className="text-[#DCCFEC]">GMH_</span>SHOP..
          </h1>
        </Link>

        {/* Desktop Menu */}
        <ul className="flex gap-5 text-sm text-gray-700">
          {navLinks.map((link) => (
            <NavLink key={link.name} to={link.path} className="flex flex-col items-center gap-1">
              <p>{link.name}</p>
              <hr className="w-2/3 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
          ))}
        </ul>

        {/* Icons */}
        <div className="flex items-center gap-6">
          <CiSearch className="text-3xl cursor-pointer" onClick={() => setShowSearch(true)} />

          {/* User Dropdown */}
          <div className="group relative">
            <AiOutlineUser
              onClick={() => (token ? null : navigate("/login"))}
              className="text-3xl cursor-pointer"
            />
            {token && (
              <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-700 rounded-md">
                  <p onClick={() => navigate("/profile")} className="cursor-pointer hover:text-black">
                    My Profile
                  </p>
                  <p onClick={() => navigate("/orders")} className="cursor-pointer hover:text-black">
                    My Orders
                  </p>
                  <p onClick={logout} className="cursor-pointer hover:text-black">
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Cart */}
          <Link to="/cart" className="relative ">
            <FaOpencart className="text-3xl" />
            <p className="absolute right-[-5px] bottom-[-5px] font-semibold w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[10px]">
              {getCartCount()}
            </p>
          </Link>
        </div>
      </div>

      {/* 📱 Mobile TOP Navbar */}
      <div className="sm:hidden fixed top-0 left-0 w-full bg-white flex justify-between items-center px-5 py-3 border-b shadow-sm z-50">
        {/* Burger Menu */}
        {menuOpen ? (
          <HiX className="text-3xl cursor-pointer" onClick={() => setMenuOpen(false)} />
        ) : (
          <HiMenuAlt3 className="text-3xl cursor-pointer" onClick={() => setMenuOpen(true)} />
        )}

        {/* Logo */}
        <Link to="/" className="text-lg font-bold text-[#DDC4DD] tracking-wider">
          <span className="text-[#DCCFEC]">GMH_</span>SHOP..
        </Link>

        {/* Right Icons */}
        <div className="flex items-center gap-4">
          <CiSearch className="text-3xl cursor-pointer" onClick={() => setShowSearch(true)} />

          {showCart && (
            <Link to="/cart" className="relative">
              <FaOpencart className="text-3xl" />
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-2 bg-black text-white text-[10px] px-[5px] rounded-full">
                  {getCartCount()}
                </span>
              )}
            </Link>
          )}
        </div>
      </div>

      {/* 📱 Mobile Slide Menu */}
      <div
        className={`sm:hidden fixed top-0 left-0 h-screen w-2/3 bg-white shadow-lg z-40 transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="flex flex-col mt-16 text-gray-700">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className="px-6 py-4 border-b hover:text-black"
            >
              {link.name}
            </NavLink>
          ))}
          {token && (
            <>
              <p
                onClick={() => {
                  navigate("/profile");
                  setMenuOpen(false);
                }}
                className="px-6 py-4 border-b cursor-pointer hover:text-black"
              >
                My Profile
              </p>
              <p
                onClick={() => {
                  navigate("/orders");
                  setMenuOpen(false);
                }}
                className="px-6 py-4 border-b cursor-pointer hover:text-black"
              >
                My Orders
              </p>
              <p
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="px-6 py-4 border-b cursor-pointer hover:text-black"
              >
                Logout
              </p>
            </>
          )}
        </ul>
      </div>

      {/* 📱 Mobile Bottom Navbar */}
      <div className="sm:hidden fixed bottom-0 left-0 w-full bg-white border-t flex justify-around items-center py-2 z-10 shadow-[0_-1px_5px_rgba(0,0,0,0.1)]">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center text-xs ${
              isActive ? "text-black font-semibold" : "text-gray-500"
            }`
          }
        >
          <MdHome size={24} />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/collection"
          className={({ isActive }) =>
            `flex flex-col items-center text-xs ${
              isActive ? "text-black font-semibold" : "text-gray-500"
            }`
          }
        >
          <MdStorefront size={24} />
          <span>Shop</span>
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `relative flex flex-col items-center text-xs ${
              isActive ? "text-black font-semibold" : "text-gray-500"
            }`
          }
        >
          <MdShoppingBag size={24} />
          {getCartCount() > 0 && (
            <span className="absolute top-0 right-3 bg-black text-white text-[10px] rounded-full px-[6px]">
              {getCartCount()}
            </span>
          )}
          <span>Bag</span>
        </NavLink>

        <NavLink
          to={token ? "/profile" : "/login"}
          className={({ isActive }) =>
            `flex flex-col items-center text-xs ${
              isActive ? "text-black font-semibold" : "text-gray-500"
            }`
          }
        >
          <AiOutlineUser size={24} />
          <span>Account</span>
        </NavLink>
      </div>
    </>
  );
};

export default Navbar;
