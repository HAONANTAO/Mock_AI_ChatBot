import express from "express";
// 从 dotenv 库中引入的 config 函数，在执行时会自动查找项目根目录下名为 .env 的文件
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
config();
// 创建app
const app = express();
// 跨域
app.use(
  cors({ origin: "https://mock-ai-chat-bot.vercel.app/", credentials: true }),
);
// 日志输出记录，为开发环境
app.use(morgan("dev"));
// middlewares
// 配置用于解析 application/json 格式数据的中间件
app.use(express.json());

// 配置用于解析 application/x-www-form-urlencoded 格式数据的中间件（表单数据）
app.use(express.urlencoded({ extended: true }));
// 解析cookies,加密
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use("/api/v1", appRouter);
export default app;
