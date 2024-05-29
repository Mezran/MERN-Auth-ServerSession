import { parseError } from "./helpers.js";

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((error) => {
    // process.env.NODE_ENV !== "test" ? console.log(error) : null;

    // switch on error type pass in error.code
    switch (error.name) {
      case "ValidationError":
        let errorList = [];
        if (error.isJoi) {
          // Joi validation errors
          errorList = error.details.map((el) => el.message);
        } else {
          // mongoose errors
          errorList = Object.values(error.errors).map((el) => el.message);
        }
        return res.status(error.code || 400).json({
          severity: error.severity || "error",
          messages: errorList,
        });
      case "UserError":
        return res.status(error.code || 400).json({
          severity: error.severity || "error",
          messages: error.messages,
        });
      default:
        return res
          .status(500)
          .json({ message: "Server error", error: parseError(error) });
    }
  });
};

export default asyncHandler;
