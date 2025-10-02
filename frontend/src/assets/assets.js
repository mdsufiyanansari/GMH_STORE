import scatch1 from "./scatch1.png";
import hero_img from "./hero_img.jpg";
import logo from "./logo.png";

import img1 from "./img1.jpg";
import img2 from "./img2.jpg";
import img3 from "./img3.jpg";
import img4 from "./img4.jpg";
import img5 from "./img5.jpg";
import img6 from "./img6.jpg";
import img7 from "./img7.jpg";
import stripe from "./stripe.png";
import razorpay from "./razorpay.jpg"
import about from "./about.jpg";
import contact from "./contact.jpg";
import image1 from "./image1.jpg";
import image2 from "./image2.jpg";
import image3 from "./image3.jpeg"
import image4 from "./image4.jpeg"
import cartlogo from "./cartlogo.png";
import shoplogo from "./shoplogo.png"
import noorder from "./noorder.gif"
export const assets = {
  logo,
  scatch1,
  about,
  contact,
  hero_img,
  stripe,
  razorpay,
  shoplogo,
  noorder,
cartlogo,
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  image1,
  image2,
  image3,
  image4
};

export const products = [
  // ----------- ORIGINAL 8 (each with 4 images) -----------
  {
    _id: "aa",
    name: "Men T-Shirt",
    description: "Comfortable cotton T-shirt",
    price: 100,
    images: [scatch1, hero_img, logo, cartlogo, img1],
    category: "Men",
    subCategory: "Topwear",
    sizes: ["s", "m", "l", "xl"],
    date: 1716634345448,
    bestseller: true,
  },
  {
    _id: "ab",
    name: "Woman Casual Shirt",
    description: "Light cotton casual shirt",
    price: 120,
    images: [img1, img2, img3, img4],
    category: "Woman",
    subCategory: "Topwear",
    sizes: ["m", "l", "xl"],
    date: 1716635345448,
    bestseller: false,
  },
  {
    _id: "ac",
    name: "Men Denim Jacket",
    description: "Stylish blue denim jacket",
    price: 250,
    images: [img2, img3, img4, img5],
    category: "Men",
    subCategory: "Winterwear",
    sizes: ["s", "m", "l"],
    date: 1716636345448,
    bestseller: true,
  },
  {
    _id: "ad",
    name: "Woman Summer Dress",
    description: "Light and breezy summer dress",
    price: 180,
    images: [img3, img4, img5, img6],
    category: "Woman",
    subCategory: "Topwear",
    sizes: ["s", "m"],
    date: 1716637345448,
    bestseller: false,
  },
  {
    _id: "ae",
    name: "Kids Hoodie",
    description: "Warm fleece hoodie for kids",
    price: 220,
    images: [img4, img5, img6, img7],
    category: "Kids",
    subCategory: "Winterwear",
    sizes: ["m", "l", "xl"],
    date: 1716638345448,
    bestseller: true,
  },
  {
    _id: "af",
    name: "Men Formal Pants",
    description: "Slim fit black formal pants",
    price: 150,
    images: [img5, img6, img7, scatch1],
    category: "Men",
    subCategory: "Bottomwear",
    sizes: ["s", "m", "l", "xl"],
    date: 1716639345448,
    bestseller: false,
  },
  {
    _id: "ag",
    name: "Woman Basic T-Shirt",
    description: "Round-neck cotton T-shirt",
    price: 80,
    images: [img6, img7, scatch1, hero_img],
    category: "Woman",
    subCategory: "Topwear",
    sizes: ["s", "m", "l", "xl"],
    date: 1716640345448,
    bestseller: true,
  },
  {
    _id: "ah",
    name: "Kids Joggers",
    description: "Comfortable joggers for kids",
    price: 130,
    images: [img7, hero_img, logo, img1],
    category: "Kids",
    subCategory: "Bottomwear",
    sizes: ["s", "m", "l", "xl"],
    date: 1716641345448,
    bestseller: true,
  },

  // ----------- EXTRA 70 (Each with 4 Unsplash URLs) -----------
  ...Array.from({ length: 70 }, (_, i) => {
    const categories = ["Men", "Woman", "Kids"];
    const subCategories = ["Topwear", "Bottomwear", "Winterwear"];
    const cat = categories[i % categories.length];
    const subCat = subCategories[i % subCategories.length];

    return {
      _id: `p${i + 1}`,
      name: `${cat} ${subCat} ${i + 1}`,
      description: `High quality ${cat} ${subCat} item number ${i + 1}`,
      price: Math.floor(Math.random() * 250) + 50,
      images: [
        `https://source.unsplash.com/400x400/?${cat},${subCat},clothes&sig=${i}`,
        `https://source.unsplash.com/400x400/?${cat},${subCat},outfit&sig=${i + 100}`,
        `https://source.unsplash.com/400x400/?${cat},${subCat},style&sig=${i + 200}`,
        `https://source.unsplash.com/400x400/?${cat},${subCat},fashion&sig=${i + 300}`,
      ], // 👈 4 images
      category: cat,
      subCategory: subCat,
      sizes: ["s", "m", "l", "xl"],
      date: Date.now() - i * 1000000,
      bestseller: i % 4 === 0,
    };
  }),
];
