import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js";

export const getDashboardStats = async (req, res) => {
  try {
    // Total counts
    const totalOrders = await orderModel.countDocuments();
    const totalUsers = await userModel.countDocuments();
    const totalProducts = await productModel.countDocuments();

    const revenueAgg = await orderModel.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    const totalRevenue = revenueAgg[0]?.total || 0;

    // Today calculation
    const today = new Date();
    today.setHours(0, 0, 0, 0); // today start

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    // Orders today
    const todayOrdersArray = await orderModel.find({
      date: { $gte: today, $lt: tomorrow }
    });
    const todayOrders = todayOrdersArray.length;
    const todayRevenue = todayOrdersArray.reduce((acc, curr) => acc + curr.amount, 0);

    // Users today
    const todayUsersArray = await userModel.find({
      createdAt: { $gte: today, $lt: tomorrow }
    });
    const todayUsers = todayUsersArray.length;

    // Products today
    const todayProductsArray = await productModel.find({
      createdAt: { $gte: today, $lt: tomorrow }
    });
    const todayProducts = todayProductsArray.length;

    res.json({
      totalOrders,
      totalUsers,
      totalProducts,
      totalRevenue,
      todayOrders,
      todayUsers,
      todayProducts,
      todayRevenue,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching dashboard stats" });
  }
};
