import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },

  products: [{ type: mongoose.Types.ObjectId, ref: "product" }],
});

const category = mongoose.model("category", categorySchema);
export default category;
