// imports
import asyncHandler from "../../utils/asyncHandler.js";
import User from "./userModel.js";
import {
  userRegisterSchema,
  userLoginSchema,
  userUpdateSchema,
} from "./userValidation.js";
import { sessionizeUser } from "../../utils/helpers.js";

// POST /api/user/register
export const userRegister = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // await signUp.validateAsync({ username, email, password });
  const asd = await userRegisterSchema.validate(
    { username, email, password },
    { abortEarly: false }
  );

  const newUser = new User({ username, email, password });
  await newUser.save();

  const sessionUser = sessionizeUser(newUser);
  req.session.user = sessionUser;
  res.send({ user: sessionUser, messages: ["User registered"] });
});

// POST /api/user/login
export const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  await userLoginSchema.validate({ email, password });

  const user = await User.findOne({ email });
  if (!user || !user.comparePasswords(password))
    throw {
      name: "UserError",
      code: 401,
      severity: "error",
      messages: ["Invalid login credentials"],
    };

  const sessionUser = sessionizeUser(user);
  req.session.user = sessionUser;
  res.send({ user: sessionUser, messages: ["Logged in"] });
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
    throw { name: "UserError", code: 401, severity: "error", messages: ["Unauthorized"] };

  req.session.destroy((err) => {
    if (err) throw err;
    res.clearCookie(process.env.SESS_NAME);
    res.session = null;
    res.send({ user: null, messages: ["Logged out"] });
  });
});

// UPDATE /api/user
export const userUpdate = asyncHandler(async (req, res) => {
  const username = req.body.username === "" ? undefined : req.body.username;
  const email = req.body.email === "" ? undefined : req.body.email;
  const password = req.body.password === "" ? undefined : req.body.password;
  const passwordCurrent = req.body.passwordCurrent;

  if (!req.user || !req.user.comparePasswords(passwordCurrent))
    throw {
      name: "UserError",
      code: 401,
      severity: "error",
      messages: ["Invalid current password"],
    };

  await userUpdateSchema.validate({ email, username, password, passwordCurrent });

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    { username, email, password },
    { new: true }
  );

  const sessionUser = sessionizeUser(updatedUser);
  req.session.user = sessionUser;
  res.send({ user: sessionUser, messages: ["User updated"] });
});

// DELETE /api/user
export const userDelete = asyncHandler(async (req, res) => {
  const passwordCurrent = req.body.passwordCurrent;

  if (!req.user || !req.user.comparePasswords(passwordCurrent))
    throw {
      name: "UserError",
      code: 401,
      severity: "error",
      messages: ["Invalid current password"],
    };

  await User.findByIdAndDelete(req.user._id);

  req.session.destroy((err) => {
    if (err) throw err;
    res.clearCookie(process.env.SESS_NAME);
    res.session = null;
    res.send({ user: null, messages: ["User deleted"] });
  });
});
