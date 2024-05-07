import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import session from "express-session";
import connectStore from "connect-mongo";

// import routes
import userRoutes from "./api/user/userRoutes.js";

// app config
const app = express();
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/no-env-db";

app.disable("x-powered-by"); // hide the fact that we are using Express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
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
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// routes
app.use("/api/user", userRoutes);

export default app;
