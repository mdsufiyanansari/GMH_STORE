import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: [String], required: true },   // array of image URLs
  category: { type: String, required: true },  // e.g. "Men", "Women"
  subCategory: { type: String, required: true }, // e.g. "Topwear"
  sizes: { type: [String], required: true },    // ["M", "L", "XL"]
  bestseller: { type: Boolean, default: false },
  date: { type: Date, default: Date.now }      // auto timestamp
});

const productModel = mongoose.models.Product || mongoose.model("Product", productSchema);

export default productModel;
