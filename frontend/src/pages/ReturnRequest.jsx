import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const ReturnRequest = () => {
  const backendUrl = "http://localhost:4000";
  const navigate = useNavigate();
  const location = useLocation();

  const { orderId, productId, name, userName, userAddress, userMobile } = location.state || {};

  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!reason) {
    setMessage("कृपया सभी आवश्यक फ़ील्ड भरें।");
    return;
  }

  setLoading(true);
  setMessage("");

  try {
    const res = await axios.post(`${backendUrl}/api/returns`, {
      orderId,
      productId,
      productName: name,
      userName,      // explicitly send
      userAddress,   // explicitly send
      userMobile,    // explicitly send
      reason,
      details,
    });

    if (res.data.success) {
      setMessage("✅ Return request सफलतापूर्वक जमा हुआ!");
      window.open(res.data.whatsappURL, "_blank"); // WhatsApp link
      setTimeout(() => navigate("/orders"), 2000);
    } else {
      setMessage("❌ Return request जमा करने में विफल।");
    }
  } catch (err) {
    console.error(err);
    setMessage("❌ Return request भेजने में त्रुटि।");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="p-8 max-w-xl mx-auto bg-white rounded-2xl shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Return Request Form</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <label>Name</label>
        <input type="text" value={userName} disabled className="border p-2 rounded" />
        <label>Address</label>
        <input type="text" value={userAddress} disabled className="border p-2 rounded" />
        <label>Mobile</label>
        <input type="text" value={userMobile} disabled className="border p-2 rounded" />

        <label>Reason for Return*</label>
        <select value={reason} onChange={(e) => setReason(e.target.value)} className="border p-2 rounded">
          <option value="">Select Reason</option>
          <option value="Damaged Product">Damaged Product</option>
          <option value="Wrong Item Delivered">Wrong Item Delivered</option>
          <option value="Quality Issue">Quality Issue</option>
          <option value="Other">Other</option>
        </select>

        <label>Additional Details</label>
        <textarea value={details} onChange={(e) => setDetails(e.target.value)} rows="4" className="border p-2 rounded" />

        {message && <p className="text-center">{message}</p>}

        <button type="submit" disabled={loading} className="bg-blue-600 text-white p-2 rounded">
          {loading ? "Submitting..." : "Submit Return Request"}
        </button>
      </form>
    </div>
  );
};

export default ReturnRequest;
