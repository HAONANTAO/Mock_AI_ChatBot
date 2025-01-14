import mongoose from "mongoose";

export async function connectedToDatabase() {
  const connectionString = process.env.MONGODB_URL;
  if (!connectionString) {
    throw new Error("MONGODB_URL is not defined in environment variables");
  }
  try {
    await mongoose.connect(connectionString);
  } catch (error) {
    console.log(`Error connecting to database: ${error.message}`);
    throw new Error(`connect to database failed: ${error.message}`);
  }
}

export async function disconnectToDatabase() {
  try {
    await mongoose.disconnect();
  } catch (error) {
    console.log(`Error disconnecting from database: ${error.message}`);
    throw new Error(`disconnect to database failed: ${error.message}`);
  }
}
