import Category from "../models/category.model.js";
import Product from "../models/products.model.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category");

    res.json({ status: "success", results: products.length, data: products });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: "error", data: err });
  }
};

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    await Category.findByIdAndUpdate(req.body.categoryId, {
      $push: { products: product._id },
    });

    res.json({ status: "success", data: product });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: "error", data: err });
  }
};
