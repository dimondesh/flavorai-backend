import prisma from "../prisma/client";

export const rateRecipe = async (
  recipeId: number,
  userId: number,
  value: number
) => {
  if (value < 1 || value > 5) throw new Error("Invalid rating");

  return prisma.rating.upsert({
    where: { userId_recipeId: { userId, recipeId } },
    update: { value },
    create: { value, userId, recipeId },
  });
};
