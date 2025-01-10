import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { chatCompletionValidator, validate } from "../utils/validator.js";
import {
  generateChatCompletion,
  sendChatsToUser,
} from "../controllers/chat-controller.js";

// protected API ,only user can be visited!
const chatRoutes = Router();

// GPTchats 先验证token身份
// (一系列的中间件处理逻辑)
chatRoutes.post(
  "/new",
  validate(chatCompletionValidator),
  verifyToken,
  generateChatCompletion,
);

// 初始化聊天信息
chatRoutes.get("/all-chats", verifyToken, sendChatsToUser);
export default chatRoutes;
