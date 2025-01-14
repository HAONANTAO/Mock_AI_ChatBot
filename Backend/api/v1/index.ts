import mongoose from "mongoose";
import express from "express";
import {
  connectedToDatabase,
  disconnectToDatabase,
} from "../../src/db/connection.js";
import appRouter from "../../src/routes/index.js";

const app = express();
// 配置处理 JSON 数据的中间ware
app.use(express.json());
// 在服务器初始化时注册路由
app.use(appRouter);
console.log("Routes mounted successfully");

// 数据库连接和服务器启动
async function initializeServer() {
  try {
    await connectedToDatabase();
    console.log("Database connection established.");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
}

// 导出处理请求的函数
export default async function handler(req, res) {
  try {
    // 调用路由处理函数
    app(req, res);
  } catch (error) {
    console.error("Error processing request:", error);
    console.error("Error stack:", error.stack); // 增加错误堆栈信息
    res.status(500).send({ error: "Internal Server Error" });
  }
}

// 服务器关闭时断开数据库连接
process.on("SIGTERM", async () => {
  try {
    await disconnectToDatabase();
    console.log("Disconnected from the database.");
  } catch (error) {
    console.error("Error disconnecting from database:", error);
  }
  // 更优雅的关闭方式，给请求处理一些时间
  setTimeout(() => {
    process.exit(0);
  }, 5000);
});

// 初始化服务器
initializeServer();
