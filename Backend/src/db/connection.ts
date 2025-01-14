import mongoose from "mongoose";
let db;

export async function connectedToDatabase() {
  if (!db) {
    const connectionString = process.env.MONGODB_URL;
    if (!connectionString) {
      throw new Error("MONGODB_URL is not defined in environment variables");
    }
    try {
      db = await mongoose.connect(connectionString);
    } catch (error) {
      console.log(`Error connecting to database: ${error.message}`);
      throw new Error(`connect to database failed: ${error.message}`);
    }
  }
  return db;
}
