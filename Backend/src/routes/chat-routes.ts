import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { chatCompletionValidator, validate } from "../utils/validator.js";
import {
  deleteChats,
  generateChatCompletion,
  sendChatsToUser,
} from "../controllers/chat-controller.js";
import serverless from "serverless-http";

const chatRoutes = Router();

// 定义路由和中间件
chatRoutes.post(
  "/new",
  validate(chatCompletionValidator),
  verifyToken,
  generateChatCompletion,
);

chatRoutes.get("/all-chats", verifyToken, sendChatsToUser);

chatRoutes.delete("/delete", verifyToken, deleteChats);

// 导出 serverless 处理函数
export const handler = serverless((req, res, next) => {
  try {
    chatRoutes(req, res, next);
  } catch (error) {
    console.error("Error occurred in chatRoutes:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});
