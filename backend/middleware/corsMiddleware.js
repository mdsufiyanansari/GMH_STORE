import cors from "cors";

const corsOptions = {
  origin: "https://gmh-store.vercel.app/", // ✅ frontend URL
  credentials: true, // agar cookies/token bhejna ho
};

export default cors(corsOptions);
