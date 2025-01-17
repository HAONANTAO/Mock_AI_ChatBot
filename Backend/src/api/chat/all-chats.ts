// backend/src/api/chats/all-chats.ts
import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../../utils/token-manager";
import { sendChatsToUser } from "../../controllers/chat-controller";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    await verifyToken(req, res, async () => {
      await sendChatsToUser(req, res, next);
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to fetch chats", cause: error.message });
  }
};
