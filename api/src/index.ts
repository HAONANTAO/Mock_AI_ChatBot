import mongoose from "mongoose";
import { connectedToDatabase, disconnectToDatabase } from "./db/connection.js";

// 连接数据库
connectedToDatabase()
  .then(() => {
    console.log("😀connection is good, database works!😀");
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });
