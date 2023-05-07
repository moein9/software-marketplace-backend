import { Router } from "express";
import {
  createCategory,
  getCategories,
  registerCategory,
} from "../controllers/category.controller.js";

const router = Router();

router.route("/categories").post(createCategory).get(getCategories);
router.route("/categories/:categoryId/products").patch(registerCategory);

export default router;
