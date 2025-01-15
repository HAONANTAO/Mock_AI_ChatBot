import mongoose from "mongoose";
import { connectToDatabase, disconnectToDatabase } from "./db/connection.js";
import serverless from "serverless-http";
import app from "./app.js";

// 导出无服务器处理函数
const handler = serverless(app);

export { handler };

// 以下代码可作为测试数据库连接的示例，可根据需要保留或删除
(async () => {
  try {
    await connectToDatabase();
    console.log("😀connection is good, database works!😀");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
})();
