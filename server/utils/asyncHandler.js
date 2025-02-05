// * asyncHandler
// * @res.status returns:
// * - error.code -- integer
// * - error.severity -- string
import mongoose from "mongoose";
import yup from "yup";

// logger
import logger from "../services/logger.js";

// * - error.messages -- [string]
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((error) => {
    process.env.NODE_ENV !== "test" ? logger.error("Async handler error: ", error) : null;

    // ! ---- Mongoose Error ----
    if (
      error instanceof mongoose.Error.ValidationError ||
      error instanceof mongoose.Error.CastError ||
      error instanceof mongoose.Error.ValidatorError
    ) {
      return res.status(400).json({
        severity: "error",
        messages: Object.values(error.errors).map((el) => el.message),
      });
    }
    // ! ---- Yup Error ----
    else if (error instanceof yup.ValidationError) {
      return res.status(400).json({
        severity: "error",
        messages: error.errors,
      });
    }
    // ! ---- Custom Error ----
    else if (error.name === "AuthError") {
      return res.status(error.code || 401).json({
        severity: error.severity || "error",
        messages: error.messages,
      });
    } else if (error.name === "UserError") {
      return res.status(error.code || 400).json({
        severity: error.severity || "error",
        messages: error.messages,
      });
    }
    // ! ---- Info Error ----
    else if (error.name === "InfoError") {
      return res.status(error.code || 400).json({
        severity: error.severity || "info",
        messages: error.messages,
      });
    }
    // ! ---- Server Error ----
    else {
      return res.status(500).json({ messages: ["Server error"], error: error });
    }
  });
};

export default asyncHandler;
