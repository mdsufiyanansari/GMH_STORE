import express from "express";
import orderModel from "../models/orderModel.js";
import { io } from "../server.js";

const router = express.Router();

// ✅ Update tracking from warehouse scan
router.post("/update", async (req, res) => {
  const { trackingId, status, location, scannedBy, note } = req.body;

  try {
    const order = await orderModel.findOne({ trackingId });
    if (!order) return res.status(404).json({ message: "Order not found" });

    const event = { status, location, scannedBy, note, timestamp: new Date() };
    order.status = status;
    order.trackingHistory.push(event);
    await order.save();

    // ✅ Emit real-time update to specific user's room
    io.to(String(order.userId)).emit("order-tracking-update", {
      orderId: order._id,
      trackingId: order.trackingId,
      event,
      status: order.status,
    });

    res.json({ success: true, message: "Tracking updated successfully", event });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get tracking history
router.get("/:trackingId", async (req, res) => {
  try {
    const order = await orderModel.findOne({ trackingId: req.params.trackingId });
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order.trackingHistory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
