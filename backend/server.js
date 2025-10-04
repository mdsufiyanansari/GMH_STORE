import dotenv from "dotenv";
dotenv.config();


console.log("Cloudinary URL:", process.env.CLOUDINARY_URL);

import express from "express";
import corsMiddleware from "./middleware/corsMiddleware.js";

import cors from "cors";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import otpRoutes from "./routes/otpRoutes.js"
import adsRoutes from "./routes/adsRoutes.js"
import invoiceRouter from "./routes/invoiceRoute.js";
import adminRoutes from "./routes/adminRoutes.js";

// app config
const app = express();
const port = process.env.PORT || 4000;


// connect database
connectDB();

// connect cloudinary
connectCloudinary();

// middleware
// app.use(express.json());
// app.use(cors());

app.use(express.json());
app.use(corsMiddleware); 

// api endpoints
app.use("/api/user", userRouter);

app.use("/api/product", productRouter);

app.use("/api/cart", cartRouter);

app.use("/api/order",orderRouter)

app.use("/ads", adsRoutes);

app.use("/api", otpRoutes);

app.use("/api/order/invoice", invoiceRouter);

app.use("/api/admin", adminRoutes);


app.get("/", (req, res) => {
  res.send("API WORKING 🚀");
});

// start server
app.listen(port, () => console.log("🚀server is running port:" + port));
