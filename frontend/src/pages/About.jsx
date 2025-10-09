import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'
import { ShieldCheck, Truck, Headphones } from 'lucide-react' // icons

const About = () => {
  return (
    <div className="px-6 md:px-16 mt-24 lg:px-28">
      {/* About Us Section */}
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className="my-12 flex flex-col md:flex-row gap-12 items-center">
        <img 
          src={assets.about} 
          alt="About Us" 
          className="w-full md:w-1/2 rounded-2xl shadow-lg object-cover"
        />
        <div className="space-y-4 text-gray-700 md:w-1/2">
          <p className="text-lg leading-relaxed">
            Forever was born out of a passion for innovation and a dsire to revolution the way people shop
          </p>
          <p className="text-base leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam magnam amet hic incidunt, labore ex quis voluptas eos error. Ullam!
          </p>
          <b className="block text-xl mt-6 mb-2 text-gray-900">Our Mission</b>
          <p className="text-base leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quod tempora consequatur? Dignissimos tempore harum animi, quis repellendus id commodi quibusdam est beatae laborum ab.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="text-2xl text-center mt-16">
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className="grid md:grid-cols-3 gap-8 my-12 text-gray-700">
        {/* Quality Assurance */}
        <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <ShieldCheck className="w-7 h-7 text-green-600" />
            <b className="text-lg text-gray-900">Quality Assurance</b>
          </div>
          <p className="text-base leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis, nobis impedit. Asperiores, consequuntur molestias. Molestiae repudiandae saepe quis! Dolorem, eos!
          </p>
        </div>

        {/* Convenience */}
        <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <Truck className="w-7 h-7 text-blue-600" />
            <b className="text-lg text-gray-900">Convenience</b>
          </div>
          <p className="text-base leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis, nobis impedit. Asperiores, consequuntur molestias. Molestiae repudiandae saepe quis! Dolorem, eos!
          </p>
        </div>

        {/* Exceptional Customer Service */}
        <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <Headphones className="w-7 h-7 text-purple-600" />
            <b className="text-lg text-gray-900">Exceptional Customer Service</b>
          </div>
          <p className="text-base leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis, nobis impedit. Asperiores, consequuntur molestias. Molestiae repudiandae saepe quis! Dolorem, eos!
          </p>
        </div>
      </div>

      {/* Newsletter */}
      <NewsletterBox />
    </div>
  )
}

export default About
