import Joi from "joi";
const email = Joi.string().email().required();
const username = Joi.string().alphanum().min(1).max(30).required();
const message =
  "must be between 1-32 characters, " +
  "have at least one capital letter, " +
  "one lowercase letter, one digit, " +
  "and one special character";
const password = Joi.string()
  .min(1)
  .max(32)
  .required()
  // regex for at least one lower case letter
  .pattern(new RegExp("^(?=.*[a-z])"))
  // regex for at least one capital letter, one lowercase letter, one digit, and one special character
  //   .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])"))

  .message(message);
export const signUp = Joi.object().keys({
  email,
  username,
  password,
});
export const signIn = Joi.object().keys({
  email,
  password,
});
