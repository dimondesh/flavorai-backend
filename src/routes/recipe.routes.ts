import { Router } from "express";
import {
  getAllRecipes,
  getRecipe,
  getMyRecipes,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} from "../controllers/recipe.controller";

import auth from "../middlewares/auth";
import { upload } from "../middlewares/upload";

const router = Router();

router.get("/", getAllRecipes);
router.get("/mine", auth, getMyRecipes);
router.get("/:id", getRecipe);

router.post("/", auth, upload.array("images", 10), createRecipe);
router.put("/:id", auth, updateRecipe);
router.delete("/:id", auth, deleteRecipe);

export default router;
