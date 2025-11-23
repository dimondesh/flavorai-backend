import prisma from "../prisma/client";
import cloudinary from "../utils/cloudinary";

function extractPublicId(url: string): string {
  const uploadIndex = url.indexOf("/upload/");
  if (uploadIndex === -1) return "";

  const afterUpload = url.substring(uploadIndex + "/upload/".length);

  const parts = afterUpload.split("/");
  if (parts[0].startsWith("v") && !isNaN(Number(parts[0].substring(1)))) {
    parts.shift();
  }

  const filename = parts.pop();
  if (!filename) return "";

  const fileId = filename.split(".").slice(0, -1).join(".");

  const folder = parts.join("/");

  return folder + "/" + fileId;
}

export const getAll = async (search?: string) => {
  return prisma.recipe.findMany({
    where: search
      ? {
          title: {
            contains: search,
            mode: "insensitive",
          },
        }
      : {},
    include: { ratings: true },
  });
};

export const getById = async (id: number) => {
  const recipe = await prisma.recipe.findUnique({
    where: { id },
    include: { ratings: true },
  });
  if (!recipe) throw new Error("Recipe not found");
  return recipe;
};

export const getByAuthor = async (userId: number) => {
  return prisma.recipe.findMany({ where: { authorId: userId } });
};

export const create = async (authorId: number, data: any) => {
  return prisma.recipe.create({
    data: {
      title: data.title,
      description: data.description,
      ingredients: data.ingredients,
      instructions: data.instructions,
      images: data.images ?? [],
      authorId,
    },
  });
};

export const update = async (id: number, userId: number, data: any) => {
  const recipe = await prisma.recipe.findUnique({ where: { id } });
  if (!recipe) throw new Error("Recipe not found");
  if (recipe.authorId !== userId) throw new Error("Forbidden");

  return prisma.recipe.update({
    where: { id },
    data,
  });
};

export const remove = async (id: number, userId: number) => {
  const recipe = await prisma.recipe.findUnique({
    where: { id },
    include: { ratings: true },
  });

  if (!recipe) throw new Error("Recipe not found");
  if (recipe.authorId !== userId) throw new Error("Forbidden");

  await prisma.rating.deleteMany({ where: { recipeId: id } });

  if (recipe.images && Array.isArray(recipe.images)) {
    for (const imageUrl of recipe.images) {
      const publicId = extractPublicId(imageUrl);
      if (!publicId) continue;

      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (err) {
        console.error("Cloudinary delete error:", err);
      }
    }
  }

  return prisma.recipe.delete({ where: { id } });
};
