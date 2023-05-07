import { Router } from "express";
import {
  addDeveloper,
  getDeveloperById,
  getDeveloperStats,
  getDevelopers,
} from "../controllers/developer.controller.js";
import {
  resizeImage,
  resizeImages,
  uploadMulti,
  uploadSingle,
} from "../middlewares/multer.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";


const router = Router();


router.route("/").post(protect, addDeveloper).get(getDevelopers);

router.route("/Developer-stats").get(getDeveloperStats);

router.route("/upload").post(uploadSingle, resizeImage, (req, res) => {
  res.json({ path: `Developers/${req.file.filename}` });
});

router.route("/upload-multi").post(uploadMulti, resizeImages, (req, res) => {
  res.json({ paths: req.body.files });
});

router.route("/:id").get(getDeveloperById);

export default router;
