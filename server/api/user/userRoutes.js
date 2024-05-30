import express from "express";
import { protectRoute } from "../../utils/protectRoute.js";
import {
  userLogin,
  userRegister,
  userLogout,
  userSession,
  userUpdate,
} from "./userController.js";

const userRoutes = express.Router();

userRoutes.post("/register", userRegister);
userRoutes.post("/login", userLogin);
userRoutes.delete("/logout", userLogout);
userRoutes.get("/session", userSession);
userRoutes.patch("/", protectRoute, userUpdate);
export default userRoutes;
