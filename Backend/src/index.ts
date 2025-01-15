import express from "express";
import mongoose from "mongoose";
import app from "./app.js";
import { connectedToDatabase, disconnectToDatabase } from "./db/connection.js";

// 定义端口
const port = process.env.PORT || 3000;

// 启动数据库连接与服务器
connectedToDatabase()
  .then(() => {
    const server = app.listen(port, () => {
      console.log("😀connection is good, server works!😀");
    });

    // 捕获中断信号，用于正常关闭程序
    process.on("SIGINT", async () => {
      console.log("Received SIGINT. Closing server...");
      try {
        await server.close();
        console.log("Server closed.");
        await disconnectToDatabase();
        console.log("Disconnected from database.");
        process.exit(0);
      } catch (error) {
        console.error(
          "Error closing server or disconnecting from database:",
          error,
        );
        process.exit(1);
      }
    });

    return server;
  })
  .catch((error) => {
    console.error("connected failed, server is not open:", error);
  });
