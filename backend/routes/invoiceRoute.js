import express from "express";
import { generateInvoice } from "../controllers/invoiceController.js";

const router = express.Router();

// No auth middleware
router.get("/:orderId", generateInvoice);

export default router;
