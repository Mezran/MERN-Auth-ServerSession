import { parseError } from "./helpers.js";

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((error) => {
    // process.env.NODE_ENV !== "test" ? console.log(error) : null;

    console.log(error.name);

    // switch on error type pass in error.code
    switch (error.name) {
      case "ValidationError":
        return res.status(error.code || 400).json({
          severity: error.severity || "error",
          messages: Object.values(error.errors).map((el) => el.message) || ["error"],
        });
      default:
        return res
          .status(500)
          .json({ message: "Server error", error: parseError(error) });
    }
  });
};

export default asyncHandler;
