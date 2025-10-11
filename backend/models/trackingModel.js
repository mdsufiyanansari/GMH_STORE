import mongoose from "mongoose";

const trackingSchema = new mongoose.Schema({
  status: String,
  location: String,
  scannedBy: String,       // 🔥 kaun scan kiya (optional)
  note: String,            // 🔥 extra note (optional)
  timestamp: { type: Date, default: Date.now }, // 🔥 consistent naming
});

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: Array,
  total: Number,
  paymentMethod: { type: String, default: "COD" }, // optional
  payment: { type: Boolean, default: false },      // optional
  status: { type: String, default: "Pending" },
  trackingId: { type: String, unique: true },      // 🔥 for barcode scan
  trackingHistory: [trackingSchema],               // 🔥 rename to match controller
  date: { type: Date, default: Date.now },         // order creation
});

const orderModel = mongoose.model("Order", orderSchema);
export default orderModel;
