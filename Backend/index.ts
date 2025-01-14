import mongoose from "mongoose";
import express from "express";
import { connectedToDatabase } from "./src/db/connection.js";
import appRouter from "./src/routes/index.js";
import serverless from "serverless-http";
const app = express();

// 配置处理 JSON 数据的中间件
app.use(express.json());

// 在服务器初始化时注册路由
app.use(appRouter);
console.log("Routes mounted successfully");

// 导出处理请求的函数
export const handler = serverless(async (req, res) => {
  try {
    const db = await connectedToDatabase();
    // 将数据库连接传递给请求对象，方便后续使用
    req.db = db;
    // 调用路由处理函数
    app(req, res);
  } catch (error) {
    console.error("Error processing request:", error);
    console.error("Error stack:", error.stack);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// 服务器关闭时断开数据库连接
export async function disconnectToDatabase() {
  try {
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
      console.log("Disconnected from the database.");
    }
  } catch (error) {
    console.error("Error disconnecting from database:", error);
  }
}

// 优化数据库连接逻辑
async function ensureDatabaseConnection() {
  if (!mongoose.connection.readyState) {
    await connectedToDatabase();
  }
}

// 初始化服务器
(async () => {
  try {
    await ensureDatabaseConnection();
    console.log("Database connection established.");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
})();
