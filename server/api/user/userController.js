// imports
import asyncHandler from "../../utils/asyncHandler.js";
import User from "./userModel.js";
import Joi from "joi";
import { signUp } from "./userValidation.js";

export const userRegister = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  await signUp.validateAsync({ username, email, password });

  const newUser = new User({ username, email, password });
  await newUser.save();
  res.send({ userId: newUser._id, username: newUser.username, email: newUser.email });
});
