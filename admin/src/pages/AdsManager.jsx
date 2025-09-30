import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";// ✅ env se API URL lo

const AdsManager = () => {
  const [ads, setAds] = useState([]);
  const [file, setFile] = useState(null);
  const [link, setLink] = useState("");

  const getAds = async () => {
    try {
      const res = await axios.get(`${API}/ads`);
      setAds(res.data);
    } catch (err) {
      toast.error("Failed to fetch ads!");
      console.error(err);
    }
  };

  useEffect(() => { getAds(); }, []);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const addAd = async () => {
    if (!file) return toast.error("Please select an image!");
    const formData = new FormData();
    formData.append("image", file);
    formData.append("link", link);

    try {
      await axios.post(`${API}/ads`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Ad uploaded successfully!");
      setFile(null);
      setLink("");
      getAds();
    } catch (err) {
      toast.error("Failed to upload ad!");
      console.error(err);
    }
  };

  const deleteAd = async (id) => {
    try {
      await axios.delete(`${API}/ads/${id}`);
      toast.success("Ad deleted successfully!");
      getAds();
    } catch (err) {
      toast.error("Failed to delete ad!");
      console.error(err);
    }
  };

  return (
    <div className="p-4">
      <ToastContainer />
      <h2 className="text-xl font-bold mb-4">Advertisement Manager</h2>

      <div className="flex gap-2 mb-4 items-center">
        <input type="file" onChange={handleFileChange} className="border p-2 rounded" />
        <input
          type="text"
          placeholder="Ad Link (optional)"
          className="border p-2 rounded w-1/3"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <button onClick={addAd} className="bg-blue-500 text-white px-4 py-2 rounded">Upload Ad</button>
      </div>

      <ul>
        {ads.map((ad) => (
          <li key={ad._id} className="flex items-center justify-between mb-2 border p-2 rounded">
            <img src={ad.image_url} alt="Ad" className="h-16 w-32 object-cover rounded" />
            <a href={ad.link || "#"} target="_blank" rel="noreferrer" className="text-blue-500 underline">
              {ad.link || "No Link"}
            </a>
            <button onClick={() => deleteAd(ad._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdsManager;
