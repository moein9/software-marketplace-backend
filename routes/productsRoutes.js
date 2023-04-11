import { Router } from "express";
import { addproduct } from "../controllers/productsController.js";

const router = Router();

router.route('/').post(addproduct);

export default router;
