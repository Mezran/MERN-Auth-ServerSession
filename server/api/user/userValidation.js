// user validation using yup
import * as yup from "yup";
export const userRegisterSchema = yup.object().shape({
  email: yup.string().email().required(),
  username: yup.string().required(),
  password: yup.string().required(),
});

export const userLoginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const userUpdateSchema = yup.object().shape({
  email: yup.string().email().optional(),
  username: yup.string().optional(),
  password: yup.string().optional(),
  passwordCurrent: yup.string().required(),
});
