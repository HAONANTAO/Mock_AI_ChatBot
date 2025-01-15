import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Request, Response } from "express";

config();
const app = express();

app.use(
  cors({
    origin: "https://mock-ai-chat-bot.vercel.app",
    credentials: true,
  }),
);
// 日志输出记录，为开发环境
app.use(morgan("dev"));
// middlewares
// 解析 application/json 格式数据
app.use(express.json());
// 解析 application/x-www-form-urlencoded 格式数据（表单数据）
app.use(express.urlencoded({ extended: true }));
// 解析 cookies，加密
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use("/api/v1", appRouter);

// 导出一个处理请求的异步函数
export default async (req: Request, res: Response) => {
  try {
    await app(req, res);
  } catch (error: any) {
    console.error("Error occurred during request processing:", error);
    res
      .status(500)
      .send({ error: "Internal Server Error", errorMessage: error.message });
  }
};
