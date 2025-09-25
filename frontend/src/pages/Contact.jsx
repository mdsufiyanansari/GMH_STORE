import React from 'react'
import Title from '../components/Title'
import NewsletterBox from '../components/NewsletterBox'
import { assets } from '../assets/assets'
import { MapPin, Phone, Mail } from 'lucide-react'

const Contact = () => {
  return (
    <div className="px-6 md:px-16 lg:px-28">
      {/* Heading */}
      <div className="text-2xl text-center mt-16">
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      {/* Contact Section */}
      <div className="my-16 flex flex-col md:flex-row items-center gap-12 ">
        {/* Left Side - Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={assets.contact}
            alt="Contact Us"
            className="w-full h-[400px] md:h-[500px]  shadow-xl object-cover"
          />
        </div>

        {/* Right Side - Content */}
        <div className="w-full md:w-1/2 space-y-6 text-gray-700">
          <p className="text-2xl font-bold text-gray-900">Our Store</p>

          <div className="flex items-center gap-3">
            <MapPin className="w-6 h-6 text-red-500" />
            <p>54709 willms Station <br />Suit 350, Washington, USA</p>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="w-6 h-6 text-green-600" />
            <p>Tel: (+91) 555-222</p>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="w-6 h-6 text-blue-600" />
            <p>Email: admin@gmail.com</p>
          </div>

          <button className="mt-4 px-8 py-3 bg-black text-white rounded-xl shadow hover:bg-gray-800 transition-all">
            Explore Store
          </button>
        </div>
      </div>

      {/* Newsletter */}
      <NewsletterBox />
    </div>
  )
}

export default Contact
