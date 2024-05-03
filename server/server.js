// server.js
// imports
import mongoose from "mongoose";

// import files
import app from "./app.js";

// app config
const PORT = process.env.PORT || 9876;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/no-env-db";

// connect to db and app listen
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log(`Connected to MongoDB at ${MONGODB_URI}`);
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
