import express from "express";
import { userLogin, userRegister, userLogout, userSession } from "./userController.js";

const userRoutes = express.Router();

userRoutes.post("/register", userRegister);
userRoutes.post("/login", userLogin);
userRoutes.delete("/logout", userLogout);
userRoutes.get("/session", userSession);
export default userRoutes;
