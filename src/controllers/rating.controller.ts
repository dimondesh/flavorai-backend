import { Request, Response, NextFunction } from "express";
import * as ratingService from "../services/rating.service";

export const rateRecipe = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const recipeId = Number(req.params.id);
    const userId = req.user.id;
    const { value } = req.body;

    const rating = await ratingService.rateRecipe(recipeId, userId, value);

    res.json(rating);
  } catch (err) {
    next(err);
  }
};
