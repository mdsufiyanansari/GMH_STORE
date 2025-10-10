import React, { useContext, useEffect, useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);

  const [method, setMethod] = useState('cod');
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    district: "",
    pincode: "",
    country: "",
    phone: "",
  });

  const [isPinValid, setIsPinValid] = useState(true);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);

  useEffect(() => {
    if (!token) navigate('/login');
  }, [token]);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData(data => ({ ...data, [name]: value }));

    if (name === "pincode" && value.length === 6) {
      fetchStateDistrict(value);
    }
  };

  const fetchStateDistrict = async (pin) => {
    try {
      const res = await axios.get(`https://api.postalpincode.in/pincode/${pin}`);
      if (res.data[0].Status === "Success") {
        const postOffice = res.data[0].PostOffice[0];
        setFormData(data => ({
          ...data,
          state: postOffice.State,
          district: postOffice.District
        }));
        setIsPinValid(true);
      } else {
        setFormData(data => ({
          ...data,
          state: "",
          district: ""
        }));
        setIsPinValid(false);
      }
    } catch (err) {
      console.error(err);
      setIsPinValid(false);
    }
  };

  const sendOtp = async () => {
    if (!formData.phone) return toast.error("Please enter phone number!");
    try {
      const res = await axios.post(`${backendUrl}/api/send-otp`, { phone: formData.phone });
      if (res.data.success) {
        toast.success("OTP sent to your mobile!");
        setOtpSent(true);
      } else {
        toast.error(res.data.message || "Failed to send OTP");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error sending OTP");
    }
  };

  const verifyOtp = async () => {
    if (!otp) return toast.error("Enter OTP!");
    try {
      const res = await axios.post(`${backendUrl}/api/verify-otp`, { phone: formData.phone, otp });
      if (res.data.success) {
        toast.success("Phone verified!");
        setOtpVerified(true);
      } else {
        toast.error(res.data.message || "OTP incorrect");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error verifying OTP");
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!isPinValid) {
      toast.error("Invalid Pincode! Please enter a correct one.");
      return;
    }

    if (!otpVerified) {
      toast.error("Please verify your phone number first!");
      return;
    }

    try {
      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find(product => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        case "cod":
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } }
          );

          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;

        case "razorpay":
          const responseRazorpay = await axios.post(
            backendUrl + "/api/order/razorpay",
            orderData,
            { headers: { token } }
          );

          if (responseRazorpay.data.success) {
            const { order } = responseRazorpay.data;

            // ✅ Ensure Razorpay script is loaded
            if (!window.Razorpay) {
              await new Promise((resolve, reject) => {
                const script = document.createElement("script");
                script.src = "https://checkout.razorpay.com/v1/checkout.js";
                script.onload = resolve;
                script.onerror = reject;
                document.body.appendChild(script);
              });
            }

            const options = {
              key: import.meta.env.VITE_RAZORPAY_KEY_ID,
              amount: order.amount,
              currency: order.currency,
              name: "Your Shop Name",
              description: "Order Payment",
              order_id: order.id,
              receipt: order.receipt,
              handler: function (response) {
                console.log(response);
                toast.success("Payment successful!");
                navigate("/orders");
              },
              prefill: {
                name: formData.firstName + " " + formData.lastName,
                email: formData.email,
                contact: formData.phone,
              },
            };

            const rzp = new window.Razorpay(options); // ✅ fixed
            rzp.open();
          }
          break;

        default:
          break;
      }

    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center bg-black items-center h-[60vh]">
        <img
          src="https://engineermart.in/web/site/assets/img/loader/loading.gif"
          alt="loading"
          className="w-40 h-40"
        />
      </div>
    );
  }

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col py-32 md:flex-row gap-10 p-6">

      {/* Left Side */}
      <div className="flex-1 bg-white shadow-lg rounded-2xl p-6">
        <div className="text-2xl mb-6 font-semibold">
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>

        <div className="flex gap-4 mb-4">
          <input onChange={onChangeHandler} name="firstName" value={formData.firstName} required type="text" placeholder="First name"
            className="w-1/2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          <input onChange={onChangeHandler} name="lastName" value={formData.lastName} required type="text" placeholder="Last name"
            className="w-1/2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>

        <input onChange={onChangeHandler} name="email" value={formData.email} required type="email" placeholder="Email"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500" />

        <input onChange={onChangeHandler} name="street" value={formData.street} required type="text" placeholder="Street"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500" />

        <div className="flex gap-4 mb-4">
          <input name="city" value={formData.district} required type="text" placeholder="District"
            readOnly className={`w-1/2 border ${isPinValid ? 'border-gray-300' : 'border-red-500'} rounded-lg px-4 py-2`} />
          <input name="state" value={formData.state} required type="text" placeholder="State"
            readOnly className={`w-1/2 border ${isPinValid ? 'border-gray-300' : 'border-red-500'} rounded-lg px-4 py-2`} />
        </div>

        <div className="flex gap-4 mb-4">
          <input onChange={onChangeHandler} name="pincode" value={formData.pincode} required type="number" placeholder="Pincode"
            className={`w-1/2 border ${isPinValid ? 'border-gray-300' : 'border-red-500'} rounded-lg px-4 py-2`} />
          <input onChange={onChangeHandler} name="country" value={formData.country} required type="text" placeholder="Country"
            className="w-1/2 border border-gray-300 rounded-lg px-4 py-2" />
        </div>

        {/* OTP */}
        <div className="flex gap-4 mb-4 items-center">
          <input
            onChange={onChangeHandler}
            name="phone"
            value={formData.phone}
            required
            type="tel"
            placeholder="Phone (+91XXXXXXXXXX)"
            className="w-1/2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={otpVerified}
          />
          {!otpSent && !otpVerified && (
            <button type="button" onClick={sendOtp} className="bg-blue-500 text-white px-4 py-2 rounded">Send OTP</button>
          )}
        </div>

        {otpSent && !otpVerified && (
          <div className="flex gap-4 mb-4 items-center">
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              type="number"
              placeholder="Enter OTP"
              className="w-1/2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button type="button" onClick={verifyOtp} className="bg-green-500 text-white px-4 py-2 rounded">Verify OTP</button>
          </div>
        )}

        {otpVerified && <p className="text-green-600 mb-4">Phone verified ✅</p>}
      </div>

      {/* Right Side */}
      <div className="flex-1 bg-gray-50 shadow-inner rounded-2xl p-6">
        <CartTotal />
        <div className="mt-10">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          <div className="mt-6 space-x-4 flex">
            <div onClick={() => setMethod('razorpay')} className="flex items-center gap-4 border rounded-lg p-3 cursor-pointer hover:shadow-md transition">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
              <img src={assets.razorpay} alt="Razorpay" className="h-6 object-contain" />
            </div>

            <div onClick={() => setMethod('cod')} className="flex items-center gap-4 border rounded-lg p-3 cursor-pointer hover:shadow-md transition">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className="text-gray-700 font-medium">CASH ON DELIVERY</p>
            </div>
          </div>
        </div>

        <div className="w-full text-end mt-8">
          <button type='submit' className="bg-black text-white px-16 py-3 text-sm">PLACE ORDER</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
