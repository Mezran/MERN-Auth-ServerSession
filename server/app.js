console.log("app.js");
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import session from "express-session";
import connectStore from "connect-mongo";

// logging
import logger from "./services/logger.js";

// import routes
import userRoutes from "./api/user/userRoutes.js";
import testRoutes from "./api/test/testRoutes.js";

// app config
const app = express();
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/no-env-db";

app.disable("x-powered-by"); // hide the fact that we are using Express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(
  session({
    name: process.env.SESS_NAME,
    secret: process.env.SESS_SECRET,
    saveUninitialized: false,
    resave: false,
    store: connectStore.create({
      // TODO: figure out a better way to handle this
      mongoUrl: MONGODB_URI,
      collectionName: "session",
      ttl: process.env.SESS_LIFETIME / 1000,
    }),
    cookie: {
      sameSite: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: process.env.SESS_LIFETIME / 1,
    },
  })
);

// logging
if (process.env.NODE_ENV !== "test") {
  app.use((req, res, next) => {
    logger.http(`${req.method} ${req.url}`);
    next();
  });
}

// routes
app.use("/api/user", userRoutes);
app.use("/api/test", testRoutes);

export default app;
