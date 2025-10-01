import express from "express";
import { placeOrder, placeOrderRazorpay, allOrders, userOrders, updateStatus, verifyPayment } from "../controllers/orderController.js";
import authUser from "../middleware/auth.js";

const orderRouter = express.Router();

// ---------------- Admin Routes ----------------
orderRouter.post("/list", allOrders);
orderRouter.post("/status", updateStatus);

// ---------------- Payment / Order Routes ----------------
orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/razorpay", authUser, placeOrderRazorpay);
orderRouter.post("/verifyPayment", authUser, verifyPayment);

// ---------------- User Routes ----------------
orderRouter.post("/userorders", authUser, userOrders);

export default orderRouter;
