import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

let otpStore = {}; 

const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();


export const sendOtp = async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) {
      return res.json({ success: false, message: "Phone required" });
    }

    const otp = generateOtp();
    const expires = Date.now() + 5 * 60 * 1000;
    otpStore[phone] = { otp, expires };

    await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone.startsWith("+") ? phone : `+91${phone}`, // हमेशा country code के साथ
    });

    res.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// OTP verify
export const verifyOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;
    if (!phone || !otp) {
      return res.json({ success: false, message: "Phone & OTP required" });
    }

    const record = otpStore[phone];
    if (!record) return res.json({ success: false, message: "No OTP sent" });

    if (record.expires < Date.now()) {
      delete otpStore[phone];
      return res.json({ success: false, message: "OTP expired" });
    }

    if (record.otp !== otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    delete otpStore[phone];
    res.json({ success: true, message: "Phone verified" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};
