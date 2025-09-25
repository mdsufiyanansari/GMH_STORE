import React from "react";
import Title from "./Title";
import { FaExchangeAlt, FaUndo, FaHeadset } from "react-icons/fa";

const OurPolicy = () => {
  return (
    <div className="my-16 px-6 md:px-12 lg:px-20">
      {/* Section Heading */}
      <div className="text-center text-3xl py-8">
        <Title text1={"OUR"} text2={"POLICY"} />
        <p className="max-w-2xl mx-auto text-gray-600 text-sm mt-3">
          We are committed to providing the best shopping experience with easy
          exchanges, quick returns, and excellent customer support.
        </p>
      </div>

      {/* Policies section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
        {/* Easy Exchange Policy */}
        <div className="border cursor-pointer rounded-2xl p-8 text-center shadow-sm hover:shadow-xl transition-shadow duration-300 bg-white">
          <FaExchangeAlt className="text-4xl text-indigo-600 mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-3 text-gray-800">
            Easy Exchange Policy
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Exchange your products easily without any hassle.
          </p>
        </div>

        {/* 7 Days Return Policy */}
        <div className="border cursor-pointer rounded-2xl p-8 text-center shadow-sm hover:shadow-xl transition-shadow duration-300 bg-white">
          <FaUndo className="text-4xl text-green-600 mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-3 text-gray-800">
            7 Days Return Policy
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Hassle-free returns within 7 days of purchase.
          </p>
        </div>

        {/* Best Customer Support */}
        <div className="border cursor-pointer rounded-2xl p-8 text-center shadow-sm hover:shadow-xl transition-shadow duration-300 bg-white">
          <FaHeadset className="text-4xl text-red-500 mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-3 text-gray-800">
            Best Customer Support
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            We’re here 24/7 to assist you with any query or concern.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurPolicy;
