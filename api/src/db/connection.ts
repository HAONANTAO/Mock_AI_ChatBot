import mongoose from "mongoose";

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cached.promise = mongoose
      .connect(process.env.MONGODB_URL, opts)
      .then((mongoose) => {
        console.log("Connected to MongoDB successfully");
        return mongoose;
      })
      .catch((error) => {
        console.error("Failed to connect to MongoDB:", error);
        throw new Error("Failed to connect to MongoDB: " + error.message);
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

async function disconnectToDatabase() {
  if (cached.conn) {
    try {
      await cached.conn.disconnect();
      console.log("Disconnected from MongoDB successfully");
      cached.conn = null;
      cached.promise = null;
    } catch (error) {
      console.error("Failed to disconnect from MongoDB:", error);
      throw new Error("Failed to disconnect from MongoDB: " + error.message);
    }
  }
}

export { connectToDatabase, disconnectToDatabase };
