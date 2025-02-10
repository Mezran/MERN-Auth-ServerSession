import mongoose from "mongoose";

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
