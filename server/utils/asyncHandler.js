import { parseError } from "./helpers.js";

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((error) => {
    process.env.NODE_ENV !== "test" ? console.log(error) : null;
    // switch on error type pass in error.code
    switch (error.code) {
      case 200:
        return res
          .status(error.code)
          .json({ message: error.message, error: error.error });
      default:
        return res
          .status(500)
          .json({ message: "Server error", error: parseError(error) });
    }
  });
};

export default asyncHandler;
