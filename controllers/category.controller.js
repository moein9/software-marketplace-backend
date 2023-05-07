import Category from "../models/category.model.js";
import Developer from "../models/developer.models.js";
import Product from "../models/products.model.js";

export const createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.json({ status: "success", data: category });
  } catch (err) {
    res.status(400).json({ status: "error", data: err });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate({
      path: "products",
      match: { isActive: true },
    });

    res.json({
      status: "success",
      results: categories.length,
      data: categories,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: "error", data: err });
  }
};

export const registerCategory = async (req, res) => {
  try {
    const productsArr = req.body.products;

    const category = await Category.findByIdAndUpdate(
      req.params.categoryId,
      {
        $push: { products: productsArr },
      },
      {
        new: true,
      }
    );

    for (let product of productsArr) {
      const prod = await Product.findByIdAndUpdate(product, {
        $push: { categories: req.params.categoryId },
      });
    }

    res.json({ status: "success", data: category });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: "error", data: err });
  }
};
