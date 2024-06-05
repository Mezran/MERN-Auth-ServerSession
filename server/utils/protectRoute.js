import User from "../api/user/userModel.js";
import asyncHandler from "./asyncHandler.js";
// middleware that checks if the user is logged in
// by sessions

export const protectRoute = asyncHandler(async (req, res, next) => {
  if (!req.session.user) {
    return res
      .status(401)
      .send({ name: "AuthError", messages: ["Unauthorized to access resource"] });
  }
  req.user = await User.findOne({
    username: req.session?.user.username,
    email: req.session?.user.email,
  });

  next();
});
