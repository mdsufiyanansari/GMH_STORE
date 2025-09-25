import express from "express";
import { placeOrder, placeOrderRazorpay, allOrders, userOrders, updateStatus, verifyPayment } from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const orderRouter = express.Router();

// ---------------- Admin Routes ----------------
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

// ---------------- Payment / Order Routes ----------------
orderRouter.post("/place", authUser, placeOrder);          // COD
orderRouter.post("/razorpay", authUser, placeOrderRazorpay); // Razorpay order create
orderRouter.post("/verifyPayment", authUser, verifyPayment); // Razorpay payment verification

// ---------------- User Routes ----------------
orderRouter.post("/userorders", authUser, userOrders);

export default orderRouter;
