// backend/src/api/chats/new.ts
import { NextFunction, Request, Response } from "express";
import { validate } from "../../utils/validator";
import { chatCompletionValidator } from "../../utils/validator";
import { verifyToken } from "../../utils/token-manager";
import { generateChatCompletion } from "../../controllers/chat-controller";

export default async (req: Request, res: Response, next: NextFunction) => {
  await validate(chatCompletionValidator)(req, res, async () => {
    try {
      await verifyToken(req, res, async () => {
        await generateChatCompletion(req, res, next);
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Failed to generate chat completion",
        cause: error.message,
      });
    }
  });
};
