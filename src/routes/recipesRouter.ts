import express from "express"
import { RecipesController } from "../controller/RecipesController";

const recipeController = new RecipesController();

export const recipeRouter = express.Router();


recipeRouter.post("/create", recipeController.createRecipes)
recipeRouter.get("/:id", recipeController.getRecipe)
recipeRouter.put("/edit/:id", recipeController.editRecipe)