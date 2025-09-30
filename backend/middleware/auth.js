import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.json({ success: false, message: "not authorized login again" });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    // 🔥 CHANGE: पहले req.body.userId था, अब req.user.id set कर रहे हैं
    req.user = { id: token_decode.id };  
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authUser;
