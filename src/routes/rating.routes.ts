import { Router } from "express";
import auth from "../middlewares/auth";
import { rateRecipe } from "../controllers/rating.controller";

const router = Router();

router.post("/:id", auth, rateRecipe);

export default router;
