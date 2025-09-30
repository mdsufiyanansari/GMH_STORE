import Ad from "../models/adsModel.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
  secure: true,
});

// Get all ads
export const getAds = async (req, res) => {
  try {
    const ads = await Ad.find().sort({ createdAt: -1 });
    res.json(ads);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Add ad
export const addAd = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ msg: "Image required" });

    // Upload image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "ads",
    });

    // Delete local file after upload
    fs.unlinkSync(req.file.path);

    // Save ad to database with public_id
    const newAd = new Ad({
      image_url: uploadResult.secure_url,
      link: req.body.link || null,
      public_id: uploadResult.public_id, // ✅ important for delete
    });

    await newAd.save();

    res.json(newAd);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Delete ad
export const deleteAd = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) return res.status(404).json({ msg: "Ad not found" });

    // Delete image from Cloudinary if public_id exists
    if (ad.public_id) {
      await cloudinary.uploader.destroy(ad.public_id);
    }

    // Delete ad from MongoDB
    await Ad.deleteOne({ _id: ad._id });  // ✅ use deleteOne instead of remove

    res.json({ msg: "Ad deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to delete ad: " + err.message });
  }
};
