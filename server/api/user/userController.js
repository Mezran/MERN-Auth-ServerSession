// imports
import User from "./userModel.js";
import {
  userRegisterSchema,
  userLoginSchema,
  userUpdateSchema,
  userDeleteSchema,
} from "./userValidation.js";
import { sessionizeUser } from "../../utils/helpers.js";

// POST /api/user/register
export const userRegister = async (req, res) => {
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
};

// POST /api/user/login
export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  await userLoginSchema.validate({ email, password }, { abortEarly: false });

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
};

// GET /api/user/session
export const userSession = async (req, res) => {
  const { user } = req.session;
  if (!user || !user.email) return userLogout(req, res);
  const userExists = await User.findOne({ email: user.email });
  if (!userExists) return userLogout(req, res);

  const sessionUser = sessionizeUser(user);
  req.session.user = sessionUser;
  res.send({ user: sessionUser });
};

// DELETE /api/user/logout
export const userLogout = async (req, res) => {
  const { user } = req.session;

  if (!user)
    throw { name: "UserError", code: 401, severity: "error", messages: ["Unauthorized"] };

  req.session.destroy((err) => {
    if (err) throw err;
    res.clearCookie(process.env.SESS_NAME);
    res.session = null;
    res.send({ user: null, messages: ["Logged out"] });
  });
};

// UPDATE /api/user
export const userUpdate = async (req, res) => {
  const userToUpdate = {};
  if (req.body.username) userToUpdate.username = req.body.username;
  if (req.body.password) userToUpdate.password = req.body.password;
  if (req.body.passwordCurrent) userToUpdate.passwordCurrent = req.body.passwordCurrent;

  if (userToUpdate.username == undefined && userToUpdate.password == undefined)
    throw {
      name: "InfoError",
      code: 400,
      severity: "info",
      messages: ["No changes submitted"],
    };

  await userUpdateSchema.validate(userToUpdate, { abortEarly: false });

  if (!req.user || !req.user.comparePasswords(userToUpdate.passwordCurrent))
    throw {
      name: "UserError",
      code: 401,
      severity: "error",
      messages: ["Invalid current password"],
    };

  const updatedUser = await User.findByIdAndUpdate(req.user._id, userToUpdate, {
    new: true,
  });

  const sessionUser = sessionizeUser(updatedUser);
  req.session.user = sessionUser;
  res.send({ user: sessionUser, messages: ["User updated"] });
};

// DELETE /api/user
export const userDelete = async (req, res) => {
  const { passwordCurrent } = req.body;

  await userDeleteSchema.validate({ passwordCurrent }, { abortEarly: false });

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
};
