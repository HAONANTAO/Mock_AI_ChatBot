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
  (req, res, next) => {
    generateChatCompletion(req, res, next);
  },
);

chatRoutes.get("/all-chats", verifyToken, (req, res, next) => {
  sendChatsToUser(req, res, next);
});

chatRoutes.delete("/delete", verifyToken, (req, res, next) => {
  deleteChats(req, res, next);
});

// 导出命名函数
export const chatRoutesHandler = serverless((req, res, next) => {
  try {
    chatRoutes(req, res, next);
  } catch (error) {
    console.error("Error occurred in chatRoutes:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

export { chatRoutes };
