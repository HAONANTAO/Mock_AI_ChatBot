// backend/src/api/chats/delete.ts
import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../../utils/token-manager";
import { deleteChats } from "../../controllers/chat-controller";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    await verifyToken(req, res, async () => {
      await deleteChats(req, res, next);
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to delete chats", cause: error.message });
  }
};
