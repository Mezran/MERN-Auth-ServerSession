import mongoose from "mongoose";
import User from "../api/user/userModel";
import request from "supertest";
import app from "../app";

export const connectDB = async () => {
  try {
    // Close any existing connections first
    await mongoose.disconnect();

    const mongoDBUrl = process.env.MONGODB_URI_TESTING;
    await mongoose.connect(mongoDBUrl, {
      autoIndex: true,
      autoCreate: true,
    });
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
};

export const closeDB = async () => {
  try {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close(true); // force close
    await mongoose.disconnect();

    // Additional cleanup to ensure all connections are closed
    const collections = mongoose.connections;
    for (const connection of collections) {
      await connection.close(true);
    }
  } catch (error) {
    console.error("Database disconnection error:", error);
    throw error;
  }
};

export const clearDB = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany();
  }
};

export const clearSessions = async () => {
  const collections = await mongoose.connection.db.listCollections().toArray();
  const sessionCollectionExists = collections.some(
    (collection) => collection.name === "sessions"
  );

  if (sessionCollectionExists) {
    await mongoose.connection.db.collection("sessions").drop();
  }
};

export async function createTestUserAndGetCookie(username) {
  const userModel = {
    username: username,
    email: `${username}@t.t`,
    password: username,
  };

  const newUser = new User(userModel);
  await newUser.save();

  const res = await request(app).post("/api/user/login").send({
    email: userModel.email,
    password: userModel.password,
  });

  return {
    user: userModel,
    cookie: res.headers["set-cookie"],
  };
}
