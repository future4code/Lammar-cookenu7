import express from "express"
import { UserController } from "../controller/UserController";

const userController = new UserController();

export const userRouter = express.Router();

userRouter.post("/signup", userController.createUser)
userRouter.post("/login", userController.login)
userRouter.get("/profile", userController.getUser)
userRouter.post("/follow", userController.createFollow)
userRouter.post("/unfollow", userController.unfollow)



