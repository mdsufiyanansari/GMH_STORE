import React from "react";
import { MdEmail } from "react-icons/md";
import { FaPaperPlane } from "react-icons/fa";

const NewsletterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className="my-16 px-6 md:px-12 lg:px-20 text-center">
      {/* Heading */}
      <p className="text-2xl md:text-3xl font-semibold text-gray-800">
        Subscribe now & get{" "}
        <span className="text-gray-600">20% off</span>
      </p>
      <p className="text-gray-600 max-w-xl mx-auto mt-3 text-sm md:text-base">
        Join our newsletter to receive exclusive deals, updates, and special
        offers directly in your inbox.
      </p>

      {/* Form */}
      <form
        onSubmit={onSubmitHandler}
        className="mt-6 flex flex-col sm:flex-row items-center justify-center max-w-xl mx-auto"
      >
        <div className="relative flex w-full sm:flex-1">
          <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="email"
            required
            placeholder="Enter your email"
            className="w-full pl-10 pr-4 py-3 border border-gray-400 text-gray-800 placeholder-gray-500 focus:outline-none text-sm"
          />
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 bg-black text-white font-medium hover:bg-gray-800 transition-all duration-300 border border-gray-800"
          >
            <FaPaperPlane className="text-sm" />
            SUBSCRIBE
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewsletterBox;
