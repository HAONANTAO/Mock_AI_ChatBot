import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { chatCompletionValidator, validate } from "../utils/validator.js";
import { generateChatCompletion } from "../controllers/chat-controller.js";

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

// chatRoutes.post("/test", (req, res) => {
//   console.log("在运行2");
// });
export default chatRoutes;
