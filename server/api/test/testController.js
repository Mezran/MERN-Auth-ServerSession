//
import { asyncHandler } from "../../utils/asyncHandler.js";

// GET /api/test/logger-error
export const testLoggerError = asyncHandler(async (req, res) => {
  throw {
    name: "InfoError",
    code: 400,
    severity: "error",
    messages: ["test of logger error route"],
  };
  res.send({ messages: ["This should not be hit"] });
});
