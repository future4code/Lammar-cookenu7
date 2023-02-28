import express from "express"
import { UserController } from "../controller/UserController";

const userController = new UserController();

export const userRouter = express.Router();

userRouter.post("/create", userController.createUser)
userRouter.post("/login", userController.login)

