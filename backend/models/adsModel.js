import mongoose from "mongoose";

const adSchema = new mongoose.Schema(
  {
    image_url: { type: String, required: true },
    link: { type: String, default: null },
      public_id: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Ad", adSchema);
