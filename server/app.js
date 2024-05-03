import express from "express";
import dotenv from "dotenv";
dotenv.config();

// import routes
import userRoutes from "./api/user/userRoutes.js";

import cors from "cors";

const app = express();
app.disable("x-powered-by"); // hide the fact that we are using Express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// routes
app.use("/api/user", userRoutes);

export default app;
