import { connect, disconnect } from "mongoose";
async function connectedToDatabase() {
  try {
    await connect(process.env.MONGODB_URL);
  } catch (error) {
    console.log(error);
    throw new Error("connect to database failed!");
  }
}
async function disconnectToDatabase() {
  try {
    await disconnect();
  } catch (error) {
    console.log(error);
    throw new Error("disconnect to database failed!");
  }
}
export { connectedToDatabase, disconnectToDatabase };
