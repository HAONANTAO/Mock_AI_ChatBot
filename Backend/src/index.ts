import mongoose from "mongoose";
import express from "express";
import { connectedToDatabase, disconnectToDatabase } from "./db/connection.js";
import appRouter from "./routes/index.js";

const app = express();
// 配置处理 JSON 数据的中间件
app.use(express.json());
const port = process.env.PORT || 3000;

async function main() {
  try {
    await connectedToDatabase();
    console.log("Database connection established.");

    app.use(appRouter);

    app.get("/", (req, res) => {
      res.send("Hello, world!");
    });

    // 这里不能使用 app.listen 在 Serverless 环境，需移除
    // const server = app.listen(port, () => {
    //     console.log(`Server is running on port ${port}`);
    // });
  } catch (error) {
    console.error("Database connection failed:", error);
    // 考虑在连接失败时关闭程序或进行其他错误处理
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("Error in main function:", error);
  // 处理 main 函数中未捕获的错误
  process.exit(1);
});
