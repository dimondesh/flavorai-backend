import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import recipeRoutes from "./routes/recipe.routes";
import ratingRoutes from "./routes/rating.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/recipes", recipeRoutes);
app.use("/ratings", ratingRoutes);

app.use((err: any, req: any, res: any, next: any) => {
  console.error(err);
  res.status(500).json({ message: err.message || "Server error" });
});

export default app;
