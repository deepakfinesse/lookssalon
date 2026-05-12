import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "MONGODB_URI is not defined. Add it to .env.local and Vercel environment variables."
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize:              5,
      serverSelectionTimeoutMS: 4000,  // fail fast on cold-start DB unavailability
      socketTimeoutMS:          6000,  // leaves ~4s for app logic within 10s limit
      connectTimeoutMS:         4000,
    };
    cached.promise = mongoose.connect(MONGODB_URI, opts);
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null; // reset so next request retries cleanly
    throw e;
  }

  return cached.conn;
}

export default connectDB;
