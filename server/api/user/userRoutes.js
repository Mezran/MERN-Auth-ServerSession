import express from "express";
import { userRegister } from "./userController.js";

const userRoutes = express.Router();

userRoutes.post("/register", userRegister);
export default userRoutes;
