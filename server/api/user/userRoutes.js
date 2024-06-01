import express from "express";
import { protectRoute } from "../../utils/protectRoute.js";
import {
  userLogin,
  userRegister,
  userLogout,
  userSession,
  userUpdate,
  userDelete,
} from "./userController.js";

const userRoutes = express.Router();

userRoutes.post("/register", userRegister);
userRoutes.post("/login", userLogin);
userRoutes.delete("/logout", userLogout);
userRoutes.get("/session", userSession);
userRoutes.patch("/", protectRoute, userUpdate);
userRoutes.delete("/", protectRoute, userDelete);
export default userRoutes;
