import mongoose from "mongoose";

let connectionPromise = null;

export function isDatabaseConnected() {
  return mongoose.connection.readyState === 1;
}

export function connectDatabase() {
  if (connectionPromise) {
    return connectionPromise;
  }

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is required to start the API server.");
  }

  connectionPromise = mongoose
    .connect(uri, {
      serverSelectionTimeoutMS: 10000,
    })
    .catch((error) => {
      connectionPromise = null;
      throw error;
    });

  return connectionPromise;
}
