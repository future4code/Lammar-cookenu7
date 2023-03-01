import { app } from "./app";
import { recipeRouter } from "./routes/recipesRouter";
import { userRouter } from "./routes/userRouter";

app.use("/user", userRouter)
app.use("/recipe", recipeRouter)