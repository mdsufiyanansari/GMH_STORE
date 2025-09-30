import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Create JWT token
const createToken = (id, role = "user") => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// ===================== LOGIN USER =====================
const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email.trim().toLowerCase(); // normalize email

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "User doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(user._id);
    res.json({ success: true, token });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===================== REGISTER USER =====================
const registerUser = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    email = email.trim().toLowerCase(); // normalize email
    let newPassword = password.trim();

    // password validations
    if (newPassword.includes(" ")) {
      return res.status(400).json({ success: false, message: "Password cannot contain spaces" });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ success: false, message: "Keep your password to a minimum of 6 characters" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Please enter a valid email" });
    }

    // check if user exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.status(400).json({ success: false, message: "User Already Exists" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // create user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const token = createToken(user._id);
    res.json({ success: true, token });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===================== ADMIN LOGIN =====================
const adminLogin = async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email.trim();
    password = password.trim();

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = createToken("admin-id", "admin");
      return res.json({ success: true, token });
    }

    return res.status(401).json({ success: false, message: "Invalid credentials" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===================== VERIFY TOKEN =====================
const verifyToken = async (req, res) => {
  // just return success if authUser middleware passes
  res.json({ success: true, message: "Token is valid", userId: req.userId });
};

export { loginUser, registerUser, adminLogin, verifyToken };
