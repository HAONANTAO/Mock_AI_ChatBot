import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./src/routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectedToDatabase } from "./src/db/connection.js";
import serverless from "serverless-http";
import mongoose from "mongoose";

config();

// 创建 app
const app = express();

// 跨域
app.use(
  cors({ origin: "https://mock-ai-chat-bot.vercel.app", credentials: true }),
);

// 日志输出记录，为开发环境
app.use(morgan("dev"));

// middlewares
// 配置用于解析 application/json 格式数据的中间件
app.use(express.json());

// 配置用于解析 application/x-www-form-urlencoded 格式数据的中间ware
app.use(express.urlencoded({ extended: true }));

// 解析 cookies，加密
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use("/api/v1", appRouter);

// 导出处理函数
export const handler = serverless(async (req, res) => {
  try {
    await ensureDatabaseConnection();
    return app(req, res);
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

// 连接数据库
async function ensureDatabaseConnection() {
  const maxRetries = 3;
  const baseDelay = 1000;

  for (let retries = 0; retries < maxRetries; retries++) {
    try {
      if (!mongoose.connection.readyState) {
        await connectedToDatabase();
        console.log("Database connection established.");
        return;
      }
    } catch (error) {
      console.error(
        `Database connection attempt failed (${retries + 1}/${maxRetries}):`,
        error,
      );
      // 指数退避
      await new Promise((resolve) =>
        setTimeout(resolve, baseDelay * Math.pow(2, retries)),
      );
    }
  }

  throw new Error(
    "Failed to establish database connection after several attempts",
  );
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
