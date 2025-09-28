import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer   className="bg-gray-700 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left Section */}
        <div>
          <img src={assets.scatch1} alt="Logo" className="w-28 mb-4" />
          <p className="text-gray-300 text-sm leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis iusto
            optio sed placeat! Reprehenderit asperiores facere ratione blanditiis
            quia rerum? Assumenda atque pariatur asperiores quidem.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <p className="font-semibold text-lg mb-4">COMPANY</p>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="hover:text-white cursor-pointer transition-colors">
              Home
            </li>
            <li className="hover:text-white cursor-pointer transition-colors">
              About
            </li>
            <li className="hover:text-white cursor-pointer transition-colors">
              Delivery
            </li>
            <li className="hover:text-white cursor-pointer transition-colors">
              Privacy Policy
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <p className="font-semibold text-lg mb-4">GET IN TOUCH</p>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>+1-212-456-7850</li>
            <li>contact@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-600 text-center py-4 text-gray-400 text-sm">
        <p>Copyright 2025 @ shop.com - All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
