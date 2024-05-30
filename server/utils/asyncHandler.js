import { parseError } from "./helpers.js";

// * asyncHandler
// * @res.status returns:
// * - error.code -- integer
// * - error.severity -- string
// * - error.messages -- [string]
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((error) => {
    // process.env.NODE_ENV !== "test" ? console.log(error) : null;
    console.log(error);
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
      case "AuthError":
        return res.status(error.code || 401).json({
          severity: error.severity || "error",
          messages: error.messages,
        });
      case "UserError":
        return res.status(error.code || 400).json({
          severity: error.severity || "error",
          messages: error.messages,
        });
      default:
        return res
          .status(500)
          .json({ messages: ["Server error"], error: parseError(error) });
    }
  });
};

export default asyncHandler;
