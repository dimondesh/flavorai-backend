import { Request, Response, NextFunction } from "express";
import * as recipeService from "../services/recipe.service";
import cloudinary from "../utils/cloudinary";

export const getAllRecipes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const search = req.query.search as string | undefined;
    const recipes = await recipeService.getAll(search);
    res.json(recipes);
  } catch (err) {
    next(err);
  }
};

export const getRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const recipe = await recipeService.getById(Number(req.params.id));
    res.json(recipe);
  } catch (err) {
    next(err);
  }
};

export const getMyRecipes = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const recipes = await recipeService.getByAuthor(req.user.id);
    res.json(recipes);
  } catch (err) {
    next(err);
  }
};

export const createRecipe = async (req: any, res: Response) => {
  try {
    const files = req.files || [];

    let uploadedUrls: string[] = [];

    if (files.length > 0) {
      for (const file of files) {
        const result: any = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "flavorai" },
            (err, result) => {
              if (err) reject(err);
              else resolve(result);
            }
          );
          stream.end(file.buffer);
        });

        uploadedUrls.push(result.secure_url);
      }
    }

    const data = {
      ...req.body,
      images: uploadedUrls,
    };

    const recipe = await recipeService.create(req.user.id, data);
    res.json(recipe);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create recipe" });
  }
};

export const updateRecipe = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const recipe = await recipeService.update(
      Number(req.params.id),
      req.user.id,
      req.body
    );
    res.json(recipe);
  } catch (err) {
    next(err);
  }
};

export const deleteRecipe = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await recipeService.remove(
      Number(req.params.id),
      req.user.id
    );
    res.json(result);
  } catch (err) {
    next(err);
  }
};
