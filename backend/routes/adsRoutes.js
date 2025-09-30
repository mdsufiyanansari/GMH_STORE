import express from "express";
import multer from "multer";
import { getAds, addAd, deleteAd } from "../controllers/adsController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.get("/", getAds);
router.post("/", upload.single("image"), addAd);
router.delete("/:id", deleteAd);

export default router;
