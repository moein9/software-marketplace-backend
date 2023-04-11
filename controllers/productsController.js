import Product from "../Models/productsModels.js";

export const addproduct = async (req, res) => {
  try {
    console.log(req.body);
    const product = await Product.create(req.body);
    res.json({ status: "success", data: product });
  } catch (err) {
    res.status(404).json({ status: "failed", data: err });
  }
};
