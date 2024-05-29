// imports
import asyncHandler from "../../utils/asyncHandler.js";
import User from "./userModel.js";
import Joi from "joi";
import { signUp, signIn } from "./userValidation.js";
import { sessionizeUser } from "../../utils/helpers.js";

// POST /api/user/register
export const userRegister = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  await signUp.validateAsync({ username, email, password });

  const newUser = new User({ username, email, password });
  await newUser.save();

  const sessionUser = sessionizeUser(newUser);
  req.session.user = sessionUser;
  res.send({ user: sessionUser, message: "User registered" });
});

// POST /api/user/login
export const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  await signIn.validateAsync({ email, password });

  const user = await User.findOne({ email });
  if (!user || !user.comparePasswords(password))
    throw {
      name: "UserError",
      code: 401,
      severity: "error",
      message: "Invalid login credentials",
    };

  const sessionUser = sessionizeUser(user);
  req.session.user = sessionUser;
  res.send({ user: sessionUser, message: "Logged in" });
});

// GET /api/user
export const userSession = asyncHandler(async (req, res) => {
  const { user } = req.session;
  if (!user) return res.send({ user: null });

  const sessionUser = sessionizeUser(user);
  req.session.user = sessionUser;
  res.send({ user: sessionUser });
});

// DELETE /api/user/logout
export const userLogout = asyncHandler(async (req, res) => {
  const { user } = req.session;

  if (!user)
    throw { name: "UserError", code: 401, severity: "error", message: "Unauthorized" };

  req.session.destroy((err) => {
    if (err) throw err;
    res.clearCookie(process.env.SESS_NAME);
    res.session = null;
    res.send({ user: null, message: "Logged out" });
  });
});
