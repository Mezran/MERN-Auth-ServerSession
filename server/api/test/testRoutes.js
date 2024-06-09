import express from "express";
import { protectRoute } from "../../utils/protectRoute.js";

import { testLoggerError } from "./testController.js";

const testRoutes = express.Router();

testRoutes.get("/logger-error", protectRoute, testLoggerError);

export default testRoutes;
