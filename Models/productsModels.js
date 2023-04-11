import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  isavailble: { type: Boolean },
  thumbnail: { type: String },
  images: [String],
  stars: { type: Number },
  owner: { type: String },
  addedDate: { type: Date },
  Price: { type: Number },
});

const product = mongoose.model("product", productSchema);

export default product;
