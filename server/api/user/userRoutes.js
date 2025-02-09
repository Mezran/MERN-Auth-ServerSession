import express from "express";
import { protectRoute } from "../../utils/protectRoute.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import {
  userLogin,
  userRegister,
  userLogout,
  userSession,
  userUpdate,
  userDelete,
} from "./userController.js";

const userRoutes = express.Router();

userRoutes.post("/register", asyncHandler(userRegister));
userRoutes.post("/login", asyncHandler(userLogin));
userRoutes.delete("/logout", asyncHandler(userLogout));
userRoutes.get("/session", asyncHandler(userSession));
userRoutes.patch("/", protectRoute, asyncHandler(userUpdate));
userRoutes.delete("/", protectRoute, asyncHandler(userDelete));
export default userRoutes;
